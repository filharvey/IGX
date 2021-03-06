var FBInstant = {
    options: {
        AllowAnonymous: true,   // When set to true new users will be auto logged in with an anonymous account
        ServiceName: "xtralife",// Default back-end is Xtralife
        ApiKey: "",             // Game service back-end API key
        ApiSecret: "",          // Game service back-end API secret
        DevMode: "sandbox",     // sandbox or prod
        ShareURI: "http://yourdomain.com/index.php", // URI used by shareAsync dialog
        ShareDlgWidth: 600,     // shareAsync dialog width
        ShareDlgHeight: 400,    // shareAsync dialog height
    },
    supportedAPIs: [
        "player.getDataAsync",
        "player.setDataAsync",
        "player.getConnectedPlayersAsync",
        "getLocale",
        "initializeAsync",
        "setLoadingProgress",
        "startGameAsync",
        "getEntryPointData",
        "shareAsync",
        "Leaderboard.getEntriesAsync",
        "Leaderboard.getConnectedPlayerEntriesAsync",
        "Leaderboard.getPlayerEntryAsync",
        "Leaderboard.setScoreAsync",
        "getLeaderboardAsync",
        //"updateAsync",
        //"getEntryPointAsync",
        //"switchGameAsync",
        //"logEvent",
        //"canCreateShortcutAsync",
        //"getInterstitialAdAsync",
        //"getRewardedVideoAsync",
        //"AdInstance.loadAsync",
        //"AdInstance.showAsync",
        //"context.chooseAsync",
        //"context.switchAsync",
        //"context.createAsync",
        //"context.getPlayersAsync",
        //"payments.getCatalogAsync",
        //"payments.purchaseAsync",
        //"payments.getPurchasesAsync",
        //"payments.consumePurchaseAsync",
        //"payments.purchaseAsync",
        "ext.isLoggedIn",
        "ext.getLoginType",
        "ext.getRegistrationDate",
        "ext.loginWithShortCodeAsync",
        "ext.loginAnonymouslyAsync",
        "ext.loginWithEmailAsync",
        "ext.loginWithFacebookAccessTokenAsync",
        "ext.logoutAsync",
        "ext.convertAccountAsync",
        "ext.linkAccountAsync",
        "ext.resetPasswordAsync",
        "ext.changePasswordAsync",
        "ext.getGames",
        "ext.setProfileAsync",
        "ext.addFriendAsync",
        "ext.removeFriendAsync",
        "ext.listUsersAsync",
        "ext.sendEventAsync",
        "ext.getEventsAsync",
        "ext.getReferralCodeAsync",
        "ext.useReferralCodeAsync",
        "ext.shareTwitterAsync",
    ],
    __state: {
        initialized: false
    },
    Log: function(message)
    {
        console.log(message);
    },
    player : {
        getName: function() {
            var data = GameService.instance.GetProfileData();
            if (data === null)
                return null;
            return data.name;
        },
        getPhoto: function() {
            var data = GameService.instance.GetProfileData();
            if (data === null)
                return null;
            var photo = data.photo;
            console.log("photo = " + photo);
            return (photo !== undefined) ? photo : null;
        },
        getID: function() {
            var data = GameService.instance.GetProfileData();
            if (data === null)
                return null;
            return data.gamer_id;
        },
        getDataAsync: function(keys) {
            return new Promise(function(resolve, reject){
                GameService.instance.GetUserData("userData", function(data) {
                    var response = {};
                    if (data === null) {
                        data = localStorage.getItem("userData");
                        data = JSON.parse(data);
                    }
                    else
                    {
                        localStorage.setItem("userData", JSON.stringify(data));
                    }
                    if (data !== null) {
                        keys.forEach(function(key){
                            if (data[key] !== "undefined") {
                                response[key] = data[key];
                            }
                        });
                    }
                    resolve(response);
                });
            });
        },
        setDataAsync: function(data_object) {
            return new Promise(function(resolve, reject) {
                var data = localStorage.getItem("userData");
                var obj = JSON.parse(data);
                if (obj === undefined || obj == null)
                    obj = {};
                for (var attr in data_object)
                    obj[attr] = data_object[attr];
                localStorage.setItem("userData", JSON.stringify(obj));
                GameService.instance.SetUserData("userData", JSON.stringify(obj), function(success) {
                    resolve();
                });
            });
        },
        getStatsAsync: function(keys) {
            // TODO:
        },
        setStatsAsync: function(obj) {
            // TODO:
        },
        incrementStatsAsync: function(obj) {
            // TODO:
        },
        flushDataAsync: function(obj) {
            // TODO:
        },
        getConnectedPlayersAsync: function() {
            return new Promise(function(resolve, reject) {
                GameService.instance.GetFriends(function(friends) {
                    resolve(friends);
                })
            });
        },
        getSignedPlayerInfoAsync: function() {
            // TODO:
            return new Promise(function(resolve, reject) {
                resolve(null);
            });
        }
    },
    context : {
        getID: function() {
            return null;
        },
        chooseAsync: function() {
            // TODO:
            return new Promise(function(resolve, reject) {
                resolve();
            });
        },
        switchAsync: function(contextId) {
            // TODO:
            return new Promise(function(resolve, reject) {
                resolve();
            });
        },
        createAsync: function(userId) {
            // TODO:
            return new Promise(function(resolve, reject) {
                resolve();
            });
        },
        getType: function() {
            // TODO:
            return "SOLO";
        },
        isSizeBetween: function(minSize, maxSize) {
            // TODO:
            return true;
        },
        getPlayersAsync: function() {
            // TDOO:
            return new Promise(function(resolve, reject) {
                var players = [];
                resolve(players);
            });
        }
    },

    payments: {
        getCatalogAsync: function() {
            // TODO:
            return new Promise(function(resolve, reject) {
                reject();
            });
        },
        purchaseAsync: function(product) {
            // TODO:
            return new Promise(function(resolve, reject) {
                reject();
            });
        },
        getPurchasesAsync: function() {
            // TODO:
            return new Promise(function(resolve, reject) {
                reject();
            });
        },
        consumePurchaseAsync: function(purchaseToken) {
            // TODO:
            return new Promise(function(resolve, reject) {
                reject();
            });
        },
        onReady: function(callback) {
        }
    },

    getSupportedAPIs: function()
    {
        return FBInstant.supportedAPIs;
    },

    getLocale: function() {
        var data = GameService.instance.GetProfileData();
        if (data === undefined)
            return "en_US";
        var locale = data.lang;
        return locale + "_";
    },

    initializeAsync: function() {
        return new Promise(function(resolve, reject){
            FBInstant.Log(">>>> initializeAsync");
            var options = FBInstant.options;
            GameService.instance.Init(options.ApiKey, options.ApiSecret, options.DevMode);
            resolve();
        });
    },

    setLoadingProgress: function(progress) {
        return new Promise(function(resolve, reject) {
            resolve();
        });
    },

    startGameAsync: function() {
        return new Promise(function(resolve, reject){
            FBInstant.Log(">>>> startGameAsync");
            GameService.instance.LoginAnonymously(FBInstant.options.AllowAnonymous, function(error, data) {
                if (error === null)
                {
                    FBInstant.__state.initialized = true;
                    FBInstant.Log(">> Login success");
                    resolve();
                }
                else
                {
                    FBInstant.Log(">> Login failed");
                    reject();
                }
            });
        });
    },

    quit: function() {
        // TODO:
    },

    updateAsync: function(config) {
        // TODO:
        return new Promise(function(resolve, reject){
            resolve();
        });
    },

    getEntryPointData: function() {
        FBInstant.Log(">>>> getEntryPointData");
        var data = window.location.search;
        if (data.startsWith("?"))
            data = data.substring(1);
        var prms = data.split('&');
        for (var t = 0; t < prms.length; t++)
        {
            if (prms[t].startsWith("data"))
            {
                var p = prms[t].split('=');
                if (p[1] !== undefined && p[1] !== "")
                {
                    data = decodeURIComponent(p[1]);
                    data = JSON.parse(data);
                    FBInstant.Log(data);
                }
                return data !== undefined ? data : null;
            }
        }
        return null;
    },

    getEntryPointAsync: function() {
        // TODO:
        return new Promise(function(resolve, reject){
            resolve('admin_message');
        });
    },

    setSessionData: function(object) {
        // TODO:
    },

    getPlatform: function() {
        return 'WEB';
    },

    getSDKVersion: function() {
        return '6.2';
    },

    shareAsync: function(options) {
        return new Promise(function(resolve, reject) {
            var title = (options.title !== undefined) ? options.title : "";
            var message = options.text;
            var url = encodeURIComponent(FBInstant.options.ShareURI + "?t=" + title + "&d=" + message);
            if (options.data !== undefined)
                url += "&data=" + JSON.stringify(options.data);
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'pop', 'width=' + FBInstant.options.ShareDlgWidth + ', height=' + FBInstant.options.ShareDlgHeight + ', scrollbars=no');
            resolve();
        });        
    },

    switchGameAsync: function(appId) {
        return Promise.reject(new Error('Not available'))
    },

    logEvent: function(eventName, value, parameters) {
        // TODO:
        return null;
    },

    onPause: function(callback) {
        window.onblur = function() {
            callback();
        };
    },

    canCreateShortcutAsync: function()
    {
        return Promise.resolve(false);
    },

    Leaderboard: function(name)
    {
        this.name = name;
    },

    getLeaderboardAsync: function(name)
    {
        return new Promise(function(resolve, reject) {
            resolve(new FBInstant.Leaderboard(name));
        });
    },

    AdInstance: function(id, type)
    {
        this.id = id;
        this.type = type;
    },

    getInterstitialAdAsync: function(id)
    {
        return new Promise(function(resolve, reject) {
            if (AdsService.instance.IsSupported(id, "inter"))
                resolve(new FBInstant.AdInstance(id, "inter"));
            else
                reject();
        });        
    },

    getRewardedVideoAsync: function(id)
    {
        return new Promise(function(resolve, reject) {
            if (AdsService.instance.IsSupported(id, "video"))
                resolve(new FBInstant.AdInstance(id, "video"));
            else
                reject();
        });        
    },
};

