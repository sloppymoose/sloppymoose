# sloppymoose

## Native Applications

### iOS

iOS application development depends on [Fastlane](http://fastlane.tools) for
packaging, signing, and distribution.

Because of on-going [compatibility issues between SheetMapper and Fastlane due
to differing dependencies on `google-api-client`][google-drive], Fastlane must
be installed globally:

    gem install fastlane

#### Deployment

To build and submit the application to iTunes, run the most appropriate command:

* TestFlight (staging): `npm run ios:testflight`
* App Store (production): `TBD`

When submission is complete, or before you can start any iOS development for
the first time, the following command must be run:

* Development: `npm run ios:dev`

That exports development-specific environment variables.

## 3rd Party Integrations

* Email - [Sparkpost](https://www.sparkpost.com/)
* Error Reporting - [Raygun](https://raygun.io/)

[google-drive]: https://github.com/gimite/google-drive-ruby/issues/190#issuecomment-195003766
