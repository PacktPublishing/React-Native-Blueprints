//
// SCListener 1.0.1
// http://github.com/stephencelis/sc_listener
//
// (c) 2009-* Stephen Celis, <stephen@stephencelis.com>.
// Released under the MIT License.
//

#import "SCListener.h"

@interface SCListener (Private)

- (void)updateLevels;
- (void)setupQueue;
- (void)setupFormat;
- (void)setupBuffers;
- (void)setupMetering;
- (Float32)getFreqFromBuffer: (short*) buffer length: (UInt32) length;
- (UInt32)findOptimalSampleLength: (UInt32) samples;
- (void)setAudioBuffer: (short*) buffer length: (UInt32) length;
@end

static SCListener *sharedListener = nil;
static void listeningCallback(void *inUserData, AudioQueueRef inAQ, AudioQueueBufferRef inBuffer, const AudioTimeStamp *inStartTime, UInt32 inNumberPacketsDescriptions, const AudioStreamPacketDescription *inPacketDescs) {
	SCListener *listener = (__bridge SCListener *)inUserData;
	if ([listener isListening]){
		[listener setAudioBuffer:inBuffer->mAudioData length: inBuffer->mAudioDataByteSize];
		AudioQueueEnqueueBuffer(inAQ, inBuffer, 0, NULL);
	}
}

@implementation SCListener

+ (SCListener *)sharedListener {
	@synchronized(self) {
		if (sharedListener == nil)
			[[self alloc] init];
	}

	return sharedListener;
}

- (void)dealloc {
	[sharedListener stop];
	//[super dealloc];
}

#pragma mark -
#pragma mark Listening

- (void)listen {
	if (queue == nil){
		[self setupQueue];
    }
	AudioQueueStart(queue, NULL);
}

- (void)pause {
	if (![self isListening])
		return;

	AudioQueueStop(queue, true);
}

- (void)stop {
	if (queue == nil)
		return;

	AudioQueueDispose(queue, true);
	queue = nil;
}

- (BOOL)isListening {
	if (queue == nil)
		return NO;

	UInt32 isListening, ioDataSize = sizeof(UInt32);
	OSStatus result = AudioQueueGetProperty(queue, kAudioQueueProperty_IsRunning, &isListening, &ioDataSize);
	return (result != noErr) ? NO : isListening;
}

#pragma mark -
#pragma mark Levels getters

- (Float32)averagePower {
	if (![self isListening])
		return 0.0;

	return [self levels][0].mAveragePower;
}

- (Float32)peakPower {
	if (![self isListening])
		return 0.0;

	return [self levels][0].mPeakPower;
}

- (AudioQueueLevelMeterState *)levels {
  if (![self isListening])
    return nil;
	
	[self updateLevels];
	return levels;
}

- (void)updateLevels {
	UInt32 ioDataSize = format.mChannelsPerFrame * sizeof(AudioQueueLevelMeterState);
	AudioQueueGetProperty(queue, (AudioQueuePropertyID)kAudioQueueProperty_CurrentLevelMeter, levels, &ioDataSize);
}

#pragma mark -
#pragma mark Frequency 

- (Float32)frequency {
	short buffer[kBUFFERSIZE];
	UInt32 buffer_length;
	
	// Make a local copy of the buffer so we don't block the audio thread.
	@synchronized(self) {
		memcpy(buffer, audio_data, kBUFFERSIZE);
		buffer_length = audio_data_len;
	}
	
	if(buffer_length ==0 )
		return 0;
	else	
		return [self getFreqFromBuffer: buffer length: buffer_length];
}

// Return all the data for the frequency spectrum.
- (double*) freq_db{
	return freq_db;
}

- (double*) freq_db_harmonic{
	return freq_db_harmonic;
}

// Set audio buffer. Called from audio thread.
- (void)setAudioBuffer: (short*) buffer length: (UInt32) length{
	@synchronized(self) {
		memcpy(audio_data, buffer, length);
		audio_data_len = length;
		
	}
}

// Some optional functions for performing a hamming window on the input.
- (double) hamming_window: (short) input totalSamples: (short) totalSamples{
    double a = 2.0 * 3.141592654 / ( totalSamples - 1 );
	double w;
	
    w = 0.54 - 0.46 * cos( a * input );
    return w;
}

- (void) performWindow: (short*) buffer totalSamples: (UInt32) totalSamples{
	for (int i = 0; i < totalSamples; i++){
		buffer[i] *= [self hamming_window: i totalSamples: totalSamples];
	}
}


