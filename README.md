# Spot SDK

The Spot SDK is a React native package to provide the Spot controller functionality to any React native apps, such as Jitsi Meet.

# Usage

### 1. Install the module

```
npm install jitsi-spot-sdk
```

### 2. Add and install peer dependencies

Check the `package.json` to see the most actual list of `peerDependencies`. To see what exact version the SDK was developed and tested against please also see the `devDependencies` section of the same file.

### 3. Add native stuff

### 3.1 iOS

#### 3.1.1 Add the following to `Podfile`

```
pod 'ReactNativeBeaconsManager', :path => '../node_modules/react-native-beacons-manager'
pod 'react-native-webview', :path => '../node_modules/react-native-webview'
```
#### 3.1.2 Add the permissions to `Info.plist`
```
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Allows MyFirstSpotApp to detect Spot TVs and Spot TV equipped meeting rooms nearby.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Allows MyFirstSpotApp to detect Spot TVs and Spot TV equipped meeting rooms nearby.</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>Allows MyFirstSpotApp to detect Spot TVs and Spot TV equipped meeting rooms nearby.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Allows MyFirstSpotApp to detect Spot TVs and Spot TV equipped meeting rooms nearby.</string>
<key>NSLocationUsageDescription</key>
<string>Allows MyFirstSpotApp to detect Spot TVs and Spot TV equipped meeting rooms nearby.</string>
```

### 3.2 Android

#### 3.2.1 Add the following to `settings.gradle`
```
include ':react-native-beacons-manager'
project(':react-native-beacons-manager').projectDir =  new  File(rootProject.projectDir, '../node_modules/react-native-beacons-manager/android')
include ':react-native-webview'
project(':react-native-webview').projectDir =  new  File(rootProject.projectDir, '../node_modules/react-native-webview/android')
```
#### 3.2.2 Add the packages to your Java code
```
@Override
protected  List<ReactPackage> getPackages() {
    return  Arrays.asList(
        // ... your existing packages
        new  com.mackentoch.beaconsandroid.BeaconsAndroidPackage(),
        new  com.reactnativecommunity.webview.RNCWebViewPackage()
    );
}
```
#### 3.2.3 Add the permission to your manifest
```
<uses-permission  android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

### 4. Init the SDK

Put the SDK init code to a part of your app that runs early enoigh (e.g. main view mount), but not in the module loading phase!

```
const sdk = new SDK(/* optional config here */);

// Add device detector callbacks
sdk.initDeviceDetector({
    onDeviceDetected: devices => {
        // ...
    },
    onRoomEntered: regionId => {
        // ...
    },
    onRoomLeft: regionId => {
        // ...
    }
});
```

### 5. Use the components

### 5.1 SpotStreamButton
`SpotStreamButton` is a button that will appear or disappear automatically should a nearby spot device is detected.

#### Props:

`iconColor`: Color of the rendered button (optional).  
`iconSize`: Size of the rendered button (optional).  
`onPress`: Callback to be invoked when the button is pressed.  
`style`: External size to be applied (optional).  
`children`: The component may have children, in which case the children are rendered as button, instead of the default icon.

### 5.2 SpotNearbyDevicesList
`SpotNearbyDevicesList` is a component to render the lis of nearby devices.

#### Props

`defaultDeviceName`: Device name to be displayed for devices with no available name (Optional).  
`onSelect`: The callback to be invoked on selecting a device from the list.  
`style`: External size to be applied (optional).

### 5.3 SpotView
`SpotView` is a view that renders the Spot remote controller screen.

#### Props

`device`: The device we want to control, if any. Otherwise a spot controller is opened with the code entry screen to control a non beacon-enabled instance (optional).  
`renderLoading`: Function to override the default spinner (optional).  
`style`: External size to be applied (optional).
