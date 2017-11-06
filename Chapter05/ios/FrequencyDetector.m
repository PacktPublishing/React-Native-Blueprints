#import "FrequencyDetector.h"
#import "SCListener.h"

NSString *freq = @"";

@implementation FrequencyDetector

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(getFrequency:(RCTResponseSenderBlock)callback)
{
  double power = [[SCListener sharedListener] averagePower];
  if(power < 0.03) { //ignore low volumes
    freq = @"0";
  } else {
    freq = [NSString stringWithFormat:@"%0.3f",[[SCListener sharedListener] frequency]];
  }
  
  
  callback(@[[NSNull null], freq]);
}

RCT_EXPORT_METHOD(initialise)
{
  [[SCListener sharedListener] listen];
}

@end