FBInstant.AdInstance.prototype.getPlacementID = function()
{
    return this.id;
}

FBInstant.AdInstance.prototype.loadAsync = function()
{
    var self = this;
    return new Promise(function(resolve, reject) {
        AdsService.instance.PreloadAd(self.id, self.type, function(success) {
            if (success)
                resolve();
            else
                reject();
        })
    });        
}

FBInstant.AdInstance.prototype.showAsync = function()
{
    var self = this;
    return new Promise(function(resolve, reject) {
        AdsService.instance.ShowAd(self.id, self.type, function(success) {
            if (success)
                resolve();
            else
                reject();
        })
    });        
}

FBInstant.Leaderboard.prototype.getEntriesAsync = function(count, start)
{
    var self = this;
    return new Promise(function(resolve, reject) {
        GameService.instance.LeaderboardGetPaged(self.name, ((start / count) | 0) + 1, count, function(entries) {
            resolve(entries);
        });
    })
}

FBInstant.Leaderboard.prototype.getConnectedPlayerEntriesAsync = function(count, start)
{
    var self = this;
    return new Promise(function(resolve, reject) {
        GameService.instance.LeaderboardGetFriendsPaged(self.name, ((start / count) | 0) + 1, count, function(entries) {
            resolve(entries);
        });
    })
}

