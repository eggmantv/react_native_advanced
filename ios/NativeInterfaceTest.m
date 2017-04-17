//
//  NativeInterfaceTest.m
//  react_native_advanced
//

#import "NativeInterfaceTest.h"

@implementation NativeInterfaceTest

RCT_EXPORT_MODULE();

// 如果想让这个module中的所有方法都在主线程上运行，开启下面的方法
//- (dispatch_queue_t)methodQueue {
//  return dispatch_get_main_queue();
//}

RCT_EXPORT_METHOD(getStatusBarHeight:(RCTResponseSenderBlock)callback) {
  CGSize statusBarSize = [[UIApplication sharedApplication] statusBarFrame].size;
  CGFloat height = MIN(statusBarSize.height, statusBarSize.width);
  
  NSLog(@"status bar height: %f", height);
  callback(@[[NSNull null], @{@"height": [NSNumber numberWithFloat:height]}]);
}

@end
