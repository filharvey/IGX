var LibSocial={Log:function(a){console.log(a)},LogError:function(a){console.log(a)},Facebook:{StatusChangeCallback:void 0,Init:function(a,b){window.fbAsyncInit=function(){FB.init({appId:a,autoLogAppEvents:!0,xfbml:!0,version:'v3.1'}),FB.getLoginStatus(function(a){b!==void 0&&b(a)})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='https://connect.facebook.net/en_US/sdk.js',e.parentNode.insertBefore(d,e))}(document,'script','facebook-jssdk')},Login:function(a){FB.login(function(b){a!==void 0&&a(b)},{scope:'public_profile,email'})},GetProfile:function(a){FB.api('/me',function(b){a!==void 0&&a(b)})},Logout:function(a){FB.logout(function(b){a!==void 0&&a(b)})}}};function GameService(a){this.service=null,'xtralife'===a&&(this.service=new LibXtralife),GameService.instance=this}GameService.LbdEntry=function(a,b,c,d,e,f,g){this.id=a,this.rank=b,this.name=c,this.score=d,this.extra=e,this.photo=f,this.timestamp=g,this.getPlayer=function(){var a=this;return{rank:this.rank,getName:function(){return a.name},getPhoto:function(){return a.photo===void 0?null:a.photo},getID:function(){return a.id}}},this.getRank=function(){return this.rank},this.getScore=function(){return this.score},this.getExtraData=function(){return this.extra},this.getTimestamp=function(){return this.timestamp}},GameService.Player=function(a,b,c,d,e){this.id=a,this.name=b,this.photo=c,this.email=d,this.lang=e,this.getName=function(){return this.name},this.getPhoto=function(){return this.photo===void 0?null:this.photo},this.getID=function(){return this.id},this.getEmail=function(){return this.email},this.getLanguage=function(){return this.lang}},GameService.Game=function(a,b,c,d,e){this.id=a,this.name=b,this.login=c,this.icon=d,this.location=e},GameService.prototype.Init=function(a,b,c){return this.service.Init(a,b,c)},GameService.prototype.LoginAnonymously=function(a,b){return this.service.LoginAnonymously(a,b)},GameService.prototype.ResumeSession=function(a,b,c){return this.service.ResumeSession(a,b,c)},GameService.prototype.LoginWithCredentials=function(a,b,c,d){return this.service.LoginWithCredentials(a,b,c,d)},GameService.prototype.LoginWithShortCode=function(a,b){return this.service.LoginWithShortCode(a,b)},GameService.prototype.LoginWithFacebook=function(a,b){return this.service.LoginWithFacebook(a,b)},GameService.prototype.Logout=function(a){return this.service.Logout(a)},GameService.prototype.ConvertAccount=function(a,b,c,d){return this.service.ConvertAccount(a,b,c,d)},GameService.prototype.LinkAccount=function(a,b,c,d){return this.service.LinkAccount(a,b,c,d)},GameService.prototype.ResetPassword=function(a,b,c,d,e){return this.service.ResetPassword(a,b,c,d,e)},GameService.prototype.ChangePassword=function(a,b){return this.service.ChangePassword(a,b)},GameService.prototype.GetGamerData=function(){return this.service.GetGamerData()},GameService.prototype.GetProfileData=function(a){return this.service.GetProfileData(a)},GameService.prototype.GetProfile=function(a){return this.service.GetProfile(a)},GameService.prototype.SetProfile=function(a,b){return this.service.SetProfile(a,b)},GameService.prototype.GetGames=function(){return this.service.GetGames()},GameService.prototype.ListUsers=function(a,b,c,d){return this.service.ListUsers(a,b,c,d)},GameService.prototype.LeaderboardGetPaged=function(a,b,c,d){return this.service.LeaderboardGetPaged(a,b,c,d)},GameService.prototype.LeaderboardGetFriendsPaged=function(a,b,c,d){return this.service.LeaderboardGetFriendsPaged(a,b,c,d)},GameService.prototype.LeaderboardGetRank=function(a,b){return this.service.LeaderboardGetRank(a,b)},GameService.prototype.LeaderboardSetScore=function(a,b,c,d,e){return this.service.LeaderboardSetScore(a,b,c,d,e)},GameService.prototype.SetUserData=function(a,b,c){return this.service.SetUserData(a,b,c)},GameService.prototype.GetUserData=function(a,b){return this.service.GetUserData(a,b)},GameService.prototype.GetFriends=function(a){return this.service.GetFriends(a)},GameService.prototype.AddFriend=function(a,b){return this.service.AddFriend(a,b)},GameService.prototype.RemoveFriend=function(a,b){return this.service.RemoveFriend(a,b)},GameService.prototype.SendEvent=function(a,b,c){return this.service.SendEvent(a,b,c)},GameService.prototype.ListenForEvent=function(a){return this.service.ListenForEvent(a)},GameService.prototype.GetAllEvents=function(a){return this.service.GetAllEvents(a)},GameService.prototype.GetReferralCode=function(a){return this.service.GetReferralCode(a)},GameService.prototype.UseReferralCode=function(a,b){return this.service.UseReferralCode(a,b)};function LibXtralife(){}LibXtralife.Log=function(a){console.log(a)},LibXtralife.LogError=function(a){console.log(a)},LibXtralife.prototype.Init=function(a,b,c){this.clan=Clan(a,b,c);var d=localStorage.getItem('gamer');null!==d&&(this.gamerData=JSON.parse(d))},LibXtralife.prototype.LoginAnonymously=function(a,b){return this.gamerData?void this.ResumeSession(this.gamerData.gamer_id,this.gamerData.gamer_secret,b):a?void this.clan.login(null,function(a,c){LibXtralife.Log('>>>> Creating new anonymous player'),null==a&&(this.gamerData=c,localStorage.setItem('gamer',JSON.stringify(c))),b!==void 0&&b(a,c)}.bind(this)):(LibXtralife.Log('>>>> Anonymous login disabled'),void(void 0!==b&&b(null,null)))},LibXtralife.prototype.ResumeSession=function(a,b,c){this.clan.resumeSession(a,b,function(a,b){LibXtralife.Log('>>>> Resuming session'),null==a&&(this.gamerData=b,localStorage.setItem('gamer',JSON.stringify(b))),c!==void 0&&c(a,b)}.bind(this))},LibXtralife.prototype.LoginWithCredentials=function(a,b,c,d){return this.gamerData?void this.ResumeSession(this.gamerData.gamer_id,this.gamerData.gamer_secret,d):void this.clan.login('email',a,b,c,function(a,b){null==a&&(this.gamerData=b,localStorage.setItem('gamer',JSON.stringify(b))),d!==void 0&&d(a,b)}.bind(this))},LibXtralife.prototype.LoginWithShortCode=function(a,b){return this.gamerData?void this.ResumeSession(this.gamerData.gamer_id,this.gamerData.gamer_secret,b):void this.clan.loginWithShortCode(a,function(a,c){null==a&&(this.gamerData=c,localStorage.setItem('gamer',JSON.stringify(c))),b!==void 0&&b(a,c)}.bind(this))},LibXtralife.prototype.LoginWithFacebook=function(a,b){return this.gamerData?void this.ResumeSession(this.gamerData.gamer_id,this.gamerData.gamer_secret,b):void this.clan.login('facebook','',a,function(a,c){null==a&&(this.gamerData=c,localStorage.setItem('gamer',JSON.stringify(c))),b!==void 0&&b(a,c)}.bind(this))},LibXtralife.prototype.Logout=function(a){this.clan.logout(function(b){a!==void 0&&a(b)}.bind(this))},LibXtralife.prototype.ConvertAccount=function(a,b,c,d){this.gamerData?this.clan.withGamer(this.gamerData).convertTo(a,b,c,function(a,b){d!==void 0&&d(a,b)}.bind(this)):d!==void 0&&d(null)},LibXtralife.prototype.LinkAccount=function(a,b,c,d){this.gamerData?(console.log('LinkAccount: '+a+', '+b+', '+c),this.clan.withGamer(this.gamerData).link(a,b,c,function(a,b){console.log('LinkAccount error: '+JSON.stringify(a)),console.log('LinkAccount result: '+JSON.stringify(b)),d!==void 0&&d(a,b)}.bind(this))):d!==void 0&&d(null)},LibXtralife.prototype.ResetPassword=function(a,b,c,d,e){this.clan.sendResetMailPassword(a,b,c,d,function(a,b){e!==void 0&&e(a,b)}.bind(this))},LibXtralife.prototype.ChangePassword=function(a,b){this.gamerData?this.clan.withGamer(this.gamerData).changePassword(a,function(a,c){b!==void 0&&b(a,c)}.bind(this)):b!==void 0&&b(null)},LibXtralife.prototype.GetGamerData=function(){return this.gamerData},LibXtralife.prototype.GetProfileData=function(){if(this.gamerData){var a=this.gamerData.profile;return new GameService.Player(this.gamerData.gamer_id,a.displayName,a.avatar,a.email,a.lang)}return null},LibXtralife.prototype.GetProfile=function(a){this.gamerData?this.clan.withGamer(this.gamerData).profile().get(function(b,c){a!==void 0&&a(b,c)}):a!==void 0&&a(null)},LibXtralife.prototype.SetProfile=function(a,b){this.gamerData?this.clan.withGamer(this.gamerData).profile().set(a,function(a,c){b!==void 0&&b(a,c)}):b!==void 0&&b(null)},LibXtralife.prototype.GetGames=function(){if(this.gamerData){for(var a=this.gamerData.games,b=[],c=0;c<a.length;c++)b.push(new GameService.Game(a[c].appid,a[c].appid,a[c].lastlogin,null,null));return b}return null},LibXtralife.prototype.ListUsers=function(a,b,c,d){this;this.gamerData?this.clan.withGamer(this.gamerData).listUsers(encodeURIComponent(a),c,b,function(a,b){console.log('ListUsers error: '+JSON.stringify(a)),console.log('ListUsers result: '+JSON.stringify(b)),d!==void 0&&(null===a?d(b.result):d(null))}):d!==void 0&&d(null)},LibXtralife.prototype.LeaderboardGetPaged=function(a,b,c,d){this;this.gamerData?this.clan.withGamer(this.gamerData).leaderboards(this.clan.privateDomain).getHighscores(a,+b,+c,function(b,c){if(null!==b)LibXtralife.LogError('Leaderboard Get Paged error: '+b),void 0!==d&&d(null);else{LibXtralife.Log('LeaderboardGetPaged: '+JSON.stringify(c));var e=[],f=c[a];if(f!==void 0)for(var g,e=[],h=0;h<f.scores.length;h++)g=f.scores[h],void 0!==g&&e.push(new GameService.LbdEntry(g.gamer_id,f.rankOfFirst+h,g.profile.displayName,g.score.score,g.score.info,g.profile.avatar,g.score.timestamp));d!==void 0&&d(e)}}):d!==void 0&&d(null)},LibXtralife.prototype.LeaderboardGetFriendsPaged=function(a,b,c,d){this;this.gamerData?this.clan.withGamer(this.gamerData).leaderboards(this.clan.privateDomain).getFriendsHighscores(a,+b,+c,function(b,c){if(null!==b)LibXtralife.LogError('Leaderboard Get Friends Paged error: '+b),void 0!==d&&d(null);else{LibXtralife.Log('LeaderboardGetFriendsPaged: '+JSON.stringify(c));var e=[],f=c[a];if(f!==void 0)for(var g,h=0;h<f.length;h++)g=f[h],void 0!==g&&e.push(new GameService.LbdEntry(g.gamer_id,g.rank,g.profile.displayName,g.score.score,g.score.info,g.profile.avatar,g.score.timestamp));d!==void 0&&d(e)}}):d!==void 0&&d(null)},LibXtralife.prototype.LeaderboardGetRank=function(a,b){var c=this;this.gamerData?this.clan.withGamer(this.gamerData).leaderboards(this.clan.privateDomain).getCenteredHighscores(a,1,function(d,e){var f=null;if(LibXtralife.Log(c.gamerData),null!==d)LibXtralife.LogError('Could not get centered rank: '+JSON.stringify(d));else{var g=e[a];if(void 0!==g){var h=g.scores[0];void 0!==h&&(LibXtralife.Log('LeaderboardGetRank: '+JSON.stringify(e)),f=new GameService.LbdEntry(h.gamer_id,g.rankOfFirst,h.profile.displayName,h.score.score,h.score.info,h.profile.avatar,h.score.timestamp))}}void 0!==b&&b(f)}):b!==void 0&&b(null)},LibXtralife.prototype.LeaderboardSetScore=function(a,b,c,d,e){this;if(this.gamerData){this.clan.withGamer(this.gamerData).leaderboards(this.clan.privateDomain).set(a,b,{score:+c,info:d},function(a,b){null===a?(LibXtralife.Log('LeaderboardSetScore: '+JSON.stringify(b)),e!==void 0&&e(!0)):(LibXtralife.LogError('Leaderboard Set score error: '+a),e!==void 0&&e(!1))})}else void 0!==e&&e(!1)},LibXtralife.prototype.SetUserData=function(a,b,c){this.gamerData?this.clan.withGamer(this.gamerData).gamervfs(this.clan.privateDomain).setValue(a,b,function(a,b){null===a?(LibXtralife.LogError('User data set: '+b.result),c!==void 0&&c(!0)):(LibXtralife.LogError('Set user data error: '+JSON.stringify(a)),c!==void 0&&c(!1))}):c!==void 0&&c(!1)},LibXtralife.prototype.GetUserData=function(a,b){this.gamerData?this.clan.withGamer(this.gamerData).gamervfs(this.clan.privateDomain).getValue(a,function(c,d){null===c?(LibXtralife.Log('User data get: '+JSON.stringify(d)),b!==void 0&&b(d.result[a])):(LibXtralife.LogError('Get user data error: '+JSON.stringify(c)),b!==void 0&&b(null))}):b!==void 0&&b(null)},LibXtralife.prototype.GetFriends=function(a){this.gamerData?this.clan.withGamer(this.gamerData).friends(this.clan.privateDomain).get(function(b,c){if(null!==b)LibXtralife.LogError('Get friends error: '+JSON.stringify(b)),void 0!==a&&a(null);else{LibXtralife.Log('Get friends: '+JSON.stringify(c));var d=[],e=c.friends;if(e!==void 0)for(var f,g=0;g<e.length;g++)f=e[g],void 0!==f&&d.push(new GameService.Player(f.gamer_id,f.profile.displayName,f.profile.avatar,f.profile.email));a!==void 0&&a(d)}}):a!==void 0&&a(null)},LibXtralife.prototype.AddFriend=function(a,b){this.gamerData?this.clan.withGamer(this.gamerData).friends(this.clan.privateDomain).status(a,'add',function(a,c){null===a?(LibXtralife.Log('AddFriend: '+JSON.stringify(c)),b!==void 0&&b(!0)):(LibXtralife.LogError('AddFriend error: '+JSON.stringify(a)),b!==void 0&&b(!1))}):b!==void 0&&b(!1)},LibXtralife.prototype.RemoveFriend=function(a,b){this.gamerData?this.clan.withGamer(this.gamerData).friends(this.clan.privateDomain).status(a,'forget',function(a,c){null===a?(LibXtralife.Log('RemoveFriend: '+JSON.stringify(c)),b!==void 0&&b(!0)):(LibXtralife.LogError('RemoveFriend error: '+JSON.stringify(a)),b!==void 0&&b(!1))}):b!==void 0&&b(!1)},LibXtralife.prototype.SendEvent=function(a,b,c){this.gamerData===void 0?c!==void 0&&c(null):this.clan.withGamer(this.gamerData).events(this.clan.privateDomain).send(a,b,null,function(a,b){null===a?(LibXtralife.Log('SendEvent: '+JSON.stringify(b)),c!==void 0&&c(a,b)):(LibXtralife.LogError('SendEvent error: '+JSON.stringify(a)),c!==void 0&&c(a,b))})},LibXtralife.prototype.ListenForEvent=function(a){this.gamerData===void 0?a!==void 0&&a(null):this.clan.withGamer(this.gamerData).events(this.clan.privateDomain).receive('auto',function(b,c){null===b?(LibXtralife.Log('ListenForEvent: '+JSON.stringify(c)),a!==void 0&&a(b,c)):(LibXtralife.LogError('ListenForEvent error: '+JSON.stringify(b)),a!==void 0&&a(b,c))})},LibXtralife.prototype.GetAllEvents=function(a){if(void 0===this.gamerData)return void(void 0!==a&&a(null));var b=[];events_available=!0;var c=this,d=function(){c.ListenForEvent(function(c,e){null===e?a!==void 0&&a(b):(b.push(e),d())})};d()},LibXtralife.prototype.GetReferralCode=function(a){this.gamerData===void 0?a!==void 0&&a(null):this.clan.withGamer(this.gamerData).referral(this.clan.privateDomain).getCode(function(b,c){null===c?a!==void 0&&a(null):a!==void 0&&a(c.godfathercode)})},LibXtralife.prototype.UseReferralCode=function(a,b){this.gamerData===void 0?b!==void 0&&b(!1):this.clan.withGamer(this.gamerData).referral(this.clan.privateDomain).useCode(a,null,function(a){null===a?b!==void 0&&b(!0):b!==void 0&&b(!1)})};function LibAds(){this.service=null,AdsService.instance=this}LibAds.Log=function(a){console.log(a)},LibAds.LogError=function(a){console.log(a)},LibAds.prototype.Init=function(a){AdsService.instance.Init(a)},LibAds.prototype.IsSupported=function(a,b){return AdsService.instance.IsSupported(a,b)},LibAds.prototype.PreloadAd=function(a,b,c){AdsService.instance.PreloadAd(a,b,c)},LibAds.prototype.ShowAd=function(a,b,c){AdsService.instance.ShowAd(a,b,c)};var FBInstant={options:{AllowAnonymous:!0,ServiceName:'xtralife',ApiKey:'',ApiSecret:'',DevMode:'sandbox',ShareURI:'http://yourdomain.com/baby/index.php',ShareDlgWidth:600,ShareDlgHeight:400},supportedAPIs:['player.getDataAsync','player.setDataAsync','player.getConnectedPlayersAsync','getLocale','initializeAsync','setLoadingProgress','startGameAsync','getEntryPointData','shareAsync','Leaderboard.getEntriesAsync','Leaderboard.getConnectedPlayerEntriesAsync','Leaderboard.getPlayerEntryAsync','Leaderboard.setScoreAsync','getLeaderboardAsync','ext.isLoggedIn','ext.getLoginType','ext.getRegistrationDate','ext.loginWithShortCodeAsync','ext.loginAnonymouslyAsync','ext.loginWithEmailAsync','ext.loginWithFacebookAccessTokenAsync','ext.logoutAsync','ext.convertAccountAsync','ext.linkAccountAsync','ext.resetPasswordAsync','ext.changePasswordAsync','ext.getGames','ext.setProfileAsync','ext.addFriendAsync','ext.removeFriendAsync','ext.listUsersAsync','ext.sendEventAsync','ext.getEventsAsync','ext.getReferralCodeAsync','ext.useReferralCodeAsync','ext.shareTwitterAsync'],__state:{initialized:!1},Log:function(a){console.log(a)},player:{getName:function(){var a=GameService.instance.GetProfileData();return null===a?null:a.name},getPhoto:function(){var a=GameService.instance.GetProfileData();if(null===a)return null;var b=a.photo;return console.log('photo = '+b),void 0===b?null:b},getID:function(){var a=GameService.instance.GetProfileData();return null===a?null:a.gamer_id},getDataAsync:function(a){return new Promise(function(b){GameService.instance.GetUserData('userData',function(c){var d={};null===c?(c=localStorage.getItem('userData'),c=JSON.parse(c)):localStorage.setItem('userData',JSON.stringify(c)),null!==c&&a.forEach(function(a){'undefined'!==c[a]&&(d[a]=c[a])}),b(d)})})},setDataAsync:function(a){return new Promise(function(b){var c=localStorage.getItem('userData'),d=JSON.parse(c);for(var e in(void 0===d||null==d)&&(d={}),a)d[e]=a[e];localStorage.setItem('userData',JSON.stringify(d)),GameService.instance.SetUserData('userData',JSON.stringify(d),function(){b()})})},getStatsAsync:function(){},setStatsAsync:function(){},incrementStatsAsync:function(){},flushDataAsync:function(){},getConnectedPlayersAsync:function(){return new Promise(function(a){GameService.instance.GetFriends(function(b){a(b)})})},getSignedPlayerInfoAsync:function(){return new Promise(function(a){a(null)})}},context:{getID:function(){return null},chooseAsync:function(){return new Promise(function(a){a()})},switchAsync:function(){return new Promise(function(a){a()})},createAsync:function(){return new Promise(function(a){a()})},getType:function(){return'SOLO'},isSizeBetween:function(){return!0},getPlayersAsync:function(){return new Promise(function(a){a([])})}},payments:{getCatalogAsync:function(){return new Promise(function(a,b){b()})},purchaseAsync:function(){return new Promise(function(a,b){b()})},getPurchasesAsync:function(){return new Promise(function(a,b){b()})},consumePurchaseAsync:function(){return new Promise(function(a,b){b()})},onReady:function(){}},getSupportedAPIs:function(){return FBInstant.supportedAPIs},getLocale:function(){var a=GameService.instance.GetProfileData();if(a===void 0)return'en_US';var b=a.lang;return b+'_'},initializeAsync:function(){return new Promise(function(a){FBInstant.Log('>>>> initializeAsync');var b=FBInstant.options;GameService.instance.Init(b.ApiKey,b.ApiSecret,b.DevMode),a()})},setLoadingProgress:function(){return new Promise(function(a){a()})},startGameAsync:function(){return new Promise(function(a,b){FBInstant.Log('>>>> startGameAsync'),GameService.instance.LoginAnonymously(FBInstant.options.AllowAnonymous,function(c){null===c?(FBInstant.__state.initialized=!0,FBInstant.Log('>> Login success'),a()):(FBInstant.Log('>> Login failed'),b())})})},quit:function(){},updateAsync:function(){return new Promise(function(a){a()})},getEntryPointData:function(){FBInstant.Log('>>>> getEntryPointData');var a=window.location.search;a.startsWith('?')&&(a=a.substring(1));for(var b=a.split('&'),c=0;c<b.length;c++)if(b[c].startsWith('data')){var d=b[c].split('=');return void 0!==d[1]&&''!==d[1]&&(a=decodeURIComponent(d[1]),a=JSON.parse(a),FBInstant.Log(a)),void 0===a?null:a}return null},getEntryPointAsync:function(){return new Promise(function(a){a('admin_message')})},setSessionData:function(){},getPlatform:function(){return'WEB'},getSDKVersion:function(){return'6.2'},shareAsync:function(a){return new Promise(function(b){var c=a.title===void 0?'':a.title,d=a.text,e=encodeURIComponent(FBInstant.options.ShareURI+'?t='+c+'&d='+d);a.data!==void 0&&(e+='&data='+JSON.stringify(a.data)),window.open('https://www.facebook.com/sharer/sharer.php?u='+e,'pop','width='+FBInstant.options.ShareDlgWidth+', height='+FBInstant.options.ShareDlgHeight+', scrollbars=no'),b()})},switchGameAsync:function(){return Promise.reject(new Error('Not available'))},logEvent:function(){return null},onPause:function(a){window.onblur=function(){a()}},canCreateShortcutAsync:function(){return Promise.resolve(!1)},Leaderboard:function(a){this.name=a},getLeaderboardAsync:function(a){return new Promise(function(b){b(new FBInstant.Leaderboard(a))})},AdInstance:function(a,b){this.id=a,this.type=b},getInterstitialAdAsync:function(a){return new Promise(function(b,c){AdsService.instance.IsSupported(a,'inter')?b(new FBInstant.AdInstance(a,'inter')):c()})},getRewardedVideoAsync:function(a){return new Promise(function(b,c){AdsService.instance.IsSupported(a,'video')?b(new FBInstant.AdInstance(a,'video')):c()})}};FBInstant.AdInstance.prototype.getPlacementID=function(){return this.id},FBInstant.AdInstance.prototype.loadAsync=function(){var a=this;return new Promise(function(b,c){AdsService.instance.PreloadAd(a.id,a.type,function(a){a?b():c()})})},FBInstant.AdInstance.prototype.showAsync=function(){var a=this;return new Promise(function(b,c){AdsService.instance.ShowAd(a.id,a.type,function(a){a?b():c()})})},FBInstant.Leaderboard.prototype.getEntriesAsync=function(a,b){var c=this;return new Promise(function(d){GameService.instance.LeaderboardGetPaged(c.name,(0|b/a)+1,a,function(a){d(a)})})},FBInstant.Leaderboard.prototype.getConnectedPlayerEntriesAsync=function(a,b){var c=this;return new Promise(function(d){GameService.instance.LeaderboardGetFriendsPaged(c.name,(0|b/a)+1,a,function(a){d(a)})})},FBInstant.Leaderboard.prototype.getPlayerEntryAsync=function(){var a=this;return new Promise(function(b){GameService.instance.LeaderboardGetRank(a.name,function(a){b(a)})})},FBInstant.Leaderboard.prototype.setScoreAsync=function(a,b){var c=this;return new Promise(function(d){GameService.instance.LeaderboardSetScore(c.name,'hightolow',a,b,function(a){d(a)})})},FBInstant.ext={isLoggedIn:function(){return GameService.instance.GetProfileData()!==void 0},getLoginType:function(){var a=GameService.instance.GetProfileData();return void 0===a?'none':a.network},getRegistrationDate:function(){var a=GameService.instance.GetProfileData();return void 0===a?null:a.registerTime},loginWithShortCodeAsync:function(a){return new Promise(function(b){GameService.instance.LoginWithShortCode(a,function(a,c){b(a,c)})})},loginAnonymouslyAsync:function(){return new Promise(function(a,b){GameService.instance.LoginAnonymously(FBInstant.options.AllowAnonymous,function(c){null===c?(FBInstant.Log('>> Login success'),a()):(FBInstant.Log('>> Login failed'),b())})})},loginWithEmailAsync:function(a,b,c){return new Promise(function(d,e){GameService.instance.LoginWithCredentials(a,b,c,function(a){null===a?(FBInstant.Log('>> Login with email success'),d()):(FBInstant.Log('>> Login with email failed'),e())})})},loginWithFacebookAccessTokenAsync:function(a){return new Promise(function(b){GameService.instance.LoginWithFacebook(a,function(a,c){b(a,c)})})},logoutAsync:function(){return new Promise(function(a){GameService.instance.Logout(function(b){a(b)})})},convertAccountAsync:function(a,b,c){return new Promise(function(d){GameService.instance.ConvertAccount(a,b,c,function(a){d(a)})})},linkAccountAsync:function(a,b,c){return new Promise(function(d){GameService.instance.LinkAccount(a,b,c,function(a){d(a)})})},resetPasswordAsync:function(){return new Promise(function(a){GameService.instance.ResetPassword(network,id,secret,function(b){a(b)})})},changePasswordAsync:function(a){return new Promise(function(b){GameService.instance.ChangePassword(a,function(a){b(a)})})},getGames:function(){return GameService.instance.GetGames()},setProfileAsync:function(a){return new Promise(function(b){GameService.instance.SetProfile(a,function(a){b(a)})})},addFriendAsync:function(a){return new Promise(function(b){GameService.instance.AddFriend(a,function(a){console.log('>>>>>. addFriendAsync '+a),b(a)})})},removeFriendAsync:function(a){return new Promise(function(b){GameService.instance.RemoveFriend(a,function(a){b(a)})})},listUsersAsync:function(a,b,c){return new Promise(function(d){GameService.instance.ListUsers(a,b,c,function(a){d(a)})})},sendEventAsync:function(a,b){return new Promise(function(c){GameService.instance.SendEvent(a,b,function(a){c(null===a)})})},getEventsAsync:function(){return new Promise(function(a){GameService.instance.GetAllEvents(function(b){a(b)})})},getReferralCodeAsync:function(){return new Promise(function(a){GameService.instance.GetReferralCode(function(b){a(b)})})},useReferralCodeAsync:function(a){return new Promise(function(b){GameService.instance.UseReferralCode(a,function(a){b(a)})})},shareTwitterAsync:function(a){return new Promise(function(b){var c=a.text,d=encodeURIComponent(c);window.open('https://twitter.com/intent/tweet?text='+d,'pop','width='+FBInstant.options.ShareDlgWidth+', height='+FBInstant.options.ShareDlgHeight+', scrollbars=no'),b()})}};