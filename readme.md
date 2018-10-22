<!DOCTYPE html>  
<html>  
<body>

<h1>IGX - The replacement for FBINstant for Facebook Instant Game Developers</h1>

<h2>What is IGX?</h2>
IGX stands for Instant Games Extension, it is basically a replacement for the Facebook Instant Games API which enableds developers to deploy games they create using the Facebook Instants API to the web and beyond with little to no code changes.

<h2>Why IGX?</h2>
IGX was created to enable developers to maximise their development time and money. It's difficult and time consuming to port games to Instant Games taking into consideration platform features, but its also more difficult to port games from Instant Games to web because so many features are lost. IGX attempts to replace some features that IG platform provides to enable the developer to retain functionality as much as possible.

<h2>What features are available?</h2>
The following features are available:
- Initialilsation including entry point data via the url
- User login / management (anonymous, credentials, Faceook and shortcode logins)
- User data persistence on server
- Facebook sharing
- Leaderboards

<h2>What other features are available?</h2>
The layer also includes additional functionality that is available outside of the Facebook Instants API, these features include:
- Login status
- User registration
- Account conversion
- Password management
- Profile query and modification
- Add / remove / find friends
- Real time user to user messaging
- Referral system
- Sharing on Twitter

<h2>What features will be coming?</h2>
- Ads
- Payments
- Contexts
- Portal specific services

<h2>How to get started</h2>
Instead of linking to the Facebook Instants JS file, add igx_min.js and xtralife-3.2.1.min.js to your index page.
Note that the back-end used by IGX to provide server side features is called Xtralife (http://xtralife.cloud/), you will need to create a free account and add a game to obtain an API key and secret to use the API.

Once you have an account and have added a game to the system you will be given an API key and secret which you can use to access back-end features.

To set this up in code use:

FBInstant.options.ApiKey = "Your games Xtralife key";
FBInstant.options.ApiSecret = "Your games Xtralife secret";
FBInstant.options.DevMode = "sandbox";
new GameService(FBInstant.options.ServiceName);	// Default is xtralife.

The API is designed so that back-ends can be swapped, so if you are not happy with a specific API then you can replace it.

The API consists of the following files:
- fbinstantx.6.2.js - This contains the replacment FBInstant data and functions
- lib_ads.js - Ads interface. No ads back-end currently available yet
- lib_gameservice.js - Game service interface which wraps game services
- lib_socials - Wrappers for various social API's, Facebook is currently the only one implemented (provides login etc)
- lib_xtralife - Xtralife implementation of game service

<h2>Extensions</h2>
A lot of extra functionality has been added to the FBInstant API which is not available in the FBINstant API. These are provided via the FBInstant.ext object. For example, to log in the user via Facebook you would call FBInstant.ext.loginWithFacebookAccessTokenAsync().

<h2>Logging the user in</h2>
The user is by default logged in anonymously. This creates an account for them with Xtralife which allows their game data to be stored and retrieved. It also allows them to submit leaderboard scores and retrieve leaderboards. You can disable anonymous login by setting FBInstant.options.AllowAnonymous to false. Lets take a look at an example that shows how to log the user in via Facebook:

	if (FBInstant.ext !== undefined)
	{
		LibSocial.Facebook.Login(function(response) {
			FBInstant.ext.loginWithFacebookAccessTokenAsync(response.authResponse.accessToken).then(function(error, gamer) {
				// User is now logged in with Facebook and Xtralife
			});
		});
	}

Note that if the user is already logged in anonymously then you can log in via the Facebook SDK and then convert the account from anonymous using:

	if (FBInstant.ext !== undefined)
	{
		FBInstant.ext.convertAccountAsync("facebook", response.authResponse.userID, response.authResponse.accessToken, function(error) {
			// Account was converted
		});
	}

<h2>Entry Point Data</h2>
Entry point data is passed via the URL in the data parameter. The data object passed must be url encoded. Note that when you make a call to shareAsync the data object passed in options.data will be sent with the URL. When a user clicks the link the data will be available via getEntryPointData().

<h2>Sharing</h2>
In order for Facebook sharing to work via shareAsync, you must assign the URL which takes care of the sharing to FBInstant.options.ShareURI. Special parameters will be passed to this URL which enables Facebook to pull a proper preview of what is being shared. The destination URL will need to be a script that can handle the passed parameters. An example script is shown below:

<pre>
&lt;!DOCTYPE html&gt;  
&lt;html&gt;  
&lt;head&gt;  
	&lt;meta charset='utf-8'&gt;  
	&lt;meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui, viewport-fit=cover' /&gt;
	&lt;meta name='mobile-web-app-capable' content='yes'&gt;
	&lt;meta name='apple-mobile-web-app-capable' content='yes'&gt;
	&lt;meta name='apple-mobile-web-app-status-bar-style' content='translucent-black'&gt;
	&lt;meta name='description' content='Your Game Name'&gt;
	&lt;meta name='keywords' content=''&gt;
	&lt;title&gt;Your Game Name&lt;/title&gt;
	&lt;meta property="og:type" content="article" /&gt;
	&lt;meta property='og:image' content='https://yourdomain.com/your_nice_image.jpg' /&gt;
	&lt;link rel='stylesheet' type='text/css' href='styles.css'&gt;
&lt;?php
	$title = $_GET['t'];
	if ($title != '')
	{
		$title = htmlspecialchars($title);
		echo "    &lt;meta property='og:title' content='" . $title . "' /&gt;\n";
	}
	else
	{
		echo "    &lt;meta property='og:title' content='Your Game Name' /&gt;";
	}

	$description = $_GET['d'];
	if ($description != '')
	{
		$description = htmlspecialchars(urldecode($description));
		echo "    &lt;meta property='og:description' content='" . $description . "' /&gt;\n";
	}
	else
	{
		echo "    &lt;meta property='og:description' content='&lt;Enter a description here&gt;' /&gt;";
	}
?&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;  
&lt;/html&gt;
</pre>


</body>  
</html>