//
// SCListener 1.0.1
// http://github.com/stephencelis/sc_listener
//
// (c) 2009-* Stephen Celis, <stephen@stephencelis.com>.
// Released under the MIT License.
//

#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioQueue.h>
#import <AudioToolbox/AudioServices.h>
#import <AVFoundation/AVFoundation.h>
#import "kiss_fftr.h"

// FFT size, should be power of 2,3,4,5
#define kFFTSIZE 32768

// Buffer of input must be <= kFFTSIZE
#define kBUFFERSIZE 32768

// Hardware sample rate
#define kSAMPLERATE 44100

@interface SCListener : NSObject {
	AudioQueueLevelMeterState *levels;
	AudioQueueRef queue;
	AudioStreamBasicDescription format;
	Float64 sampleRate;

	// Audio Buffer
	short audio_data[kBUFFERSIZE];
	UInt32 audio_data_len;
	
	// Buffers for fft
	kiss_fft_scalar in_fft[kFFTSIZE];
	kiss_fft_cpx out_fft[kFFTSIZE];
	double freq_db[kFFTSIZE/2];
	double freq_db_harmonic[kFFTSIZE/2];
}

+ (SCListener *)sharedListener;

- (void)listen;
- (BOOL)isListening;
- (void)pause;
- (void)stop;

// Fetch the buffer, used for drawing graphs etc
- (double*) freq_db;
- (double*) freq_db_harmonic;

// Getters, frequency calculation is done in this getter, not in the audio thread.
// If you are calling it from your UI thread and you have a large FFT size then
// it will block your UI.
- (Float32)frequency;
- (Float32)averagePower;
- (Float32)peakPower;
- (AudioQueueLevelMeterState *)levels;

@end