- (void) performFFT: (short*) buffer totalSamples: (UInt32) totalSamples{

	// Populate FFT input for the samples we have, input is zero padded.
	for(UInt32 i = 0; i < totalSamples; i++){
		in_fft[i] = buffer[i];
	}
	
	// Run FFT
	kiss_fftr_cfg kiss_cfg = kiss_fftr_alloc(kFFTSIZE, 0, NULL, NULL);
	kiss_fftr(kiss_cfg, in_fft, out_fft);
	free(kiss_cfg);
	
	
	// Calculate amplitude. ( half the fft is a duplicate )
	for(int i = 0; i < kFFTSIZE / 2; i++)
	{	
		freq_db[i] = sqrt((double)out_fft[i].r * (double)out_fft[i].r + 
				     (double)out_fft[i].i * (double)out_fft[i].i) / (kFFTSIZE / 2.0);
	}
}

// To find harmonics we take the output and divide the frequencies by 2 and 3
// we then add this to the original input. It should give us a peak at the
// root note. This is needed for string instruments.
- (void) addHarmonics{
	const int max_harmonics = 3;
	int fft_range = kFFTSIZE / 2;
	
	memcpy(freq_db_harmonic, freq_db, kFFTSIZE / 2 * sizeof(freq_db[0]));

	for(int j = 2; j <= max_harmonics; j++){
		int low_bin = 0;
		int new_value = 0;
		for(int i = 0; i < fft_range; i++){
			int next_bin = round((double)i / (double)j);

			if(next_bin > low_bin){
				freq_db_harmonic[low_bin] += new_value;
				low_bin = next_bin;
				new_value = 0;
			}
			
			new_value = MAX(new_value, freq_db[i]);  
		}
	}
}

// Find the highest peak.
- (UInt32) findTopSpike{
	// Find highest db value in the output.
	double max = 0;
	UInt32 max_index = 0;
	for(UInt32 i = 0; i < kFFTSIZE / 2; i++){
		double db = freq_db_harmonic[i];
		if(db > max){
			max = db;
			max_index = i;
		}
	}
	return max_index;
}

// Calculate the frequency of an audio buffer using fft.
- (Float32)getFreqFromBuffer: (short*) buffer length: (UInt32) length{
	memset(in_fft, 0, kFFTSIZE * sizeof(kiss_fft_scalar));
	memset(out_fft, 0, kFFTSIZE * sizeof(kiss_fft_cpx));
	memset(freq_db, 0, kFFTSIZE / 2 * sizeof(double));
	memset(freq_db_harmonic, 0, kFFTSIZE / 2 * sizeof(double));
	
	// Two bytes per sample.
	UInt32 totalSamples = length/2;
	
	//Optional :)
	//[self performWindow: buffer totalSamples: totalSamples];	

	[self performFFT: buffer totalSamples: totalSamples];
	[self addHarmonics];
	
	int freq_index = [self findTopSpike];

	// Calculate frequency from fft bin number.
	return (Float32)freq_index * format.mSampleRate / kFFTSIZE;
}

#pragma mark -
#pragma mark Setup

- (void)setupQueue {
	if (queue)
		return;

	[self setupFormat];
	AudioQueueNewInput(&format, listeningCallback, (__bridge void * _Nullable)(self), NULL, NULL, 0, &queue);
	[self setupBuffers];
	[self setupMetering];
}

- (void)setupFormat {
	format.mSampleRate = kSAMPLERATE;
	format.mFormatID = kAudioFormatLinearPCM;
	format.mFormatFlags = kAudioFormatFlagIsSignedInteger | kAudioFormatFlagIsPacked;
	format.mFramesPerPacket = format.mChannelsPerFrame = 1;
	format.mBitsPerChannel = 16;
	format.mBytesPerPacket = format.mBytesPerFrame = 2;
}

- (void)setupBuffers {
	AudioQueueBufferRef buffers[3];
	for (NSInteger i = 0; i < 3; ++i) { 
		AudioQueueAllocateBuffer(queue, kBUFFERSIZE, &buffers[i]); 
		AudioQueueEnqueueBuffer(queue, buffers[i], 0, NULL); 
	}
}

- (void)setupMetering {
	levels = (AudioQueueLevelMeterState *)calloc(sizeof(AudioQueueLevelMeterState), format.mChannelsPerFrame);
	UInt32 trueValue = true;
	AudioQueueSetProperty(queue, kAudioQueueProperty_EnableLevelMetering, &trueValue, sizeof(UInt32));
}

#pragma mark -
#pragma mark Singleton Pattern

+ (id)allocWithZone:(NSZone *)zone {
	@synchronized(self) {
		if (sharedListener == nil) {
			sharedListener = [super allocWithZone:zone];
			return sharedListener;
		}
	}

	return nil;
}

- (id)copyWithZone:(NSZone *)zone {
	return self;
}

- (id)init {
	if ([super init] == nil){
		return nil;
	}
  
	
	[[AVAudioSession sharedInstance] setActive:YES error:nil];
  [[AVAudioSession sharedInstance]
   setCategory:AVAudioSessionCategoryPlayAndRecord error:nil];
	return self;
}

//- (id)retain {
//	return self;
//}

//- (unsigned)retainCount {
//	return UINT_MAX;
//}
//
//- (void)release {
//	// Do nothing.
//}
//
//- (id)autorelease {
//	return self;
//}

@end
