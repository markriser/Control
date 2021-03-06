/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 */


#import "PhoneGapViewController.h"
#import "PhoneGapDelegate.h" 

@implementation PhoneGapViewController

@synthesize supportedOrientations, webView;

- (id) init {
    if (self = [super init]) {
		// do other init here
        NSLog(@"VIEW CONTROLLER INIT");
        rotateOrientation = @"portrait";
        [rotateOrientation retain];
	}
	
	return self;
}


- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation) interfaceOrientation {
    NSLog(@"interfaceOrientation = %d %@", (interfaceOrientation == UIDeviceOrientationPortraitUpsideDown), rotateOrientation);
    if (autoRotate == YES) {
        return YES;
    } else {
        if ([rotateOrientation isEqualToString:@"portrait"]) {
            if (interfaceOrientation == UIDeviceOrientationPortraitUpsideDown) return YES;
            return (interfaceOrientation == UIInterfaceOrientationPortrait || interfaceOrientation == UIDeviceOrientationPortraitUpsideDown);
        } else if ([rotateOrientation isEqualToString:@"landscape"]) {
            return (interfaceOrientation == UIInterfaceOrientationLandscapeLeft);
        } else {
            return NO;
        }
    }

	return (interfaceOrientation == UIInterfaceOrientationLandscapeLeft ||
			interfaceOrientation == UIInterfaceOrientationLandscapeRight);
}
/**
 Called by UIKit when the device starts to rotate to a new orientation.  This fires the \c setOrientation
 method on the Orientation object in JavaScript.  Look at the JavaScript documentation for more information.
 */
- (void)willRotateToInterfaceOrientation: (UIInterfaceOrientation)toInterfaceOrientation duration: (NSTimeInterval)duration {
	double i = 0;
	
	switch (toInterfaceOrientation){
		case UIInterfaceOrientationPortrait:
			i = 0;
			break;
		case UIInterfaceOrientationPortraitUpsideDown:
			i = 180;
			break;
		case UIInterfaceOrientationLandscapeLeft:
			i = 90;
			break;
		case UIInterfaceOrientationLandscapeRight:
			i = -90;
			break;
	}
	[webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"navigator.orientation.setOrientation(%f);", i]];
}


- (void) setWebView:(UIWebView*) theWebView {
    webView = theWebView;
}

- (void) setAutoRotate:(BOOL) shouldRotate {
    autoRotate = shouldRotate;
}

- (void) setRotateOrientation:(NSString*) orientation {
	if(rotateOrientation != nil) {
		[rotateOrientation release];
	}
	rotateOrientation = [[NSString alloc] initWithString:orientation];
}

- (void)dealloc {
	[rotateOrientation release];
	[super dealloc];
}

@end