#import "RCTBridgeModule.h"

@interface EnvironmentManager : NSObject <RCTBridgeModule>

@end


@implementation EnvironmentManager

RCT_EXPORT_MODULE()

/**
 ******************************************************************************
 ******************************************************************************
 *
 *                  DO NOT COMMIT CHANGES TO THIS FILE!!
 *
 ******************************************************************************
 ******************************************************************************
 */

- (NSDictionary *)constantsToExport
{
  NSException* envException = [NSException
          exceptionWithName:@"UninitializedEnvironmentException"
          reason:@"EnvironmentManager not initialized. Run `fastlane [lane] --env [environment]` to generate the contents of EnvironmentManager.m"
          userInfo:nil];
  @throw envException;
}

@end