FBInstant.Leaderboard.prototype.getPlayerEntryAsync = function()
{
    var self = this;
    return new Promise(function(resolve, reject) {
        GameService.instance.LeaderboardGetRank(self.name, function(entry) {
            resolve(entry);
        });
    })
}

FBInstant.Leaderboard.prototype.setScoreAsync = function(score, meta)
{
    var self = this;
    return new Promise(function(resolve, reject) {
        GameService.instance.LeaderboardSetScore(self.name, "hightolow", score, meta, function(entry) {
            resolve(entry);
        });
    })
}

//
// None standard extensions (Check FBInstant.ext is not undefined before using)
//
FBInstant.ext = {
    /**
     * Checks to see if the user is logged in
     * @return true if logged in
     */
    isLoggedIn: function() {
        return GameService.instance.GetProfileData() !== undefined;
    },
    /**
     * Gets the login type, e.g. anonymous, email, facebook etc..
     * @return Login network type
     */
    getLoginType: function() {
        var data = GameService.instance.GetProfileData();
        if (data === undefined)
            return "none";
        return data.network;
    },
    /**
     * Gets the date / time that the user first registered
     * @return List of games
     */
    getRegistrationDate: function() {
        var data = GameService.instance.GetProfileData();
        if (data === undefined)
            return null;
        return data.registerTime;
    },
    /**
     * Logs the player in with the supplied shortcode
     * @param shortcode {string} The Game service shortcode (sent by password reset usually)
     * @return error or null if no error, gamer contains the gamers data
     */
    loginWithShortCodeAsync: function(shortcode) {
        return new Promise(function(resolve, reject){
			GameService.instance.LoginWithShortCode(shortcode, function(error, gamer) {
                resolve(error, gamer);
			})
        });
    },
    /**
     * Logs the player in anonymously
     * @return error or null if no error, gamer contains the gamers data
     */
    loginAnonymouslyAsync: function() {
        return new Promise(function(resolve, reject){
            GameService.instance.LoginAnonymously(FBInstant.options.AllowAnonymous, function(error, data) {
                if (error === null)
                {
                    FBInstant.Log(">> Login success");
                    resolve();
                }
                else
                {
                    FBInstant.Log(">> Login failed");
                    reject();
                }
            });
        });
    },
    /**
     * Logs the player in with an email and password
     * @param email {string} The users email address
     * @param password {string} The users password
     * @param options {object} Login options
     * @return error or null if no error, gamer contains the gamers data
     */
    loginWithEmailAsync: function(email, password, options) {
        return new Promise(function(resolve, reject){
            GameService.instance.LoginWithCredentials(email, password, options, function(error, data) {
                if (error === null)
                {
                    FBInstant.Log(">> Login with email success");
                    resolve();
                }
                else
                {
                    FBInstant.Log(">> Login with email failed");
                    reject();
                }
            });
        });
    },
    /**
     * Logs the player in with the supplied Facebook access token
     * @param facebook_access_token {string} The Facebook access token, this can be retrieved from response.authResponse.accessToken in the FB.getLoginStatus() callback
     * @return error or null if no error, gamer contains the gamers data
     */
    loginWithFacebookAccessTokenAsync: function(facebook_access_token) {
        return new Promise(function(resolve, reject){
			GameService.instance.LoginWithFacebook(facebook_access_token, function(error, gamer) {
                resolve(error, gamer);
			})
        });
    },
    /**
     * Logs the player out
     * @return error or null if no error
     */
    logoutAsync: function() {
        return new Promise(function(resolve, reject){
			GameService.instance.Logout(function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Converts an anonymous account to an email or social network account
     * @param network {string} Type of network to convert account to, email, facebook etc..
     * @param username_or_id {string} Email address for email or ID for Facebook
     * @param password_or_secret {string} Password for email or token for Facebook
     * @return error or null if no error
     */
    convertAccountAsync: function(network, username_or_id, password_or_secret) {
        return new Promise(function(resolve, reject){
			GameService.instance.ConvertAccount(network, username_or_id, password_or_secret, function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Associates a social network account with a game service account
     * @param network {string} Type of network to convert account to, facebook, googleplus etc..
     * @param id {string} ID for Facebook
     * @param secret {string} Token for Facebook
     * @return error or null if no error
     */
    linkAccountAsync: function(network, id, secret) {
        return new Promise(function(resolve, reject){
			GameService.instance.LinkAccount(network, id, secret, function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Sends an email to the players account with a shortcode that can be used to login
     * @param to_email {string} Users emali address
     * @param from_email {string} Your company support email address
     * @param title {string} Email title
     * @param body {Object} Email body, e.g. { body: "You can login with this <b>[[SHORTCODE]]</b>", html: true };
     * @return error or null if no error
     */
    resetPasswordAsync: function(to_email, from_email, title, body) {
        return new Promise(function(resolve, reject){
			GameService.instance.ResetPassword(network, id, secret, function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Changes the users account password
     * @param new_password {string} New password
     * @return error or null if no error
     */
    changePasswordAsync: function(new_password) {
        return new Promise(function(resolve, reject){
			GameService.instance.ChangePassword(new_password, function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Gets list of games that the user has played
     * @return List of games
     */
    getGames: function() {
        return GameService.instance.GetGames();
    },
    /**
     * Sets the players profile data
     * @param profile {object} An object containing profile fields and data
     * @return error or null if no error
     */
    setProfileAsync: function(profile) {
        return new Promise(function(resolve, reject){
			GameService.instance.SetProfile(profile, function(error) {
                resolve(error);
			})
        });
    },
    /**
     * Adds a user as a friend
     * @param id {string} User ID of user to add as a friend
     * @return true if success
     */
    addFriendAsync: function(id) {
        return new Promise(function(resolve, reject){
			GameService.instance.AddFriend(id, function(success) {
                console.log(">>>>>. addFriendAsync " + success)
                resolve(success);
			})
        });
    },
    /**
     * Removes a user as a friend
     * @param id {string} User ID of user to unfriend
     * @return true if success
     */
    removeFriendAsync: function(id) {
        return new Promise(function(resolve, reject){
			GameService.instance.RemoveFriend(id, function(success) {
                resolve(success);
			})
        });
    },
    /**
     * Searches for users using a pattern
     * @param match_pattern {string} A filter used to search for players
     * @param start {number} Index of first user to be returned
     * @param limit {number} Max number of users to return
     * @return List of found users or null if error
     */
    listUsersAsync: function(match_pattern, start, limit) {
        return new Promise(function(resolve, reject){
			GameService.instance.ListUsers(match_pattern, start, limit, function(users) {
                resolve(users);
			})
        });
    },
    /**
     * Send event to another user
     * @param id {string} User ID of user to receive event
     * @param evt {object} Event object to send
     * @return true if success
     */
    sendEventAsync: function(id, evt) {
        return new Promise(function(resolve, reject){
            GameService.instance.SendEvent(id, evt, function(error, data) {
                resolve(error === null);
            });
        });
    },
    /**
     * Collects any pending events
     * @return array of events or null if none
     */
    getEventsAsync: function() {
        return new Promise(function(resolve, reject){
            GameService.instance.GetAllEvents(function(events) {
                resolve(events);
            });
        });
    },
    /**
     * Get a generated referral code
     * @return a referral code or null if failed
     */
    getReferralCodeAsync: function() {
        return new Promise(function(resolve, reject){
            GameService.instance.GetReferralCode(function(code) {
                resolve(code);
            });
        });
    },
    /**
     * Get a generated referral code
     * @return a referral code or null if failed
     */
    useReferralCodeAsync: function(code) {
        return new Promise(function(resolve, reject){
            GameService.instance.UseReferralCode(code, function(success) {
                resolve(success);
            });
        });
    },
    /**
     * Consume a referral code
     * @param options {object} message options, only text is supported at this time
     * @return true if success
     */
    shareTwitterAsync: function(options) {
        return new Promise(function(resolve, reject) {
            var message = options.text;
            var url = encodeURIComponent(message);
            window.open('https://twitter.com/intent/tweet?text=' + url, 'pop', 'width=' + FBInstant.options.ShareDlgWidth + ', height=' + FBInstant.options.ShareDlgHeight + ', scrollbars=no');
            resolve();
        });        
    },
}



