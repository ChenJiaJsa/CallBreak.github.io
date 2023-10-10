window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ActionName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3670egpdFtEu7oGaONVRPVU", "ActionName");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ActionName = void 0;
    var ActionName;
    (function(ActionName) {
      ActionName["Empty"] = "";
      ActionName["AppUpdate"] = "AppUpdate";
      ActionName["SubmitScore"] = "SubmitScore";
      ActionName["LeaderboardScores"] = "LeaderboardScores";
      ActionName["MoreGame"] = "MoreGame";
      ActionName["PrivacyPolicy"] = "PrivacyPolicy";
      ActionName["CheckPermission"] = "CheckPermission";
    })(ActionName = exports.ActionName || (exports.ActionName = {}));
    cc._RF.pop();
  }, {} ],
  AdManger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "276d8UVrGZK27gaLUn6Cl4d", "AdManger");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var BaseInstance_1 = require("../NFramework/Base/BaseInstance");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var PlatformMgr_1 = require("./PlatformMgr");
    var PlatformMgr_2 = require("./PlatformMgr");
    var WebAdManger_1 = require("./WebAdManger");
    var AdManger = function(_super) {
      __extends(AdManger, _super);
      function AdManger() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.m_AdCallback = {};
        _this.m_isCreator = false;
        return _this;
      }
      AdManger.prototype.ShowAd = function(type, placeId, func) {
        void 0 === placeId && (placeId = "");
        void 0 === func && (func = null);
        this.m_AdCallback[placeId] = func;
        if (!(type == EnumMacros_1.AdsType.AT_RewardVideo || type == EnumMacros_1.AdsType.AT_Int_RewardVideo)) {
          var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 101);
          var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + info.mPayId, 0);
          if (1 == effective) {
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Licensing);
            NF_1.default.Debug.Log(">>> callbreak noad mFloatAdTimes !");
            return;
          }
        }
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) PlatformMgr_2.default.GetInstance().ShowAd(type, placeId); else if (this.m_isCreator) switch (type) {
         case EnumMacros_1.AdsType.AT_Banner_Bottom:
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.NFBannerForm);
          break;

         case EnumMacros_1.AdsType.AT_Native_Banner_Bottom:
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.NFNativeBannerForm);
          break;

         case EnumMacros_1.AdsType.AT_RewardVideo:
          this.OnVideoAdReward(type, EnumMacros_1.CallBackStatus.CALL_SUCCESS, placeId);
        } else WebAdManger_1.default.GetInstance().ShowAd(type);
        NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.AD_Status, type);
      };
      AdManger.prototype.CloseAd = function(type) {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) PlatformMgr_2.default.GetInstance().CloseAd(type); else if (this.m_isCreator) switch (type) {
         case EnumMacros_1.AdsType.AT_Banner_Bottom:
          GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.NFBannerForm);
          break;

         case EnumMacros_1.AdsType.AT_Native_Banner_Bottom:
          GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.NFNativeBannerForm);
        } else WebAdManger_1.default.GetInstance().CloseAd(type);
      };
      AdManger.prototype.CheckAd = function(type, placeId) {
        return cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative ? PlatformMgr_2.default.GetInstance().CheckAd(type, placeId) : this.m_isCreator;
      };
      AdManger.prototype.OnVideoAdReward = function(type, status, placeId) {
        if (type == EnumMacros_1.AdsType.AT_RewardVideo || type == EnumMacros_1.AdsType.AT_Int_RewardVideo) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.AdExcitation_adsuc);
            var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.VideoCount);
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.VideoCount, count + 1);
          }
          if (this.m_AdCallback[placeId]) {
            this.m_AdCallback[placeId](status);
            this.m_AdCallback[placeId] = null;
          }
        }
      };
      AdManger.prototype.AdStatusListen = function(type, status, placeId) {
        status == EnumMacros_1.CallBackStatus.CALL_AD_SHOW && NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.AD_Status, type);
      };
      return AdManger;
    }(BaseInstance_1.default);
    exports.default = AdManger;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Base/BaseInstance": "BaseInstance",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "./PlatformMgr": "PlatformMgr",
    "./WebAdManger": "WebAdManger"
  } ],
  Base64: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be5ecbUTTlL7a0G51f5zpB9", "Base64");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Base64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
          n = e.charCodeAt(f++);
          r = e.charCodeAt(f++);
          i = e.charCodeAt(f++);
          s = n >> 2;
          o = (3 & n) << 4 | r >> 4;
          u = (15 & r) << 2 | i >> 6;
          a = 63 & i;
          isNaN(r) ? u = a = 64 : isNaN(i) && (a = 64);
          t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
      },
      decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
          s = this._keyStr.indexOf(e.charAt(f++));
          o = this._keyStr.indexOf(e.charAt(f++));
          u = this._keyStr.indexOf(e.charAt(f++));
          a = this._keyStr.indexOf(e.charAt(f++));
          n = s << 2 | o >> 4;
          r = (15 & o) << 4 | u >> 2;
          i = (3 & u) << 6 | a;
          t += String.fromCharCode(n);
          64 != u && (t += String.fromCharCode(r));
          64 != a && (t += String.fromCharCode(i));
        }
        t = Base64._utf8_decode(t);
        return t;
      },
      _utf8_encode: function(str) {
        str = str.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < str.length; n++) {
          var r = str.charCodeAt(n);
          if (r < 128) t += String.fromCharCode(r); else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(63 & r | 128);
          } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(63 & r | 128);
          }
        }
        return t;
      },
      _utf8_decode: function(str) {
        var t = "";
        var n = 0;
        var r = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (n < str.length) {
          r = str.charCodeAt(n);
          if (r < 128) {
            t += String.fromCharCode(r);
            n++;
          } else if (r > 191 && r < 224) {
            c2 = str.charCodeAt(n + 1);
            t += String.fromCharCode((31 & r) << 6 | 63 & c2);
            n += 2;
          } else {
            c2 = str.charCodeAt(n + 1);
            c3 = str.charCodeAt(n + 2);
            t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3);
            n += 3;
          }
        }
        return t;
      }
    };
    var base64 = {
      decode: function(str) {
        return Base64.decode(str);
      },
      encode: function(str) {
        return Base64.encode(str);
      }
    };
    exports.default = base64;
    cc._RF.pop();
  }, {} ],
  BaseEntry: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55ebbpbZqdB0JLiJmZt0yzt", "BaseEntry");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIComponentBase_1 = require("../UI/UIComponentBase");
    var BaseEntry = function(_super) {
      __extends(BaseEntry, _super);
      function BaseEntry() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(BaseEntry, "UI", {
        get: function() {
          return this.mUI;
        },
        enumerable: false,
        configurable: true
      });
      BaseEntry.prototype.onLoad = function() {
        this.OnInit();
        BaseEntry.mUI = this.node.getChildByName("UI").getComponent(UIComponentBase_1.default);
      };
      BaseEntry.prototype.OnInit = function() {};
      return BaseEntry;
    }(cc.Component);
    exports.default = BaseEntry;
    cc._RF.pop();
  }, {
    "../UI/UIComponentBase": "UIComponentBase"
  } ],
  BaseInstance: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97c92p6bVxOM52kF17Ucdhs", "BaseInstance");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance = function() {
      function BaseInstance() {}
      BaseInstance.GetInstance = function() {
        if (!this.mInstance) {
          this.mInstance = new this();
          this.mInstance.Init();
        }
        return this.mInstance;
      };
      BaseInstance.prototype.Init = function() {};
      BaseInstance.prototype.InitData = function() {};
      BaseInstance.prototype.ResetData = function() {};
      BaseInstance.mInstance = null;
      return BaseInstance;
    }();
    exports.default = BaseInstance;
    cc._RF.pop();
  }, {} ],
  BidBoard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a239bRg8cJALbv39oqzW0Se", "BidBoard");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BidBoard = function(_super) {
      __extends(BidBoard, _super);
      function BidBoard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bid = null;
        _this.score = null;
        return _this;
      }
      BidBoard.prototype.start = function() {};
      BidBoard.prototype.setBid = function(bid) {
        this.mbid = bid;
        this.bid.string = bid + "/";
        this.score.string = "0";
      };
      BidBoard.prototype.setScore = function(s) {
        this.score.string = s.toString();
        this.score.node.color = s >= this.mbid ? cc.color(0, 255, 28) : cc.color(247, 255, 0);
      };
      BidBoard.prototype.clear = function() {
        this.mbid = 0;
        this.bid.string = "";
        this.score.string = "";
        this.score.node.color = cc.color(247, 255, 0);
      };
      BidBoard.prototype.isWin = function() {
        return this.mbid <= Number(this.score.string);
      };
      __decorate([ property(cc.Label) ], BidBoard.prototype, "bid", void 0);
      __decorate([ property(cc.Label) ], BidBoard.prototype, "score", void 0);
      BidBoard = __decorate([ ccclass ], BidBoard);
      return BidBoard;
    }(cc.Component);
    exports.default = BidBoard;
    cc._RF.pop();
  }, {} ],
  BidForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4eebfqO/5xAWadiohB54Kkp", "BidForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var NF_1 = require("./NFramework/NF");
    var NFNotifyMgr_1 = require("./NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BidForm = function(_super) {
      __extends(BidForm, _super);
      function BidForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.progress = null;
        _this.slider = null;
        _this.labBid = null;
        _this.labSuggested = null;
        _this.labDegree9 = null;
        _this.mContent = null;
        _this.count = 0;
        _this.bid = 0;
        _this.outContentH = 0;
        _this.offsetWidth = 0;
        _this.mIsAuto = true;
        return _this;
      }
      BidForm.prototype.onLoad = function() {
        this.offsetWidth = 125;
      };
      BidForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.outContentH = this.mContent.y = -465;
        this.show();
      };
      BidForm.prototype.slide = function() {
        this.count = 2;
        this.progress.progress = this.slider.progress;
        this.mIsAuto = false;
      };
      BidForm.prototype.update = function() {
        if (0 == this.count) {
          var p = Math.floor(1e3 * this.progress.progress);
          var a = p % this.offsetWidth;
          var b = p - a;
          a >= 71 && (b += this.offsetWidth);
          this.bid = Math.floor(b / this.offsetWidth) + 1;
          this.slider.progress = Math.min(1, b / 1e3);
          this.progress.progress = this.slider.progress;
        }
        this.count--;
        this.labBid.string = this.bid.toString();
      };
      BidForm.prototype.btnMinus = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (this.bid <= 1) return;
        this.bid--;
        var b = this.offsetWidth * (this.bid - 1);
        this.slider.progress = Math.min(1, b / 1e3);
        this.progress.progress = this.slider.progress;
        this.labDegree9.string = this.bid > 8 ? this.bid.toString() : "";
        this.mIsAuto = false;
        GameDataMgr_1.default.GetInstance().setData("DefaultBot", this.bid);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Bit_Reduce);
      };
      BidForm.prototype.btnPlus = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (this.bid >= 8 && this.bid >= 13) return;
        this.bid++;
        var b = this.offsetWidth * (this.bid - 1);
        this.slider.progress = Math.min(1, b / 1e3);
        this.progress.progress = this.slider.progress;
        this.labDegree9.string = this.bid > 8 ? this.bid.toString() : "";
        this.mIsAuto = false;
        GameDataMgr_1.default.GetInstance().setData("DefaultBot", this.bid);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Bit_Add);
      };
      BidForm.prototype.btnBid = function() {
        PlayerMgr_1.default.Instance.mIsFristRound && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.BitOk);
        var event = new cc.Event.EventCustom("BidPicker", true);
        event.setUserData({
          bid: this.bid
        });
        NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_CompleteBid, event);
        this.mIsAuto ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_BitAuto_OK) : PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_BitManual_OK);
        GameDataMgr_1.default.GetInstance().setData("Game_BitAuto", this.mIsAuto);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_BitNum, "bit", this.bid.toString());
        this.goback();
      };
      BidForm.prototype.show = function() {
        var suggest = GameDataMgr_1.default.GetInstance().getData("DefaultBot", 1);
        suggest = 0 == suggest ? 1 : suggest;
        var data = PlatformMgr_1.default.GetFBcData();
        var val = Object.keys(data).length > 0 ? Number(data.bid_Offset_long.mValue) : 0;
        this.bid = suggest + val;
        this.bid <= 0 && (this.bid = 1);
        this.bid > 13 && (this.bid = 13);
        cc.tween(this.mContent).to(.5, {
          position: cc.v3(0, 0)
        }, {
          easing: "backOut"
        }).call(function() {}).start();
        this.labSuggested.string = "Suggested:" + this.bid;
        var b = this.offsetWidth * (this.bid - 1);
        this.slider.progress = Math.min(1, b / 1e3);
        this.progress.progress = this.slider.progress;
        this.labDegree9.string = this.bid > 8 ? this.bid.toString() : "";
        this.mIsAuto = true;
      };
      BidForm.prototype.goback = function() {
        var _this = this;
        cc.tween(this.mContent).to(.5, {
          position: cc.v3(0, this.outContentH)
        }, {
          easing: "backIn"
        }).call(function() {
          _this.progress.progress = 0;
          _this.slider.progress = 0;
          _this.bid = 0;
          _this.Close();
        }).start();
      };
      __decorate([ property(cc.ProgressBar) ], BidForm.prototype, "progress", void 0);
      __decorate([ property(cc.Slider) ], BidForm.prototype, "slider", void 0);
      __decorate([ property(cc.Label) ], BidForm.prototype, "labBid", void 0);
      __decorate([ property(cc.Label) ], BidForm.prototype, "labSuggested", void 0);
      __decorate([ property(cc.Label) ], BidForm.prototype, "labDegree9", void 0);
      __decorate([ property(cc.Node) ], BidForm.prototype, "mContent", void 0);
      BidForm = __decorate([ ccclass ], BidForm);
      return BidForm;
    }(UIFormLogic_1.default);
    exports.default = BidForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/NF": "NF",
    "./NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  BidModelHelpForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "288a3LD/8tNgoN6tD6cFe5b", "BidModelHelpForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var NFNotifyMgr_1 = require("./NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BidModelHelpForm = function(_super) {
      __extends(BidModelHelpForm, _super);
      function BidModelHelpForm() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BidModelHelpForm.prototype.start = function() {};
      BidModelHelpForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Help);
      };
      BidModelHelpForm.prototype.Close = function() {
        NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_PrePare, null);
        _super.prototype.Close.call(this);
      };
      BidModelHelpForm = __decorate([ ccclass ], BidModelHelpForm);
      return BidModelHelpForm;
    }(UIFormLogic_1.default);
    exports.default = BidModelHelpForm;
    cc._RF.pop();
  }, {
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  BidModelStartForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f03a+gpIpK75NVxFZcLp21", "BidModelStartForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dc = require("./Definition/Constant/DefineConfig");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var NF_1 = require("./NFramework/NF");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BidModelStartForm = function(_super) {
      __extends(BidModelStartForm, _super);
      function BidModelStartForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mSpriteRound5 = null;
        _this.mSpriteRound3 = null;
        _this.mBtnBg = null;
        _this.mVideoIcon = null;
        _this.mTimes = null;
        _this.mtimesHelpTF = null;
        return _this;
      }
      BidModelStartForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.SetView();
        var ChallengeModel = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ChallengeModel, dc.GameRound.Three);
        this.mSpriteRound3.node.active = ChallengeModel == dc.GameRound.Three;
        this.mSpriteRound5.node.active = ChallengeModel == dc.GameRound.Fire;
      };
      BidModelStartForm.prototype.ShowTime = function() {
        var _this = this;
        var endtimes = new Date(new Date().toLocaleDateString()).getTime() + 864e5;
        this.mTimes.string = NF_1.default.Date.LeftTimeFormat(endtimes, "hh:mm:ss");
        this.mSetInterval2 = setInterval(function() {
          var str = NF_1.default.Date.LeftTimeFormat(endtimes, "hh:mm:ss");
          _this.mTimes.string = str;
          if (NF_1.default.Time.CurrentNetTime > endtimes) {
            clearInterval(_this.mSetInterval2);
            _this.mTimes.string = "";
            _this.mtimesHelpTF.string = "";
            _this.mBtnBg.color = cc.color(7, 193, 44);
            _this.mVideoIcon.active = false;
            _this.mIsVideo = false;
          }
        }, 1e3);
      };
      BidModelStartForm.prototype.SetView = function() {
        this.mIsVideo = false;
        var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ChallengeModelStartTimes, 0);
        this.mTimes.string = "";
        if (NF_1.default.Time.IsSameDay(times, NF_1.default.Time.CurrentNetTime)) {
          this.mIsVideo = true;
          this.mVideoIcon.active = true;
          this.mBtnBg.color = cc.color(241, 207, 26);
          this.mtimesHelpTF.string = "Challenge Count Reset Time\uff1a";
          this.ShowTime();
        } else {
          clearInterval(this.mSetInterval2);
          this.mtimesHelpTF.string = "";
          this.mBtnBg.color = cc.color(7, 193, 44);
          this.mVideoIcon.active = false;
        }
      };
      BidModelStartForm.prototype.OnBtnSelect5 = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_5rounds);
        this.mSpriteRound3.node.active = false;
        this.mSpriteRound5.node.active = true;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ChallengeModel, dc.GameRound.Fire);
      };
      BidModelStartForm.prototype.OnBtnSelect3 = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.FakeGameForm)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_3rounds);
        this.mSpriteRound3.node.active = true;
        this.mSpriteRound5.node.active = false;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ChallengeModel, dc.GameRound.Three);
      };
      BidModelStartForm.prototype.onStartGame = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        this.mIsVideo ? AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_012", function(status) {
          status == EnumMacros_1.CallBackStatus.CALL_SUCCESS ? _this.StartGame() : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        }) : this.StartGame();
      };
      BidModelStartForm.prototype.StartGame = function() {
        GameMgr_1.default.GetInstance().RoundMax = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ChallengeModel, dc.GameRound.Three);
        GameMgr_1.default.GetInstance().CuttGameModel = DefineConfig_1.GameModel.Battle8Bid;
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.HomeForm);
        _super.prototype.Close.call(this);
        cc.director.loadScene("SingleGame");
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ChallengeModelStartTimes, NF_1.default.Time.CurrentNetTime);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Start);
      };
      BidModelStartForm.prototype.onHelpGame = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.BidModelHelpForm);
      };
      BidModelStartForm.prototype.onCloseClick = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Close);
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Sprite) ], BidModelStartForm.prototype, "mSpriteRound5", void 0);
      __decorate([ property(cc.Sprite) ], BidModelStartForm.prototype, "mSpriteRound3", void 0);
      __decorate([ property(cc.Node) ], BidModelStartForm.prototype, "mBtnBg", void 0);
      __decorate([ property(cc.Node) ], BidModelStartForm.prototype, "mVideoIcon", void 0);
      __decorate([ property(cc.Label) ], BidModelStartForm.prototype, "mTimes", void 0);
      __decorate([ property(cc.Label) ], BidModelStartForm.prototype, "mtimesHelpTF", void 0);
      BidModelStartForm = __decorate([ ccclass ], BidModelStartForm);
      return BidModelStartForm;
    }(UIFormLogic_1.default);
    exports.default = BidModelStartForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  Bot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f91f84xfQhOW7B92ar9hK8I", "Bot");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("./NFramework/NF");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var Bot = function() {
      function Bot() {
        this.discards = [];
      }
      Bot.prototype.bid = function(hc) {
        var bid = 0;
        var M = 0;
        var spCards = hc.cards[RandomCardLogic_1.CardType.Spades];
        var NA = spCards.length;
        spCards.forEach(function(card) {
          if (61 == card || 49 == card) {
            bid++;
            NA--;
          }
        });
        var _loop_1 = function(i) {
          var cards = hc.cards[i];
          cards.forEach(function(card) {
            var v = RandomCardLogic_1.default.GetInstance().getCardValue(card);
            var c = (13 - cards.length) / 3;
            var r = RandomCardLogic_1.default.GetInstance().random(0, 10);
            13 == v && NF_1.default.Debug.Log(RandomCardLogic_1.default.GetInstance().printfCard(card) + "Random Number: " + r);
            1 == v && c >= 1 ? bid++ : 13 == v && c >= 3 && r < 2 && bid++;
          });
          if (cards.length <= 2 && NA >= 1) {
            bid++;
            M++;
          }
        };
        for (var i = 0; i < 3; i++) _loop_1(i);
        var tmp = NA - M - 3;
        tmp > 0 && (bid += tmp);
        0 == bid && bid++;
        return bid;
      };
      Bot.prototype.first1 = function(hc) {
        var fr1 = [];
        for (var i = 0; i < 3; i++) {
          var cards = hc.cards[i];
          var v = RandomCardLogic_1.default.GetInstance().getCardValue(cards[0]);
          1 == v && fr1.push(cards[0]);
        }
        if (fr1.length > 0) {
          var card = fr1[RandomCardLogic_1.default.GetInstance().random(0, fr1.length)];
          return card;
        }
        if (49 == hc.cards[RandomCardLogic_1.CardType.Spades][0]) return 49;
        var random = RandomCardLogic_1.default.GetInstance().random(0, 100);
        var big = 0;
        var cardType = RandomCardLogic_1.CardType.Spades;
        if (random > 19) {
          var tv = [];
          for (var i = 0; i < 3; i++) {
            var cards = hc.cards[i];
            if (big < cards.length) {
              big = cards.length;
              tv = [ i ];
            } else big == cards.length && tv.push(i);
          }
          cardType = tv.length > 1 ? tv[RandomCardLogic_1.default.GetInstance().random(0, tv.length)] : tv[0];
          return hc.cards[cardType][0];
        }
        return hc.cards[cardType][0];
      };
      Bot.prototype.build = function(hc) {
        this.discards = [];
        for (var i = 0; i < 3; i++) hc.cards[i].length > 0 && this.discards.push(i);
        this.discards.length > 0 && RandomCardLogic_1.default.GetInstance().mix(this.discards);
        this.discards.push(RandomCardLogic_1.CardType.Spades);
      };
      Bot.prototype.first = function(hc, cardMap) {
        var discardType = RandomCardLogic_1.CardType.Spades;
        for (var i = 0; i < this.discards.length; i++) if (hc.cards[this.discards[i]].length > 0) {
          discardType = this.discards[i];
          break;
        }
        var r = RandomCardLogic_1.default.GetInstance().random(0, 100);
        if (r > 49) {
          var K_1 = false;
          hc.cards[discardType].forEach(function(c) {
            13 == RandomCardLogic_1.default.GetInstance().getCardValue(c) && (K_1 = true);
          });
          var card_1 = discardType << 4;
          card_1 += 1;
          if (K_1 && cardMap[card_1]) return 13 + (discardType << 4);
          var tmp = hc.cards[discardType].slice(0, hc.cards[discardType].length);
          if (1 == tmp.length) return tmp[0];
          if (K_1) for (var i = 0; i < tmp.length; i++) if (13 == RandomCardLogic_1.default.GetInstance().getCardValue(tmp[i])) {
            tmp = [].concat(tmp.slice(0, i), tmp.slice(i + 1, tmp.length));
            break;
          }
          card_1 = tmp[RandomCardLogic_1.default.GetInstance().random(0, tmp.length)];
          if (!card_1 || 13 == RandomCardLogic_1.default.GetInstance().getCardValue(card_1)) {
            var keys = Object.keys(cardMap);
            var list_1 = [];
            keys.forEach(function(k) {
              list_1.push(parseInt(k));
            });
            RandomCardLogic_1.default.GetInstance().sortEasy(list_1);
          }
          return card_1;
        }
        var card = hc.cards[discardType][RandomCardLogic_1.default.GetInstance().random(0, hc.cards[discardType].length)];
        return card;
      };
      Bot.prototype.second = function(hc, a, tcards) {
        var ava = a.slice(0, a.length);
        var tableCards = tcards.slice(0, tcards.length);
        if (0 == ava.length) {
          var big = 0;
          var tv = [];
          var cardType = RandomCardLogic_1.CardType.Spades;
          for (var i = 0; i < 3; i++) {
            var cards = hc.cards[i];
            if (big < cards.length) {
              big = cards.length;
              tv = [ i ];
            } else big == cards.length && tv.push(i);
          }
          cardType = 0 == big ? RandomCardLogic_1.CardType.Spades : tv.length > 1 ? tv[RandomCardLogic_1.default.GetInstance().random(0, tv.length)] : tv[0];
          return hc.cards[cardType][0];
        }
        if (1 == ava.length) return ava[0];
        RandomCardLogic_1.default.GetInstance().sortEasy(tableCards);
        RandomCardLogic_1.default.GetInstance().sortEasy(ava);
        if (RandomCardLogic_1.default.GetInstance().compare(ava[0], tableCards[0])) {
          if (3 == tableCards.length) return ava[ava.length - 1];
          var random = RandomCardLogic_1.default.GetInstance().random(0, 100);
          return random <= 19 ? ava[0] : ava[1];
        }
        return ava[ava.length - 1];
      };
      return Bot;
    }();
    exports.default = Bot;
    cc._RF.pop();
  }, {
    "./NFramework/NF": "NF",
    "./RandomCardLogic": "RandomCardLogic"
  } ],
  CalculateScoreMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "695d4VaPbBJc6xV7zwIj5Ik", "CalculateScoreMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Bot_1 = require("../../Bot");
    var RandomCardLogic_1 = require("../../RandomCardLogic");
    var GameDataMgr_1 = require("./GameDataMgr");
    var CalculateScoreMgr = function() {
      function CalculateScoreMgr() {
        this.bots = [];
        this.tabCards = [];
        this.handCards = [];
        this.recordMap = {};
        this.tabMap = {};
        this.count = 13;
        this.Score = 0;
      }
      CalculateScoreMgr.prototype.init = function(handCards) {
        this.bots = [];
        for (var i = 0; i < 4; i++) {
          var bot = new Bot_1.default();
          bot.build(handCards[i]);
          this.bots.push(bot);
        }
        this.handCards = handCards;
      };
      CalculateScoreMgr.prototype.GetScore = function(cards, button) {
        this.turn = button;
        this.turn++;
        this.turn > 3 && (this.turn = 0);
        var ava = RandomCardLogic_1.default.GetInstance().findDiscard(this.tabCards, this.handCards[this.turn]);
        0 == ava.length && (ava = this.handCards[this.turn].getHandCardsArr());
        if (0 == this.tabCards.length) {
          var card = this.bots[this.turn].first(this.handCards[this.turn], this.recordMap);
          var cardnum = this.checkCard(card, this.turn, ava);
          this.tabMap[cardnum] = this.turn;
          this.handCards[this.turn].discard(cardnum);
          this.tabCards.push(cardnum);
        } else {
          var cardnum = this.bots[this.turn].second(this.handCards[this.turn], ava, this.tabCards);
          this.handCards[this.turn].discard(cardnum);
          this.tabMap[cardnum] = this.turn;
          this.tabCards.push(cardnum);
        }
        if (this.tabCards.length >= 4) {
          this.count -= 1;
          var big = RandomCardLogic_1.default.GetInstance().findWinner(this.tabCards);
          var winner = this.tabMap[big];
          this.tabCards = [];
          this.tabMap = {};
          this.turn = winner;
          0 == winner && (this.Score += 1);
        }
        if (this.count <= 0) {
          GameDataMgr_1.default.GetInstance().setData("DefaultBot", this.Score <= 0 ? 1 : this.Score);
          return;
        }
        this.GetScore(this.handCards, this.turn);
      };
      CalculateScoreMgr.prototype.checkCard = function(card, turn, ava) {
        var hc = this.handCards[turn];
        if (!hc.checkCard(card)) return ava[RandomCardLogic_1.default.GetInstance().random(0, ava.length)];
        var ok = false;
        for (var i = 0; i < ava.length; i++) if (ava[i] == card) {
          ok = true;
          break;
        }
        if (!ok) return ava[RandomCardLogic_1.default.GetInstance().random(0, ava.length)];
        return card;
      };
      CalculateScoreMgr.prototype.getScore = function() {
        return this.Score;
      };
      return CalculateScoreMgr;
    }();
    exports.default = CalculateScoreMgr;
    cc._RF.pop();
  }, {
    "../../Bot": "Bot",
    "../../RandomCardLogic": "RandomCardLogic",
    "./GameDataMgr": "GameDataMgr"
  } ],
  CardBack: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "668af1SCwJJy7BdqL4fD8Ni", "CardBack");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SkinMgr_1 = require("./Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var NF_1 = require("./NFramework/NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardBack = function(_super) {
      __extends(CardBack, _super);
      function CardBack() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameData = null;
        return _this;
      }
      CardBack.prototype.onLoad = function() {};
      CardBack.prototype.start = function() {};
      CardBack.prototype.onEnable = function() {
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        this.refreshSkin();
      };
      CardBack.prototype.refreshSkin = function() {
        var skin = SkinMgr_1.default.GetInstance().SkinData.CardWear;
        var data = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.FreeTrialData, null);
        data && data.skinId > 0 && 3 == data.skinType && (skin = data.skinId);
        if (0 != skin) {
          var info = NF_1.default.DataTables.GetInfoById("ShopInfo", skin);
          info && (this.node.getComponent(cc.Sprite).spriteFrame = this.gameData.mCard[info.mBgIndex]);
        }
      };
      CardBack = __decorate([ ccclass ], CardBack);
      return CardBack;
    }(cc.Component);
    exports.default = CardBack;
    cc._RF.pop();
  }, {
    "./Common/Mgr/SkinMgr": "SkinMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./NFramework/NF": "NF"
  } ],
  CardsNoteForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a692f0TLbVB3ZvaO7shr8cZ", "CardsNoteForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../NFramework/NF");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var RandomCardLogic_1 = require("../RandomCardLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardsNoteForm = function(_super) {
      __extends(CardsNoteForm, _super);
      function CardsNoteForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mRoot = null;
        _this.mDline = null;
        _this.mCline = null;
        _this.mHline = null;
        _this.mSline = null;
        _this.mDAPos = null;
        _this.mCAPos = null;
        _this.mHAPos = null;
        _this.mSAPos = null;
        _this.mRankList = [ "A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2" ];
        _this.mSuitList = [ "D", "C", "H", "S" ];
        _this.mColorNormal = cc.color(117, 230, 16);
        _this.mColorSelect = cc.color(162, 15, 14);
        _this.mUsedCards = {};
        return _this;
      }
      CardsNoteForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      CardsNoteForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.initPos();
        this.initNote(param);
        NF_1.default.Audio.Play(2);
      };
      CardsNoteForm.prototype.onEnable = function() {};
      CardsNoteForm.prototype.initPos = function() {
        if (null == this.mDAPos) {
          var da = this.mRoot.getChildByName("DA");
          this.mDAPos = da.getPosition().sub(cc.v2(da.getContentSize().width / 2, 0));
        }
        if (null == this.mCAPos) {
          var da = this.mRoot.getChildByName("CA");
          this.mCAPos = da.getPosition().sub(cc.v2(da.getContentSize().width / 2, 0));
        }
        if (null == this.mHAPos) {
          var da = this.mRoot.getChildByName("HA");
          this.mHAPos = da.getPosition().sub(cc.v2(da.getContentSize().width / 2, 0));
        }
        if (null == this.mSAPos) {
          var da = this.mRoot.getChildByName("SA");
          this.mSAPos = da.getPosition().sub(cc.v2(da.getContentSize().width / 2, 0));
        }
        null == this.mDline && (this.mDline = this.node.getChildByName("Dline"));
        null == this.mCline && (this.mCline = this.node.getChildByName("Cline"));
        null == this.mHline && (this.mHline = this.node.getChildByName("Hline"));
        null == this.mSline && (this.mSline = this.node.getChildByName("Sline"));
      };
      CardsNoteForm.prototype.initNote = function(cards) {
        var _this = this;
        this.mRoot.children.forEach(function(child) {
          child && (child.color = _this.mColorNormal);
        });
        for (var i = 0; i < cards.length; i++) {
          var element = cards[i];
          var tag = RandomCardLogic_1.default.GetInstance().printfCardToTag(element);
          NF_1.default.Debug.Log(">>> tag", tag, element);
          if (this.mRoot) {
            var child = this.mRoot.getChildByName(tag);
            child && (child.color = this.mColorSelect);
          }
        }
        this.cardsToTag(cards);
        this.sortCardNote();
      };
      CardsNoteForm.prototype.sortCardNote = function() {
        for (var i = 0; i < this.mSuitList.length; i++) {
          var suit = this.mSuitList[i];
          var pos = this.getStartPosx(suit);
          var posx = pos.x;
          var posy = pos.y;
          var endcard = [];
          for (var j = 0; j < this.mRankList.length; j++) {
            var rank = this.mRankList[j];
            var name = suit + rank;
            var card = this.mRoot.getChildByName(name);
            if (this.mUsedCards[name]) endcard.push(card); else {
              var halfwidth = card.getContentSize().width / 2;
              posx += halfwidth;
              card.setPosition(cc.v2(posx, posy));
              posx += halfwidth + 5;
            }
          }
          var width = 0;
          for (var k = 0; k < endcard.length; k++) {
            var ecard = endcard[k];
            var halfwidth = ecard.getContentSize().width / 2;
            posx += halfwidth;
            ecard.setPosition(cc.v2(posx, posy));
            posx += halfwidth + 5;
            width += ecard.getContentSize().width + 5;
          }
          this.setLineWidth(suit, width);
        }
      };
      CardsNoteForm.prototype.setLineWidth = function(suit, size) {
        size > 0 && (size += 5);
        "D" == suit && this.mDline.setContentSize(cc.size(size, 1.3));
        "C" == suit && this.mCline.setContentSize(cc.size(size, 1.5));
        "H" == suit && this.mHline.setContentSize(cc.size(size, 1.5));
        "S" == suit && this.mSline.setContentSize(cc.size(size, 1.5));
      };
      CardsNoteForm.prototype.cardsToTag = function(cards) {
        this.mUsedCards = {};
        for (var i = 0; i < cards.length; i++) {
          var element = cards[i];
          var tag = RandomCardLogic_1.default.GetInstance().printfCardToTag(element);
          this.mUsedCards[tag] = 1;
        }
      };
      CardsNoteForm.prototype.getStartPosx = function(suit) {
        if ("D" == suit) return this.mDAPos;
        if ("C" == suit) return this.mCAPos;
        if ("H" == suit) return this.mHAPos;
        if ("S" == suit) return this.mSAPos;
      };
      CardsNoteForm.prototype.childrenActive = function(active) {
        for (var i = 0; i < this.node.children.length; i++) this.node.children[i].active = active;
      };
      __decorate([ property(cc.Node) ], CardsNoteForm.prototype, "mRoot", void 0);
      CardsNoteForm = __decorate([ ccclass ], CardsNoteForm);
      return CardsNoteForm;
    }(UIFormLogic_1.default);
    exports.default = CardsNoteForm;
    cc._RF.pop();
  }, {
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../RandomCardLogic": "RandomCardLogic"
  } ],
  ConfirmForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4cec1U+C8NKsaFMLig81tLo", "ConfirmForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EnumMacros_1 = require("../../NFramework/Definition/EnumMacros");
    var NF_1 = require("../../NFramework/NF");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ConfirmForm = function(_super) {
      __extends(ConfirmForm, _super);
      function ConfirmForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTitleTF = null;
        _this.mBtnNoLabel = null;
        _this.mBtnYesLabel = null;
        _this.mTips = null;
        _this.mData = null;
        return _this;
      }
      ConfirmForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.mData = param;
        this.SetView();
        NF_1.default.Audio.Play(2);
      };
      ConfirmForm.prototype.onEnable = function() {
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
      };
      ConfirmForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
      };
      ConfirmForm.prototype.SetView = function() {
        this.mTitleTF.string = this.mData.mTitle;
        this.mTips.string = this.mData.mTips;
        this.mBtnNoLabel.string = this.mData.mNo;
        this.mBtnYesLabel.string = this.mData.mYes;
      };
      ConfirmForm.prototype.OnBtnClick = function(event, data) {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.Close();
      };
      __decorate([ property(cc.Label) ], ConfirmForm.prototype, "mTitleTF", void 0);
      __decorate([ property(cc.Label) ], ConfirmForm.prototype, "mBtnNoLabel", void 0);
      __decorate([ property(cc.Label) ], ConfirmForm.prototype, "mBtnYesLabel", void 0);
      __decorate([ property(cc.Label) ], ConfirmForm.prototype, "mTips", void 0);
      ConfirmForm = __decorate([ ccclass ], ConfirmForm);
      return ConfirmForm;
    }(UIFormLogic_1.default);
    exports.default = ConfirmForm;
    cc._RF.pop();
  }, {
    "../../NFramework/Definition/EnumMacros": "EnumMacros",
    "../../NFramework/NF": "NF",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../../Platform/AdManger": "AdManger"
  } ],
  DealCardsMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2142cmxpfFBJJBfboBkVtdw", "DealCardsMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var BaseInstance_1 = require("../../NFramework/Base/BaseInstance");
    var NF_1 = require("../../NFramework/NF");
    var GameMgr_1 = require("./GameMgr");
    var DealCardsMgr = function(_super) {
      __extends(DealCardsMgr, _super);
      function DealCardsMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mIsSameDay = false;
        _this.mHalfwayExit = false;
        _this.mNewGameOne = false;
        return _this;
      }
      DealCardsMgr.prototype.Init = function() {
        this.mGameStrategy = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.DealCardsData);
        if (!this.mGameStrategy) {
          this.mGameStrategy = {};
          this.mGameStrategy.NextDay = NF_1.default.Time.GetCurrentTimeMillis();
          this.mGameStrategy.CurrInnings = 0;
          this.mGameStrategy.SustainTwoInnings = 0;
          this.mGameStrategy.SustainTwoReopen = 0;
          this.mNewGameOne = true;
        }
        this.SavaData();
      };
      DealCardsMgr.prototype.NewDayReset = function() {
        this.mGameStrategy.CurrInnings = 0;
        this.mGameStrategy.SustainTwoInnings = 0;
        this.mGameStrategy.SustainTwoReopen = 0;
        this.mHalfwayExit = false;
        this.SavaData();
      };
      Object.defineProperty(DealCardsMgr.prototype, "GameStrategy", {
        get: function() {
          return this.mGameStrategy;
        },
        enumerable: false,
        configurable: true
      });
      DealCardsMgr.prototype.SetCurrInnings = function() {
        this.mNewGameOne = false;
        this.mGameStrategy.CurrInnings += 1;
        this.mGameStrategy.NextDay = NF_1.default.Time.GetCurrentTimeMillis();
        this.SavaData();
      };
      DealCardsMgr.prototype.SetSustainTwoInnings = function(isadd) {
        this.mNewGameOne = false;
        GameMgr_1.default.GetInstance().SetCurrRound(0);
        isadd ? this.mGameStrategy.SustainTwoInnings += 1 : this.mGameStrategy.SustainTwoInnings = 0;
        this.SavaData();
      };
      DealCardsMgr.prototype.SetSustainTwoReopen = function(isadd) {
        isadd ? this.mGameStrategy.SustainTwoReopen += 1 : this.mGameStrategy.SustainTwoReopen = 0;
        this.SavaData();
      };
      DealCardsMgr.prototype.RestartSetData = function() {
        this.mGameStrategy.SustainTwoInnings >= 2 && this.SetSustainTwoInnings(false);
        this.mNewGameOne = false;
        GameMgr_1.default.GetInstance().SetCurrRound(0);
        DealCardsMgr.GetInstance().SetCurrInnings();
      };
      DealCardsMgr.prototype.QuitGameSetData = function() {
        this.mNewGameOne = false;
        GameMgr_1.default.GetInstance().SetCurrRound(0);
        DealCardsMgr.GetInstance().SetCurrInnings();
      };
      DealCardsMgr.prototype.SetHalfwayExit = function(b) {
        this.mHalfwayExit = b;
      };
      DealCardsMgr.prototype.SavaData = function() {
        NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.DealCardsData, this.mGameStrategy);
      };
      DealCardsMgr.prototype.GetGrop = function() {
        if (GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid) return this.GetBattle8ModelGrop();
        var grop = "mWeightA";
        if (GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online) return grop;
        NF_1.default.Time.IsSameDay(this.mGameStrategy.NextDay, NF_1.default.Time.GetCurrentTimeMillis()) || (this.mIsSameDay = true);
        var ConditionInfoArr = NF_1.default.DataTables.GetAllInfos("ConditionInfo");
        grop = this.mNewGameOne && 0 == this.mGameStrategy.CurrInnings ? this.GetGropName(ConditionInfoArr[0]) : this.mIsSameDay && 0 == this.mGameStrategy.CurrInnings ? this.GetGropName(ConditionInfoArr[1]) : this.mGameStrategy.SustainTwoInnings >= 2 ? this.GetGropName(ConditionInfoArr[2]) : this.mGameStrategy.SustainTwoReopen >= 2 ? this.GetGropName(ConditionInfoArr[3]) : this.mHalfwayExit ? this.GetGropName(ConditionInfoArr[4]) : this.GetGropName(ConditionInfoArr[5]);
        return grop;
      };
      DealCardsMgr.prototype.GetGropName = function(item) {
        var arr = item.mOnceRound.split("|");
        var grop = arr.length <= 1 ? arr[0] : arr[Math.floor(Math.random() * arr.length)];
        var round = GameMgr_1.default.GetInstance().GetCurrRound();
        var WinOrLose = GameMgr_1.default.GetInstance().WinOrLose;
        if (round > 0) {
          arr = WinOrLose[round - 1] ? item.mLose.split("|") : item.mWin.split("|");
          grop = arr.length <= 1 ? arr[0] : arr[Math.floor(Math.random() * arr.length)];
        }
        return grop;
      };
      DealCardsMgr.prototype.GetBattle8ModelGrop = function() {
        var str = "mWeightG";
        var int = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.Battle8ModelIsGame, 0);
        if (int > 0) {
          var arr = [ "mWeightG", "mWeightH", "mWeightI", "mWeightJ", "mWeightK", "mWeightL" ];
          var index = NF_1.default.Math.RandomInt(0, 6);
          str = arr[index];
        }
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.Battle8ModelIsGame, int + 1);
        return str;
      };
      return DealCardsMgr;
    }(BaseInstance_1.default);
    exports.default = DealCardsMgr;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../NFramework/Base/BaseInstance": "BaseInstance",
    "../../NFramework/NF": "NF",
    "./GameMgr": "GameMgr"
  } ],
  Deal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a5e0LRRjJP1ZLkbQqol533", "Deal");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var dc = require("./Definition/Constant/DefineConfig");
    var NF_1 = require("./NFramework/NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Deal = function(_super) {
      __extends(Deal, _super);
      function Deal() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pbCardBack = null;
        _this.ndCenter = null;
        _this.ndFin = [];
        _this.count = 12;
        _this.originPos = [];
        return _this;
      }
      Deal.prototype.onLoad = function() {
        this.originPos.push([ 0, 0, 0 ]);
        this.originPos.push([ 10, -5, 3 ]);
        this.originPos.push([ 10, -3, -2 ]);
        this.originPos.push([ 19, -3, 10 ]);
        this.originPos.push([ 19, -3, -9 ]);
        this.originPos.push([ 39, 7, 12 ]);
        this.originPos.push([ 30, -12, 39 ]);
        this.originPos.push([ -11, 3, -9 ]);
        this.originPos.push([ -11, 3, 3 ]);
        this.originPos.push([ -11, 3, 21 ]);
        this.originPos.push([ 6, 3, 2 ]);
        this.originPos.push([ 0, 0, 4 ]);
        this.originPos.push([ -1, 0, -35 ]);
      };
      Deal.prototype.start = function() {};
      Deal.prototype.deal = function(button) {
        this.gotoButton(button);
      };
      Deal.prototype.gotoButton = function(button) {
        var _this = this;
        var sp = cc.instantiate(this.pbCardBack);
        this.node.addChild(sp);
        var delay = .5;
        var fin = function() {
          sp.removeFromParent();
          _this.flyCards(button);
        };
        var pos;
        var rotate = 0;
        switch (button) {
         case dc.ChairID.Down:
          pos = cc.v3(sp.position.x, -cc.winSize.height / 2 - 150);
          break;

         case dc.ChairID.Left:
          pos = cc.v3(-cc.winSize.width - 150, sp.position.y);
          rotate = -90;
          break;

         case dc.ChairID.Up:
          pos = cc.v3(sp.position.x, cc.winSize.height / 2 + 150);
          break;

         case dc.ChairID.Right:
          pos = cc.v3(cc.winSize.width + 150, sp.position.y);
          rotate = 90;
        }
        cc.tween(sp).delay(delay).to(.5, {
          position: pos
        }, {
          easing: "sineIn"
        }).to(.3, {
          angle: rotate
        }).union().call(function() {
          fin();
        }).start();
      };
      Deal.prototype.flyCards = function(button) {
        var _this = this;
        var posEmit;
        var cardRotation = 0;
        switch (button) {
         case dc.ChairID.Down:
          posEmit = cc.v2(0, -cc.winSize.height / 2 - 150);
          break;

         case dc.ChairID.Right:
          posEmit = cc.v2(cc.winSize.width / 2 + 150, 0);
          cardRotation = -90;
          break;

         case dc.ChairID.Up:
          posEmit = cc.v2(0, cc.winSize.height / 2 + 150);
          break;

         case dc.ChairID.Left:
          cardRotation = 90;
          posEmit = cc.v2(-cc.winSize.width / 2 - 150, 0);
        }
        var count = 0;
        for (var i = 0; i < 13; i++) {
          var index = button;
          var _loop_1 = function(j) {
            index > dc.ChairID.Left && (index = 0);
            var sp = cc.instantiate(this_1.pbCardBack);
            sp.setPosition(posEmit);
            sp.angle = cardRotation;
            var t = this_1.getFinPosition(index, i);
            var mv = cc.moveTo(.1, this_1.ndFin[index].getPosition()).easing(cc.easeSineIn());
            var tr = 0;
            button == dc.ChairID.Down || button == dc.ChairID.Right ? index == dc.ChairID.Left || index == dc.ChairID.Down ? tr = -30 : index != dc.ChairID.Right && index != dc.ChairID.Up || (tr = 30) : button != dc.ChairID.Up && button != dc.ChairID.Left || (index == dc.ChairID.Left || index == dc.ChairID.Down ? tr = 30 : index != dc.ChairID.Right && index != dc.ChairID.Up || (tr = -30));
            var r = cc.rotateBy(.1, tr);
            var sw = cc.spawn(cc.callFunc(function() {
              NF_1.default.Audio.Play(3);
            }), mv, r);
            var times = count * GameMgr_1.default.GetInstance().DealTimes;
            cc.tween(sp).sequence(cc.delayTime(times), sw, cc.callFunc(function(_, d) {
              sp.setPosition(d.t[0], d.t[1]);
              sp.angle = d.t[2];
              sp.removeFromParent();
              _this.ndFin[d.index].addChild(sp);
              51 == d.count && _this.flyEnd();
            }, this_1, {
              index: index,
              t: t,
              count: count
            })).start();
            this_1.node.addChild(sp);
            index++;
            count++;
          };
          var this_1 = this;
          for (var j = 0; j < 4; j++) _loop_1(j);
        }
      };
      Deal.prototype.flyEnd = function() {
        var _this = this;
        var delay = .15;
        cc.tween(this.node).sequence(cc.delayTime(.3), cc.callFunc(function() {
          _this.ndFin.forEach(function(nd) {
            nd.children.forEach(function(child) {
              cc.tween(child).to(delay, {
                position: cc.v3(0, 0),
                angle: 0,
                scale: .8
              }).start();
            });
          });
        }, this), cc.delayTime(delay), cc.callFunc(function() {
          _this.ndFin.forEach(function(nd) {
            nd.removeAllChildren();
          });
          var event = new cc.Event.EventCustom("DealFinished", true);
          _this.node.dispatchEvent(event);
        }, this)).start();
      };
      Deal.prototype.getFinPosition = function(chairID, index) {
        var tmp = this.originPos[index];
        if (chairID == dc.ChairID.Right) return [ tmp[0], tmp[1], tmp[2] - 90 ];
        if (chairID == dc.ChairID.Up) return [ tmp[0], tmp[1], tmp[2] - 180 ];
        if (chairID == dc.ChairID.Left) return [ tmp[0], tmp[1], tmp[2] + 90 ];
        return tmp;
      };
      __decorate([ property(cc.Prefab) ], Deal.prototype, "pbCardBack", void 0);
      __decorate([ property(cc.Node) ], Deal.prototype, "ndCenter", void 0);
      __decorate([ property([ cc.Node ]) ], Deal.prototype, "ndFin", void 0);
      Deal = __decorate([ ccclass ], Deal);
      return Deal;
    }(cc.Component);
    exports.default = Deal;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./NFramework/NF": "NF"
  } ],
  DefineConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "66578pKIdtJlY5rcZJAYmv3", "DefineConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BotNames = exports.Constant = exports.DebugFlag = exports.Version = exports.LocalStorageKey = exports.EventName = exports.GameModel = exports.GameRound = exports.GameState = exports.ChairID = void 0;
    var ChairID;
    (function(ChairID) {
      ChairID[ChairID["Down"] = 0] = "Down";
      ChairID[ChairID["Left"] = 3] = "Left";
      ChairID[ChairID["Up"] = 2] = "Up";
      ChairID[ChairID["Right"] = 1] = "Right";
    })(ChairID = exports.ChairID || (exports.ChairID = {}));
    var GameState;
    (function(GameState) {
      GameState[GameState["None"] = 0] = "None";
      GameState[GameState["PrePare"] = 1] = "PrePare";
      GameState[GameState["Bid"] = 2] = "Bid";
      GameState[GameState["Paly"] = 3] = "Paly";
      GameState[GameState["End"] = 4] = "End";
    })(GameState = exports.GameState || (exports.GameState = {}));
    var GameRound;
    (function(GameRound) {
      GameRound[GameRound["Fire"] = 5] = "Fire";
      GameRound[GameRound["Three"] = 3] = "Three";
    })(GameRound = exports.GameRound || (exports.GameRound = {}));
    var GameModel;
    (function(GameModel) {
      GameModel[GameModel["Ordinary"] = 0] = "Ordinary";
      GameModel[GameModel["Online"] = 1] = "Online";
      GameModel[GameModel["Battle8Bid"] = 2] = "Battle8Bid";
    })(GameModel = exports.GameModel || (exports.GameModel = {}));
    var EventName;
    (function(EventName) {
      EventName["SingleGame"] = "single_players";
      EventName["RandomGame"] = "random_players";
      EventName["RankFirst"] = "rank_fisrt";
      EventName["RankSecond"] = "rank_second";
      EventName["RankThird"] = "rank_third";
      EventName["RankFourth"] = "rank_fourth";
      EventName["Round1"] = "player_first";
      EventName["Round2"] = "player_second";
      EventName["Round3"] = "player_third";
      EventName["Round4"] = "player_fourth";
      EventName["Round5"] = "player_fifth";
      EventName["SubmittedScore"] = "ratings_submitted";
      EventName["Retention_d2"] = "ratings_submitted";
      EventName["Retention_d5"] = "ratings_submitted";
      EventName["Retention_d7"] = "ratings_submitted";
      EventName["Online_Min10"] = "10mins";
      EventName["Online_Min20"] = "20mins";
      EventName["Online_Min30"] = "30mins";
      EventName["Online_10mins_24hours"] = "online_10mins_24hours";
      EventName["Online_15mins_24hours"] = "online_15mins_24hours";
      EventName["Online_20mins_24hours"] = "online_20mins_24hours";
      EventName["Online_25mins_24hours"] = "online_25mins_24hours";
      EventName["Online_30mins_24hours"] = "online_30mins_24hours";
      EventName["Online_35mins_24hours"] = "online_35mins_24hours";
      EventName["Online_40mins_24hours"] = "online_40mins_24hours";
      EventName["Online_5mins_24hours_once"] = "online_5mins_24hours_once";
      EventName["Online_10mins_24hours_once"] = "online_10mins_24hours_once";
      EventName["Online_13mins_24hours_once"] = "online_13mins_24hours_once";
      EventName["Online_16mins_24hours_once"] = "online_16mins_24hours_once";
      EventName["Online_20mins_24hours_once"] = "online_20mins_24hours_once";
      EventName["Online_10mins_alltime"] = "online_10mins_alltime";
      EventName["Online_15mins_alltime"] = "online_15mins_alltime";
      EventName["Online_20mins_alltime"] = "online_20mins_alltime";
      EventName["Online_30mins_alltime"] = "online_30mins_alltime";
      EventName["Online_40mins_alltime"] = "online_40mins_alltime";
      EventName["Online_50mins_alltime"] = "online_50mins_alltime";
      EventName["Online_60mins_alltime"] = "online_60mins_alltime";
      EventName["SignUpName"] = "sign_up_name";
      EventName["ShowAds_T2"] = "show_ads_2times_in24hours";
      EventName["ShowAds_T4"] = "show_ads_4times_in24hours";
      EventName["ShowAds_T7"] = "show_ads_7times_in24hours";
      EventName["ShowInterstitial_1"] = "int_show_1_in24hours";
      EventName["ShowInterstitial_2"] = "int_show_2_in24hours";
      EventName["ShowInterstitial_3"] = "int_show_3_in24hours";
      EventName["ShowInterstitial_4"] = "int_show_4_in24hours";
      EventName["ShowInterstitial_5"] = "int_show_5_in24hours";
      EventName["ShowInterstitial_6"] = "int_show_6_in24hours";
      EventName["ShowInterstitial_7"] = "int_show_7_in24hours";
      EventName["ShowInterstitial_8"] = "int_show_8_in24hours";
      EventName["ShowInterstitial_9"] = "int_show_9_in24hours";
      EventName["ShowInterstitial_10"] = "int_show_10_in24hours";
      EventName["ShowVideoReward_1"] = "rv_show_1_in24hours";
      EventName["ShowVideoReward_2"] = "rv_show_2_in24hours";
      EventName["ShowVideoReward_3"] = "rv_show_3_in24hours";
      EventName["ShowVideoReward_4"] = "rv_show_4_in24hours";
      EventName["ShowVideoReward_5"] = "rv_show_5_in24hours";
      EventName["ShowVideoReward_6"] = "rv_show_6_in24hours";
      EventName["ShowVideoReward_7"] = "rv_show_7_in24hours";
      EventName["ShowVideoReward_8"] = "rv_show_8_in24hours";
      EventName["ShowVideoReward_9"] = "rv_show_9_in24hours";
      EventName["ShowVideoReward_10"] = "rv_show_10_in24hours";
      EventName["HomePage"] = "home";
      EventName["SinglePlay"] = "com";
      EventName["GamePage"] = "game";
      EventName["BitOk"] = "bit_ok";
      EventName["Card01"] = "card01";
      EventName["Card02"] = "card02";
      EventName["Card03"] = "card03";
      EventName["Card04"] = "card04";
      EventName["Card05"] = "card05";
      EventName["Card06"] = "card06";
      EventName["Card07"] = "card07";
      EventName["Card08"] = "card08";
      EventName["Card09"] = "card09";
      EventName["Card10"] = "card10";
      EventName["Card11"] = "card11";
      EventName["Card12"] = "card12";
      EventName["Card13"] = "card13";
      EventName["BitPage1"] = "bit1";
      EventName["SumScorePage1"] = "sum1";
      EventName["BitPage2"] = "bit2";
      EventName["SumScorePage2"] = "sum2";
      EventName["BitPage3"] = "bit3";
      EventName["SumScorePage3"] = "sum3";
      EventName["BitPage4"] = "bit4";
      EventName["SumScorePage4"] = "sum4";
      EventName["BitPage5"] = "bit5";
      EventName["SumScorePage5"] = "sum5";
      EventName["Game2HomePage"] = "gamehome";
      EventName["OnlinePlay"] = "online";
      EventName["RoomPage"] = "room";
      EventName["RoomPlay"] = "roomplay";
      EventName["NamePage"] = "name";
      EventName["MatchPlay"] = "match";
      EventName["OlBit1"] = "ol_bit1";
      EventName["OlSumScore1"] = "ol_sum1";
      EventName["OlBit2"] = "ol_bit2";
      EventName["OlSumScore2"] = "ol_sum2";
      EventName["OlBit3"] = "ol_bit3";
      EventName["OlSumScore3"] = "ol_sum3";
      EventName["OlBit4"] = "ol_bit4";
      EventName["OlSumScore4"] = "ol_sum4";
      EventName["OlBit5"] = "ol_bit5";
      EventName["OlSumScore5"] = "ol_sum5";
      EventName["Ol2HomePage"] = "olhome";
      EventName["FreeCoin"] = "freecoin";
      EventName["FreeCoinWin"] = "freecoinwin";
      EventName["FreeCoin1"] = "free1";
      EventName["FreeCoin2"] = "free2";
      EventName["FreeCoin3"] = "free3";
      EventName["FreeCoin4"] = "free4";
      EventName["FreeCoin5"] = "free5";
      EventName["FreeCoinAd"] = "free_ad";
      EventName["SpinEnter"] = "spin";
      EventName["SpinWinPage"] = "spinwin";
      EventName["Spin"] = "spinbt";
      EventName["SpinAd"] = "spin_ad";
      EventName["SpinReward"] = "spin_rw";
      EventName["OnlineFail"] = "online_fail";
      EventName["ShopAction"] = "shopselect_";
      EventName["ShopConfirm"] = "shopconfirm_";
      EventName["ShopResult"] = "shopresult_";
      EventName["ShopAdSuccess"] = "shopadsuc_";
      EventName["ShopClick"] = "shop";
      EventName["ShopPopups"] = "shoppopups";
      EventName["FreeTryPopups"] = "trypopups";
      EventName["FreeTryOut"] = "tryout";
      EventName["AdExcitation_ad"] = "excitation_ad";
      EventName["AdExcitation_adsuc"] = "excitation_adsuc";
      EventName["AdInterstitial_ad"] = "interstitial_ad";
      EventName["AdInterstitial_adsuc"] = "interstitial_adsuc";
      EventName["Mode3rounds"] = "mode_3rounds";
      EventName["Mode5rounds"] = "mode_5rounds";
      EventName["SeeCards_AutoAD_Show"] = "SeeCards_AutoAD_Show";
      EventName["SeeCards_AutoAD_Skip"] = "SeeCards_AutoAD_Skip";
      EventName["SeeCards_AutoAD_Play"] = "SeeCards_AutoAD_Play";
      EventName["SeeCards_AutoAD_Success"] = "SeeCards_AutoAD_Success";
      EventName["SeeCards_Buy_Open"] = "SeeCards_Buy_Open";
      EventName["SeeCards_subscribe_Click"] = "SeeCards_subscribe_Click";
      EventName["SeeCards_subscribe_Success"] = "SeeCards_subscribe_Success";
      EventName["SeeCards_AD_Click"] = "SeeCards_AD_Click";
      EventName["SeeCards_AD_Success"] = "SeeCards_AD_Success";
      EventName["Game_BitAuto_OK"] = "Game_BitAuto_OK";
      EventName["Game_BitManual_OK"] = "Game_BitManual_OK";
      EventName["JiliAdCount"] = "jiliAdCount";
      EventName["JiliAdLoadSucCount"] = "jiliAdLoadSucCount";
      EventName["JiliAdSuccessfulCount"] = "jiliAdSuccessfulCount";
      EventName["JiliAdLoadFailCount"] = "jiliAdLoadFailCount";
      EventName["JiliAdFailCount"] = "jiliAdFailCount";
      EventName["ChapingAdCount"] = "chapingAdCount";
      EventName["ChapingAdLoadSucCount"] = "chapingAdLoadSucCount";
      EventName["ChapingAdSuccessfulCount"] = "chapingAdSuccessfulCount";
      EventName["ChapingAdLoadFailCount"] = "chapingAdLoadFailCount";
      EventName["ChapingAdFailCount"] = "chapingAdFailCount";
      EventName["RewardVideoFailDetails"] = "RewardVideoFailDetails";
      EventName["Game_Round_Start"] = "Game_Round_Start";
      EventName["Game_Bit_Add"] = "Game_Bit_Add";
      EventName["Game_Bit_Reduce"] = "Game_Bit_Reduce";
      EventName["Game_BitAuto_EnoughWin"] = "Game_BitAuto_EnoughWin";
      EventName["Game_BitManual_EnoughWin"] = "Game_BitManual_EnoughWin";
      EventName["Game_BitNum"] = "Game_BitNum";
      EventName["Game_Settlement"] = "Game_Settlement";
      EventName["Game_Settlement_Playagain"] = "Game_Settlement_Playagain";
      EventName["Game_Settlement_GoHome"] = "Game_Settlement_GoHome";
      EventName["Start_frist"] = "start_frist";
      EventName["Start_normal"] = "start_normal";
      EventName["Rate_show"] = "likethisgmae_show";
      EventName["ExitGameShow"] = "wqtg_show";
      EventName["ExitGameClose"] = "cancel_wqtg_click";
      EventName["ExpressShow"] = "experience_get_show";
      EventName["UpgradeShow"] = "upgrade_show";
      EventName["Player_Avatar_Change"] = "Player_Avatar_Change";
      EventName["ABtest"] = "ABtest";
      EventName["Home_Set"] = "Home_Set";
      EventName["Home_Onlinecoin_Click"] = "Home_Onlinecoin_Click";
      EventName["Home_Onlinecoin_Success"] = "Home_Onlinecoin_Success";
      EventName["Shop_Subscription_Click"] = "Shop_Subscription_Click";
      EventName["Shop_Coins_Click"] = "Shop_Coins_Click";
      EventName["Shop_Cards_Click"] = "Shop_Cards_Click";
      EventName["Shop_Background_Click"] = "Shop_Background_Click";
      EventName["use_card"] = "use_card_";
      EventName["use_bg"] = "use_bg_";
      EventName["freeClick"] = "free{0}Click";
      EventName["spin_adsuc"] = "spin_adsuc";
      EventName["Set_Music_On"] = "Set_Music_On";
      EventName["Set_Music_Off"] = "Set_Music_Off";
      EventName["Set_EX_On"] = "Set_EX_On";
      EventName["Set_EX_Off"] = "Set_EX_Off";
      EventName["Set_ExitGame_Click"] = "Set_ExitGame_Click";
      EventName["Set_ExitGame_Cancel"] = "Set_ExitGame_Cancel";
      EventName["Player_Name_Change"] = "Player_Name_Change";
      EventName["Player_Level_Up"] = "Player_Level_Up";
      EventName["Appraise_Appear"] = "Appraise_Appear";
      EventName["Appraise_OK"] = "Appraise_OK";
      EventName["Appraise_Close"] = "Appraise_Close";
      EventName["Game_Set"] = "Game_Set";
      EventName["Game_Set_Cancel"] = "Game_Set_Cancel";
      EventName["Game_Set_Restart"] = "Game_Set_Restart";
      EventName["Game_Set_Quite"] = "Game_Set_Quite";
      EventName["Game_ScoreRecords_Click"] = "Game_ScoreRecords_Click";
      EventName["Game_GameStart"] = "Game_GameStart";
      EventName["Local_Settlement"] = "Local_Settlement";
      EventName["Local_Settlement_Playagain"] = "Local_Settlement_Playagain";
      EventName["Local_Settlement_GoHome"] = "Local_Settlement_GoHome";
      EventName["Game_RoundAD_Count"] = "Game_RoundAD_Count";
      EventName["Game_RoundAD_LoadSuc"] = "Game_RoundAD_LoadSuc";
      EventName["Game_RoundAD_Successful"] = "Game_RoundAD_Successful";
      EventName["Game_SettlementAD_Count"] = "Game_SettlementAD_Count";
      EventName["Game_SettlementAD_LoadSuc"] = "Game_SettlementAD_LoadSuc";
      EventName["Game_SettlementAD_Successful"] = "Game_SettlementAD_Successful";
      EventName["jiliAdCount"] = "jiliAdCount";
      EventName["jiliAdLoadSucCount"] = "jiliAdLoadSucCount";
      EventName["jiliAdSuccessfulCount"] = "jiliAdSuccessfulCount";
      EventName["chapingAdCount"] = "chapingAdCount";
      EventName["chapingAdLoadSucCount"] = "chapingAdLoadSucCount";
      EventName["chapingAdSuccessfulCount"] = "chapingAdSuccessfulCount";
      EventName["qiepingAdCount"] = "qiepingAdCount";
      EventName["qiepingAdSuccessfulCount"] = "qiepingAdSuccessfulCount";
      EventName["AD_Restart_Count"] = "AD_Restart_Count";
      EventName["AD_Restart_Success"] = "AD_Restart_Success";
      EventName["AD_Quit_Count"] = "AD_Quit_Count";
      EventName["AD_Quit_Success"] = "AD_Quit_Success";
      EventName["AD_Gohome_Count"] = "AD_Gohome_Count";
      EventName["AD_Gohome_Success"] = "AD_Gohome_Success";
      EventName["Online_Settlement"] = "Online_Settlement";
      EventName["TrySkin_AutoAD_Show"] = "TrySkin_AutoAD_Show";
      EventName["TrySkin_AutoAD_Skip"] = "TrySkin_AutoAD_Skip";
      EventName["TrySkin_AutoAD_Play"] = "TrySkin_AutoAD_Play";
      EventName["TrySkin_AutoAD_Success"] = "TrySkin_AutoAD_Success";
      EventName["AutoPlay_Appear"] = "AutoPlay_Appear";
      EventName["AutoPlay_Open"] = "AutoPlay_Open";
      EventName["AutoPlay_Close"] = "AutoPlay_Close";
      EventName["TrySkin_AutoADX_Success"] = "TrySkin_AutoAD{0}_Success";
      EventName["Shoppreview_X"] = "shoppreview_";
      EventName["Game_Shop_Appear"] = "Game_Shop_Appear";
      EventName["Game_Shop_Click"] = "Game_Shop_Click";
      EventName["Game_Shop_Buy"] = "Game_Shop_Buy";
      EventName["Home_TimeLimit_Appear"] = "Home_TimeLimit_Appear";
      EventName["Home_TimeLimit_Close"] = "Home_TimeLimit_Close";
      EventName["Home_TimeLimit_Buy"] = "Home_TimeLimit_Buy";
      EventName["TimeLimit_AD_Appear"] = "TimeLimit_AD_Appear";
      EventName["TimeLimit_AD_Watch"] = "TimeLimit_AD_Watch";
      EventName["TimeLimit_AD_Buy"] = "TimeLimit_AD_Buy";
      EventName["TimeLimit_Coin_Appear"] = "TimeLimit_Coin_Appear";
      EventName["TimeLimit_Coin_Buy"] = "TimeLimit_Coin_Buy";
      EventName["AllSkinBuy"] = "AllSkinBuy_{0}";
      EventName["Home_8Bid_Click"] = "Home_8Bid_Click";
      EventName["Home_8Bid_NotOnline"] = "Home_8Bid_NotOnline";
      EventName["Home_8Bid_Online"] = "Home_8Bid_Online";
      EventName["Home_8Bid_Start"] = "Home_8Bid_Start";
      EventName["Home_8Bid_Help"] = "Home_8Bid_Help";
      EventName["Home_8Bid_Close"] = "Home_8Bid_Close";
      EventName["Home_8Bid_5rounds"] = "Home_8Bid_5rounds";
      EventName["Home_8Bid_3rounds"] = "Home_8Bid_3rounds";
      EventName["Home_8Bid_Quit"] = "Home_8Bid_Quit";
      EventName["Home_8Bid_Restart"] = "Home_8Bid_Restart";
      EventName["Home_8Bid_Cancel"] = "Home_8Bid_Cancel";
      EventName["Home_8Bid_Settlement"] = "Home_8Bid_Settlement";
      EventName["Home_8Bid_SettlementQuit"] = "Home_8Bid_SettlementQuit";
      EventName["Home_8Bid_SettlementRestart"] = "Home_8Bid_SettlementRestart";
      EventName["Bid_Settlement_1"] = "Bid8_Settlement_1";
      EventName["Bid_Settlement_2"] = "Bid8_Settlement_2";
      EventName["Bid_Settlement_3"] = "Bid8_Settlement_3";
      EventName["Bid_Settlement_4"] = "Bid8_Settlement_4";
      EventName["Game_Settlement_1"] = "Game_Settlement_1";
      EventName["Game_Settlement_2"] = "Game_Settlement_2";
      EventName["Game_Settlement_3"] = "Game_Settlement_3";
      EventName["Game_Settlement_4"] = "Game_Settlement_4";
      EventName["Online_Settlement_1"] = "Online_Settlement_1";
      EventName["Online_Settlement_2"] = "Online_Settlement_2";
      EventName["Online_Settlement_3"] = "Online_Settlement_3";
      EventName["Online_Settlement_4"] = "Online_Settlement_4";
    })(EventName = exports.EventName || (exports.EventName = {}));
    var LocalStorageKey;
    (function(LocalStorageKey) {
      LocalStorageKey["MyName"] = "MyName";
      LocalStorageKey["FirstLoginTime"] = "FirstLoginTime";
      LocalStorageKey["LoginTime"] = "LoginTime";
      LocalStorageKey["OnlineTime"] = "OnlineTime";
      LocalStorageKey["ShowInterstitialTimes"] = "ShowInterstitialTimes";
      LocalStorageKey["ShowVideoRewardTimes"] = "ShowVideoRewardTimes";
      LocalStorageKey["GameEndTimes"] = "GameEndTimes";
      LocalStorageKey["Is24Hours"] = "Is24Hours";
      LocalStorageKey["OnlineTime24Hours"] = "OnlineTime24Hours";
      LocalStorageKey["OnlineTime24HoursOnce"] = "OnlineTime24HoursOnce";
      LocalStorageKey["OnlineTimeAllTime"] = "OnlineTimeAllTime";
      LocalStorageKey["FreeCoinsTimesPerDay"] = "FreeCoinsTimesPerDay";
      LocalStorageKey["TurntableMillis"] = "TurntableMillis";
      LocalStorageKey["TurntableTimesPerDay"] = "TurntableTimesPerDay";
      LocalStorageKey["VideoCount"] = "VideoCount";
      LocalStorageKey["SkuTime"] = "SkuTime";
      LocalStorageKey["ADShop"] = "ADShop";
      LocalStorageKey["FreeTrialData"] = "FreeTrialData";
      LocalStorageKey["PlayerHead"] = "PlayerHead";
      LocalStorageKey["RoundMaxKey"] = "RoundMaxKey";
      LocalStorageKey["DayBtnClick"] = "DayBtnClick";
      LocalStorageKey["DealCardsData"] = "DealCardsData";
      LocalStorageKey["SkinData"] = "SkinData";
      LocalStorageKey["DiscountData"] = "DiscountData";
      LocalStorageKey["ChallengeModel"] = "ChallengeModel";
      LocalStorageKey["ChallengeModelStartTimes"] = "ChallengeModelStartTimes";
      LocalStorageKey["Battle8ModelIsGame"] = "Battle8ModelIsGame";
    })(LocalStorageKey = exports.LocalStorageKey || (exports.LocalStorageKey = {}));
    exports.Version = "0.0.0";
    exports.DebugFlag = false;
    var Constant = function() {
      function Constant() {}
      Constant.MaxFreeCoinsPerDay = 5;
      Constant.MaxTurntableTimesPerDay = 10;
      Constant.TurntableCdTime = [ 15, 15, 15 ];
      Constant.FreeTrialSkinCount = 2;
      Constant.FreeTrialSkinTime = 1;
      return Constant;
    }();
    exports.Constant = Constant;
    exports.BotNames = [ [ "id", "name" ], [ "1", "Achal" ], [ "2", "Abhi" ], [ "3", "Abhijit" ], [ "4", "Achyuta" ], [ "5", "Adam" ], [ "6", "Adam" ], [ "7", "Addison" ], [ "8", "Aditi" ], [ "9", "Aditya" ], [ "10", "Adolph" ], [ "11", "Adolpha" ], [ "12", "Ajitabh" ], [ "13", "Akaash" ], [ "14", "Akoasm" ], [ "15", "Akriti" ], [ "16", "Alan" ], [ "17", "Alana" ], [ "18", "Alexander" ], [ "19", "Alexandra" ], [ "20", "Alger" ], [ "21", "Alka" ], [ "22", "Allure Love" ], [ "23", "Amal" ], [ "24", "Amar" ], [ "25", "Ambar" ], [ "26", "Amisha" ], [ "27", "Amita" ], [ "28", "Amitava" ], [ "29", "Amol" ], [ "30", "Amulya" ], [ "31", "Anand" ], [ "32", "Anar" ], [ "33", "Angada" ], [ "34", "Angelo" ], [ "35", "Angels" ], [ "36", "Anil" ], [ "37", "Ankur" ], [ "38", "Anshu" ], [ "39", "Anusree" ], [ "40", "Aparajita" ], [ "41", "Aparna" ], [ "42", "Arjun" ], [ "43", "Arthur" ], [ "44", "Arushi" ], [ "45", "Aseem" ], [ "46", "Asha" ], [ "47", "Ashbur" ], [ "48", "Ashish" ], [ "49", "Ashley" ], [ "50", "Ashley" ], [ "51", "Ashwin" ], [ "52", "Ashwini" ], [ "53", "Askini" ], [ "54", "Asmita" ], [ "55", "Asvin" ], [ "56", "Atman" ], [ "57", "Atul" ], [ "58", "Avani" ], [ "59", "Avanti" ], [ "60", "Ayuhi" ], [ "61", "Ayush" ], [ "62", "Azaria" ], [ "63", "Azarias" ], [ "64", "Babul" ], [ "65", "Bansi" ], [ "66", "Basilia" ], [ "67", "Baslilon" ], [ "68", "Bark" ], [ "69", "Berger" ], [ "70", "Bernie" ], [ "71", "Beverley" ], [ "72", "Beverley" ], [ "73", "Bhagini" ], [ "74", "Bharati" ], [ "75", "Bhavesh" ], [ "76", "Bhavin" ], [ "77", "Bhishma" ], [ "78", "Bhoomi" ], [ "79", "Bhrigu" ], [ "80", "Bhuvan" ], [ "81", "Bijal" ], [ "82", "Bing" ], [ "83", "Binga" ], [ "84", "Blake" ], [ "85", "Blank" ], [ "86", "BliTHE" ], [ "87", "Bob" ], [ "88", "Brand" ], [ "89", "Brandy" ], [ "90", "Brian" ], [ "91", "Bruce" ], [ "92", "Bryna" ], [ "93", "Callous" ], [ "94", "Carol" ], [ "95", "Castor" ], [ "96", "Cauvery" ], [ "97", "Cecil" ], [ "98", "Cecilla" ], [ "99", "Chaitaly" ], [ "100", "Chaman" ], [ "101", "Chander" ], [ "102", "Charan" ], [ "103", "Charu" ], [ "104", "cherry" ], [ "105", "Chester" ], [ "106", "Chetan" ], [ "107", "Chhavvi" ], [ "108", "Chrirag" ], [ "109", "Christine" ], [ "110", "Christmas" ], [ "111", "Chritian" ], [ "112", "Clara" ], [ "113", "Clare" ], [ "114", "Cleva" ], [ "115", "Clifford" ], [ "116", "Clive" ], [ "117", "clover" ], [ "118", "Content" ], [ "119", "Craig" ], [ "120", "Curtain" ], [ "121", "d3sTiny" ], [ "122", "Daisy" ], [ "123", "Daksha" ], [ "124", "Dale" ], [ "125", "Daniel" ], [ "126", "Darcy" ], [ "127", "Daria" ], [ "128", "Darius" ], [ "129", "Death" ], [ "130", "Deepspace" ], [ "131", "Deepak" ], [ "132", "Deepali" ], [ "133", "Deepika" ], [ "134", "demon" ], [ "135", "Desperate" ], [ "136", "Destiny" ], [ "137", "Devesh" ], [ "138", "Devi" ], [ "139", "Devitri" ], [ "140", "devoted" ], [ "141", "Dharma" ], [ "142", "Dharuna" ], [ "143", "Dhatri" ], [ "144", "Dilip" ], [ "145", "Dinesh" ], [ "146", "Dominic" ], [ "147", "Donald" ], [ "148", "Donte" ], [ "149", "Douglas" ], [ "150", "Duncan" ], [ "151", "Durga" ], [ "152", "Dvimidha" ], [ "153", "Ekachakra" ], [ "154", "Ekta" ], [ "155", "Elina" ], [ "156", "Elliot" ], [ "157", "Escape" ], [ "158", "Eve" ], [ "159", "Flowers" ], [ "160", "future" ], [ "161", "Ganesa" ], [ "162", "Ganesh" ], [ "163", "Gaurav" ], [ "164", "Gayatri" ], [ "165", "Girija" ], [ "166", "Girish" ], [ "167", "Gitika" ], [ "168", "Gopal" ], [ "169", "GREgary" ], [ "170", "Guddu" ], [ "171", "Guy" ], [ "172", "Hamiltion" ], [ "173", "Haresh" ], [ "174", "Harish" ], [ "175", "Harry" ], [ "176", "Hema" ], [ "177", "Hemal" ], [ "178", "Hemang" ], [ "179", "Hemlata" ], [ "180", "Herbert" ], [ "181", "Hetal" ], [ "182", "Hiten" ], [ "183", "Hitendra" ], [ "184", "Ian" ], [ "185", "Ila" ], [ "186", "Imagine" ], [ "187", "Ina" ], [ "188", "Indra" ], [ "189", "Ira" ], [ "190", "Isaac" ], [ "191", "Isha" ], [ "192", "Ishana" ], [ "193", "Ishver" ], [ "194", "Jagrati" ], [ "195", "Jahnavi" ], [ "196", "Jatin" ], [ "197", "Jayani" ], [ "198", "Jayant" ], [ "199", "Jayne" ], [ "200", "Jiger" ], [ "201", "Jilesh" ], [ "202", "Jiten" ], [ "203", "Jitendra" ], [ "204", "Juana" ], [ "205", "Juhi" ], [ "206", "Kabir" ], [ "207", "Kahn" ], [ "208", "Kajal" ], [ "209", "Kajol" ], [ "210", "Kalkin" ], [ "211", "Kalpanath" ], [ "212", "Kamala" ], [ "213", "Kamlesh" ], [ "214", "Kanak" ], [ "215", "Kantha" ], [ "216", "Kanushi" ], [ "217", "Kartik" ], [ "218", "Kartikeya" ], [ "219", "Kerani" ], [ "220", "Keshav" ], [ "221", "Ketaki" ], [ "222", "Ketan" ], [ "223", "king" ], [ "224", "Kiran" ], [ "225", "Kirti" ], [ "226", "Kishore" ], [ "227", "Koreyoshi" ], [ "228", "Kripa" ], [ "229", "Kriti" ], [ "230", "Krupa" ], [ "231", "Kuhuk" ], [ "232", "Kulvir" ], [ "233", "Kumud" ], [ "234", "Kunal" ], [ "235", "Kushan" ], [ "236", "Lakshman" ], [ "237", "Lalasa" ], [ "238", "Lalima" ], [ "239", "Lavani" ], [ "240", "Laxmi" ], [ "241", "Len" ], [ "242", "Letitgo" ], [ "243", "Lokesh" ], [ "244", "Madan" ], [ "245", "Madhu" ], [ "246", "Madhul" ], [ "247", "Mahabala" ], [ "248", "Mahavira" ], [ "249", "Mahita" ], [ "250", "Maitryi" ], [ "251", "Maliha" ], [ "252", "Malina" ], [ "253", "Manasi" ], [ "254", "Manavi" ], [ "255", "Mandhatri" ], [ "256", "Manisha" ], [ "257", "Manjari" ], [ "258", "Manu" ], [ "259", "Manushi" ], [ "260", "Marisa" ], [ "261", "Matrika" ], [ "262", "Maurice" ], [ "263", "Maya" ], [ "264", "Meena" ], [ "265", "Mehul" ], [ "266", "Mena" ], [ "267", "Menaka" ], [ "268", "Michael" ], [ "269", "Mihir" ], [ "270", "mimosa" ], [ "271", "Mitali" ], [ "272", "Mitesh" ], [ "273", "Moers" ], [ "274", "Mohan" ], [ "275", "Mohini" ], [ "276", "MoMaek" ], [ "277", "MoMaek" ], [ "278", "Moses" ], [ "279", "Mukta" ], [ "280", "Mukul" ], [ "281", "Murder" ], [ "282", "Murphy" ], [ "283", "Myprec1ous" ], [ "284", "Myron" ], [ "285", "Naimish" ], [ "286", "Naina" ], [ "287", "Nanda" ], [ "288", "Nandin" ], [ "289", "Nandita" ], [ "290", "Narmada" ], [ "291", "Nathaniel" ], [ "292", "Naveen" ], [ "293", "Nayan" ], [ "294", "Neelam" ], [ "295", "Neelja" ], [ "296", "Neeta" ], [ "297", "Neha" ], [ "298", "NeverGive" ], [ "299", "Nidra" ], [ "300", "Nihar" ], [ "301", "Niju" ], [ "302", "Nikhil" ], [ "303", "Nimai" ], [ "304", "Nimesh" ], [ "305", "Nimisha" ], [ "306", "Nimmi" ], [ "307", "Niranjan" ], [ "308", "Nirav" ], [ "309", "Nisha" ], [ "310", "Nishtha" ], [ "311", "Nitu" ], [ "312", "Nitya" ], [ "313", "Nitya" ], [ "314", "Niyati" ], [ "315", "Norman" ], [ "316", "Otto" ], [ "317", "Padma" ], [ "318", "Palomi" ], [ "319", "Pandita" ], [ "320", "Pandya" ], [ "321", "Paras" ], [ "322", "Parnika" ], [ "323", "Parnita" ], [ "324", "Parvani" ], [ "325", "Parvati" ], [ "326", "Paul" ], [ "327", "Pauravi" ], [ "328", "Pavi" ], [ "329", "Peter" ], [ "330", "Philip" ], [ "331", "Piyali" ], [ "332", "Poison" ], [ "333", "Pooja" ], [ "334", "Prabhati" ], [ "335", "Prabodh" ], [ "336", "Prachi" ], [ "337", "Pragya" ], [ "338", "Prama" ], [ "339", "Pramath" ], [ "340", "Pramsu" ], [ "341", "Prapti" ], [ "342", "Prasanth" ], [ "343", "Prasata" ], [ "344", "Prassana" ], [ "345", "Pratap" ], [ "346", "Praveen" ], [ "347", "Prayag" ], [ "348", "Preeti" ], [ "349", "Prema" ], [ "350", "Preyasi" ], [ "351", "Primo" ], [ "352", "Prisha" ], [ "353", "Prithu" ], [ "354", "Pritika" ], [ "355", "Privrata" ], [ "356", "Priya" ], [ "357", "Purujit" ], [ "358", "Purva" ], [ "359", "queen" ], [ "360", "Rachna" ], [ "361", "Rakhi" ], [ "362", "Ranjana" ], [ "363", "Rati" ], [ "364", "Redundant" ], [ "365", "Reman" ], [ "366", "Rima" ], [ "367", "Robert" ], [ "368", "Rohini" ], [ "369", "Ruchira" ], [ "370", "Rudolf" ], [ "371", "Rupali" ], [ "372", "Rupert" ], [ "373", "Sahana" ], [ "374", "Sajili" ], [ "375", "sakura" ], [ "376", "Saloni" ], [ "377", "Sandya" ], [ "378", "Sanyukta" ], [ "379", "Sarika" ], [ "380", "Saryu" ], [ "381", "Saumya" ], [ "382", "Savitri" ], [ "383", "Sevati" ], [ "384", "Shaina" ], [ "385", "Sharda" ], [ "386", "sherry" ], [ "387", "Shikha" ], [ "388", "Shreya" ], [ "389", "Shruti" ], [ "390", "Sily" ], [ "391", "Simran" ], [ "392", "Smridhi" ], [ "393", "so hot" ], [ "394", "Sobha" ], [ "395", "Sonika" ], [ "396", "Srishti" ], [ "397", "Steven" ], [ "398", "Subhuja" ], [ "399", "Sudha" ], [ "400", "Sumanna" ], [ "401", "Sundeep" ], [ "402", "Supriti" ], [ "403", "Suruchi" ], [ "404", "sweettalk" ], [ "405", "Tamali" ], [ "406", "Tanvi" ], [ "407", "Tasha" ], [ "408", "Taylor" ], [ "409", "Tender" ], [ "410", "Tenderness" ], [ "411", "The reason" ], [ "412", "Toral" ], [ "413", "Tuhina" ], [ "414", "Uma" ], [ "415", "Usha" ], [ "416", "Vandana" ], [ "417", "Varuni" ] ];
    cc._RF.pop();
  }, {} ],
  EnumMacros: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f62b3lSl/hNppoarA4mSUe6", "EnumMacros");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Easing = exports.NFUIGroupName = exports.AdsType = exports.CallBackStatus = void 0;
    var CallBackStatus;
    (function(CallBackStatus) {
      CallBackStatus[CallBackStatus["CALL_SUCCESS"] = 1] = "CALL_SUCCESS";
      CallBackStatus[CallBackStatus["CALL_FALIED"] = 2] = "CALL_FALIED";
      CallBackStatus[CallBackStatus["CALL_SURE"] = 3] = "CALL_SURE";
      CallBackStatus[CallBackStatus["CALL_CANCEL"] = 4] = "CALL_CANCEL";
      CallBackStatus[CallBackStatus["CALL_GO"] = 5] = "CALL_GO";
      CallBackStatus[CallBackStatus["CALL_LOADFALIED"] = 6] = "CALL_LOADFALIED";
      CallBackStatus[CallBackStatus["CALL_ERROR"] = 7] = "CALL_ERROR";
      CallBackStatus[CallBackStatus["CALL_AD_SHOW"] = 8] = "CALL_AD_SHOW";
      CallBackStatus[CallBackStatus["CALL_AD_CLICK"] = 9] = "CALL_AD_CLICK";
      CallBackStatus[CallBackStatus["CALL_AD_LOADED"] = 10] = "CALL_AD_LOADED";
      CallBackStatus[CallBackStatus["CALL_START"] = 11] = "CALL_START";
      CallBackStatus[CallBackStatus["CALL_UPDATE"] = 12] = "CALL_UPDATE";
      CallBackStatus[CallBackStatus["CALL_INVALID"] = 13] = "CALL_INVALID";
      CallBackStatus[CallBackStatus["CALL_SKIPPED"] = 14] = "CALL_SKIPPED";
      CallBackStatus[CallBackStatus["CALL_CLOSE"] = 15] = "CALL_CLOSE";
    })(CallBackStatus = exports.CallBackStatus || (exports.CallBackStatus = {}));
    var AdsType;
    (function(AdsType) {
      AdsType[AdsType["AT_Banner_Top"] = 1] = "AT_Banner_Top";
      AdsType[AdsType["AT_Banner_Bottom"] = 2] = "AT_Banner_Bottom";
      AdsType[AdsType["AT_Interstitial"] = 3] = "AT_Interstitial";
      AdsType[AdsType["AT_RewardVideo"] = 4] = "AT_RewardVideo";
      AdsType[AdsType["AT_Native"] = 5] = "AT_Native";
      AdsType[AdsType["AT_FullScreenVideo"] = 6] = "AT_FullScreenVideo";
      AdsType[AdsType["AT_SplashAd"] = 7] = "AT_SplashAd";
      AdsType[AdsType["AT_Native_Banner_Bottom"] = 8] = "AT_Native_Banner_Bottom";
      AdsType[AdsType["AT_Native_Banner_Top"] = 9] = "AT_Native_Banner_Top";
      AdsType[AdsType["AT_Interstitial_Graphic"] = 10] = "AT_Interstitial_Graphic";
      AdsType[AdsType["AT_Interactive"] = 11] = "AT_Interactive";
      AdsType[AdsType["AT_Int_RewardVideo"] = 12] = "AT_Int_RewardVideo";
      AdsType[AdsType["AT_Native_Int"] = 13] = "AT_Native_Int";
    })(AdsType = exports.AdsType || (exports.AdsType = {}));
    var NFUIGroupName;
    (function(NFUIGroupName) {
      NFUIGroupName["Default"] = "Default";
      NFUIGroupName["Middle"] = "Middle";
      NFUIGroupName["Front"] = "Front";
      NFUIGroupName["Top"] = "Top";
      NFUIGroupName["TopTop"] = "TopTop";
    })(NFUIGroupName = exports.NFUIGroupName || (exports.NFUIGroupName = {}));
    var Easing;
    (function(Easing) {
      Easing["quadIn"] = "quadIn";
      Easing["quadOut"] = "quadOut";
      Easing["quadInOut"] = "quadInOut";
      Easing["cubicIn"] = "cubicIn";
      Easing["cubicOut"] = "cubicOut";
      Easing["cubicInOut"] = "cubicInOut";
      Easing["quartIn"] = "quartIn";
      Easing["quartOut"] = "quartOut";
      Easing["quartInOut"] = "quartInOut";
      Easing["quintIn"] = "quintIn";
      Easing["quintOut"] = "quintOut";
      Easing["quintInOut"] = "quintInOut";
      Easing["sineIn"] = "sineIn";
      Easing["sineOut"] = "sineOut";
      Easing["sineInOut"] = "sineInOut";
      Easing["expoIn"] = "expoIn";
      Easing["expoOut"] = "expoOut";
      Easing["expoInOut"] = "expoInOut";
      Easing["circIn"] = "circIn";
      Easing["circOut"] = "circOut";
      Easing["circInOut"] = "circInOut";
      Easing["elasticIn"] = "elasticIn";
      Easing["elasticOut"] = "elasticOut";
      Easing["elasticInOut"] = "elasticInOut";
      Easing["backIn"] = "backIn";
      Easing["backOut"] = "backOut";
      Easing["backInOut"] = "backInOut";
      Easing["bounceIn"] = "bounceIn";
      Easing["bounceOut"] = "bounceOut";
      Easing["bounceInOut"] = "bounceInOut";
      Easing["smooth"] = "smooth";
      Easing["fade"] = "fade";
    })(Easing = exports.Easing || (exports.Easing = {}));
    cc._RF.pop();
  }, {} ],
  ExitForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60a91SQNn5FUJgBo2reYL61", "ExitForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var NF_1 = require("./NFramework/NF");
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var DealCardsMgr_1 = require("./Common/Mgr/DealCardsMgr");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ExitForm = function(_super) {
      __extends(ExitForm, _super);
      function ExitForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ndRestart = null;
        _this.mBTest = null;
        _this.mATest = null;
        _this.mTitle = null;
        _this.mATips = null;
        _this.mBTips = null;
        _this.mRestart = null;
        _this.mVideo = null;
        return _this;
      }
      ExitForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ExitGameShow);
        this.AbTestShow();
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid ? this.mVideo.active = true : this.mVideo.active = false;
      };
      ExitForm.prototype.AbTestShow = function() {
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online ? this.ndRestart.active = false : this.ndRestart.active = true;
        this.mTitle.fontSize = 42;
        this.mTitle.enableBold = true;
        this.mRestart.active = GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online;
        this.mBTest.spacingX = GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online ? 96.5 : 23.5;
        this.mBTest.node.active = true;
        this.mATest.active = false;
        this.mATips.node.active = false;
        this.mBTips.node.active = true;
      };
      ExitForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      ExitForm.prototype.btnCancel = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ExitGameClose);
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Cancel);
        _super.prototype.Close.call(this);
      };
      ExitForm.prototype.btnQuit = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlayerMgr_1.default.Instance.mIsFristRound = false;
        var data = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.FreeTrialData, null);
        if (data && (data.skinId > 0 || data.mIsPay)) {
          data.skinId = 0;
          data.skinType = -1;
          data.mIsPay = false;
          NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.FreeTrialData, data);
        }
        GameDataMgr_1.default.GetInstance().setData("CanCheckFreeTrial", true);
        AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_003") && DealCardsMgr_1.default.GetInstance().SetHalfwayExit(true);
        DealCardsMgr_1.default.GetInstance().QuitGameSetData();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Set_Quite);
        DealCardsMgr_1.default.GetInstance().SetSustainTwoReopen(false);
        GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.BidForm) && GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.BidForm);
        cc.director.loadScene("MainScene");
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Quit);
        _super.prototype.Close.call(this);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_003");
      };
      ExitForm.prototype.btnRestart = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid ? AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_012", function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            GameMgr_1.default.GetInstance().SetWinOrLose([]);
            PlayerMgr_1.default.Instance.mIsFristRound = false;
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Restart);
            cc.director.loadScene("SingleGame");
            _super.prototype.Close.call(_this);
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        }) : this.RestartGame();
      };
      ExitForm.prototype.RestartGame = function() {
        DealCardsMgr_1.default.GetInstance().SetHalfwayExit(false);
        GameMgr_1.default.GetInstance().SetWinOrLose([]);
        AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_002") && DealCardsMgr_1.default.GetInstance().SetSustainTwoReopen(true);
        DealCardsMgr_1.default.GetInstance().RestartSetData();
        PlayerMgr_1.default.Instance.mIsFristRound = false;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Set_Restart);
        cc.director.loadScene("SingleGame");
        GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.BidForm) && GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.BidForm);
        _super.prototype.Close.call(this);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_002");
      };
      __decorate([ property(cc.Node) ], ExitForm.prototype, "ndRestart", void 0);
      __decorate([ property(cc.Layout) ], ExitForm.prototype, "mBTest", void 0);
      __decorate([ property(cc.Node) ], ExitForm.prototype, "mATest", void 0);
      __decorate([ property(cc.Label) ], ExitForm.prototype, "mTitle", void 0);
      __decorate([ property(cc.Label) ], ExitForm.prototype, "mATips", void 0);
      __decorate([ property(cc.Label) ], ExitForm.prototype, "mBTips", void 0);
      __decorate([ property(cc.Node) ], ExitForm.prototype, "mRestart", void 0);
      __decorate([ property(cc.Node) ], ExitForm.prototype, "mVideo", void 0);
      ExitForm = __decorate([ ccclass ], ExitForm);
      return ExitForm;
    }(UIFormLogic_1.default);
    exports.default = ExitForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/DealCardsMgr": "DealCardsMgr",
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  FakeGameForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2e999+/MtCRZAcYoOPlk8B", "FakeGameForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var NF_1 = require("./NFramework/NF");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FakeGameForm = function(_super) {
      __extends(FakeGameForm, _super);
      function FakeGameForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ndEnterName = null;
        _this.editInputName = null;
        _this.labVersion = null;
        _this.labConnectServer = null;
        _this.ndNames = null;
        _this.names = [];
        _this.ndRetry = null;
        _this.labServerCount = null;
        _this.ndMatch = null;
        _this.ndStart = null;
        _this.mTitle = null;
        _this.mMatchSp = null;
        _this.mMatchTF = null;
        _this.mStartSp = null;
        _this.mStartTF = null;
        _this.mServerCount = null;
        _this.mCard = null;
        _this.mcloseBtn = null;
        _this.mRetryTitle = null;
        _this.mRetryTips = null;
        _this.mRetryBtnTF = null;
        _this.gameData = null;
        _this.connectCount = -1;
        _this.connectN = 0;
        _this.connectTimeOut = 5e3;
        _this.isConnected = false;
        _this.isCnntRuning = false;
        _this.playerCountBase = 0;
        _this.refreshServerCountKick = 0;
        return _this;
      }
      FakeGameForm.prototype.start = function() {};
      FakeGameForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.labVersion.string = PlatformMgr_1.default.GetInstance().GetAndroidVersionName();
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        this.AbTestShow();
        this.btnRandomGame();
      };
      FakeGameForm.prototype.AbTestShow = function() {
        this.mCard.isAlignLeft = true;
        this.mCard.isAlignRight = false;
        this.mCard.left = 5.93;
        this.mcloseBtn.isAlignLeft = false;
        this.mcloseBtn.isAlignRight = true;
        this.mcloseBtn.right = 10.5;
        this.mRetryTitle.enableBold = this.mRetryTips.enableBold = this.mRetryBtnTF.enableBold = this.mServerCount.enableBold = this.mMatchTF.enableBold = this.mStartTF.enableBold = this.mTitle.enableBold = this.labConnectServer.enableBold = this.labVersion.enableBold = this.mTitle.enableBold = true;
        this.mMatchSp.color = this.mStartSp.color = cc.color(19, 173, 23, 255);
        this.names.forEach(function(element) {
          element.enableBold = true;
          element.fontSize = 24;
        });
      };
      FakeGameForm.prototype.connectServer = function() {
        this.connectCount = 40;
        this.connectN = 0;
        this.setCnntSerString();
        this.connected();
      };
      FakeGameForm.prototype.setCnntSerString = function() {
        this.connectN > 5 && (this.connectN = 0);
        this.labConnectServer.string = "[Connecting to server";
        for (var i = 0; i < this.connectN; i++) this.labConnectServer.string += ".";
        this.labConnectServer.string += "]";
        this.connectN++;
      };
      FakeGameForm.prototype.connected = function() {
        this.isCnntRuning = false;
        this.labConnectServer.string = "[Server connected]";
        this.connectCount = -1;
        this.checkName() && this.showMatch();
      };
      FakeGameForm.prototype.cnntTimeOut = function() {
        this.isCnntRuning = false;
        this.connectCount = -1;
        this.ndRetry.active = true;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.OnlineFail);
      };
      FakeGameForm.prototype.checkName = function() {
        var name = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.MyName);
        if (name) {
          this.ndNames.active = true;
          this.refreshNames([ name ]);
          this.ndEnterName.active = false;
          return true;
        }
        this.ndEnterName.active = true;
        return false;
      };
      FakeGameForm.prototype.refreshNames = function(names) {
        if (names && names.length > 0) for (var i = 0; i < 4; i++) if (i >= names.length) this.names[i].node.active = false; else {
          this.names[i].string = names[i];
          this.names[i].node.active = true;
        }
      };
      FakeGameForm.prototype.showMatch = function() {
        this.ndMatch.active = true;
        this.labServerCount.node.active = true;
      };
      FakeGameForm.prototype.refreshServerInfo = function() {
        if (this.gameData.getTimeCountSec() >= this.refreshServerCountKick) {
          this.refreshServerCountKick = this.gameData.getTimeCountSec() + this.gameData.getFakeModeRefreshCD();
          var info = this.gameData.getFakeModeRefreshInfo();
          var txt = info.players + "players, " + info.games + "games";
          this.labServerCount.string = txt;
        }
      };
      FakeGameForm.prototype.getRandomNames = function() {
        var list = {};
        var i = 0;
        while (i < 3) {
          var a = RandomCardLogic_1.default.GetInstance().random(0, DefineConfig_1.BotNames.length);
          if (!list[a]) {
            i++;
            list[a] = a;
          }
        }
        var keys = Object.keys(list);
        return [ DefineConfig_1.BotNames[keys[0]][1], DefineConfig_1.BotNames[keys[1]][1], DefineConfig_1.BotNames[keys[2]][1] ];
      };
      FakeGameForm.prototype.btnEnterName = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.MyName, this.editInputName.string);
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Change_Name);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SignUpName);
        this.checkName() && this.showMatch();
      };
      FakeGameForm.prototype.btnRandomGame = function(event) {
        var self = this;
        var a = RandomCardLogic_1.default.GetInstance().random(0, 4);
        var b = RandomCardLogic_1.default.GetInstance().random(0, 100);
        this.playerCountBase = 1700 + 100 * a + b;
        this.refreshServerInfo();
        this.ndMatch.active = false;
        this.ndStart.active = false;
        this.labServerCount.node.active = false;
        this.connectServer();
      };
      FakeGameForm.prototype.btnExit = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        GameMgr_1.default.GetInstance().CuttGameModel = DefineConfig_1.GameModel.Ordinary;
        this.Close();
      };
      FakeGameForm.prototype.btrRetry = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.ndRetry.active = false;
        this.btnRandomGame();
      };
      FakeGameForm.prototype.btnMatch = function() {
        var _this = this;
        this.ndMatch.active = false;
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.MatchPlay);
        var cb = function() {
          var name = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.MyName);
          var names = [ name ].concat(_this.getRandomNames());
          _this.refreshNames(names);
          _this.gameData.fakeNames = names;
          _this.gameData.fakeHead[0] = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
          _this.gameData.fakeHead[1] = NF_1.default.Math.RandomInt(0, 8);
          _this.gameData.fakeHead[2] = NF_1.default.Math.RandomInt(0, 8);
          _this.gameData.fakeHead[3] = NF_1.default.Math.RandomInt(0, 8);
          cc.tween(_this.node).delay(1).call(function() {
            _this.btnStart();
          }).start();
          _this.ndStart.active = true;
        };
        var times = this.gameData.getFakeModeMatchTime();
        this.mTimesId = setTimeout(function() {
          cb();
        }, 1e3 * times);
      };
      FakeGameForm.prototype.btnStart = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        GameMgr_1.default.GetInstance().CuttGameModel = DefineConfig_1.GameModel.Online;
        PlayerMgr_1.default.Instance.mIsGameSingle = false;
        _super.prototype.Close.call(this);
        GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.HomeForm);
        cc.director.loadScene("SingleGame");
        PlayerMgr_1.default.Instance.AddGold(-GameMgr_1.default.GetInstance().OnlineCurRoomInfo.mPrice);
      };
      FakeGameForm.prototype.update = function(dt) {
        if (0 == this.connectCount) {
          this.setCnntSerString();
          this.connectCount = 40;
        }
        this.connectCount >= 0 && this.connectCount--;
      };
      FakeGameForm.prototype.OnClose = function() {
        _super.prototype.OnClose.call(this);
        cc.Tween.stopAllByTarget(this.node);
        clearTimeout(this.mTimesId);
      };
      FakeGameForm.prototype.onEditInputEnd = function() {};
      FakeGameForm.prototype.onEditInputChange = function() {};
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "ndEnterName", void 0);
      __decorate([ property(cc.EditBox) ], FakeGameForm.prototype, "editInputName", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "labVersion", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "labConnectServer", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "ndNames", void 0);
      __decorate([ property([ cc.Label ]) ], FakeGameForm.prototype, "names", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "ndRetry", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "labServerCount", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "ndMatch", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "ndStart", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mTitle", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "mMatchSp", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mMatchTF", void 0);
      __decorate([ property(cc.Node) ], FakeGameForm.prototype, "mStartSp", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mStartTF", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mServerCount", void 0);
      __decorate([ property(cc.Widget) ], FakeGameForm.prototype, "mCard", void 0);
      __decorate([ property(cc.Widget) ], FakeGameForm.prototype, "mcloseBtn", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mRetryTitle", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mRetryTips", void 0);
      __decorate([ property(cc.Label) ], FakeGameForm.prototype, "mRetryBtnTF", void 0);
      FakeGameForm = __decorate([ ccclass ], FakeGameForm);
      return FakeGameForm;
    }(UIFormLogic_1.default);
    exports.default = FakeGameForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr",
    "./RandomCardLogic": "RandomCardLogic"
  } ],
  FreeCoinsForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "760f1u7/TlMzLKDcj+eRtB+", "FreeCoinsForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FreeCoinsForm = function(_super) {
      __extends(FreeCoinsForm, _super);
      function FreeCoinsForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mSpritePro = null;
        _this.mLabGoldArr = [];
        _this.mNodeGoldArr = [];
        _this.mLabelTimes = null;
        _this.mGrey = null;
        _this.mNORMAL = null;
        _this.mTitle = null;
        _this.mLabelTips = null;
        _this.mBtnSp = null;
        _this.mBtnIconSp = null;
        _this.mBtnTF = null;
        _this.mBtnIconArr = [];
        return _this;
      }
      FreeCoinsForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.mSpriteProWidth = this.mSpritePro.node.getContentSize().width;
      };
      FreeCoinsForm.prototype.onDisable = function() {
        if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopForm) && !GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm) || GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      FreeCoinsForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.SetView();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.FreeCoinWin);
        NF_1.default.Audio.Play(2);
        this.AbTestShow();
        if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopForm) && !GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm) || GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
      };
      FreeCoinsForm.prototype.AbTestShow = function() {
        this.mTitle.fontSize = 48;
        this.mLabelTips.fontSize = 27;
        this.mLabelTimes.enableBold = this.mBtnTF.enableBold = this.mLabelTips.enableBold = this.mTitle.enableBold = true;
        this.mLabGoldArr.forEach(function(element) {
          element.enableBold = true;
        });
        this.mBtnSp.color = cc.color(241, 207, 26, 255);
        this.mBtnIconSp.spriteFrame = this.mBtnIconArr[1];
      };
      FreeCoinsForm.prototype.SetView = function() {
        var lv = PlayerMgr_1.default.Instance.PlayerData.mLv;
        var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", lv);
        for (var index = 0; index < this.mLabGoldArr.length; index++) {
          var element = this.mLabGoldArr[index];
          element.string = NF_1.default.String.ToBigNumberString(lvInfo["mBonus" + (index + 1)]);
        }
        var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay);
        this.mLabelTimes.string = (DefineConfig_1.Constant.MaxFreeCoinsPerDay - freeTimes).toString();
        for (var index = 0; index < this.mNodeGoldArr.length; index++) {
          var element = this.mNodeGoldArr[index];
          var s = element.getComponentsInChildren(cc.Sprite);
          for (var i = 0; i < s.length; i++) s[i].setMaterial(0, freeTimes > index ? this.mGrey : this.mNORMAL);
        }
        var percent = freeTimes / (DefineConfig_1.Constant.MaxFreeCoinsPerDay - 1);
        percent = percent > 1 ? 1 : percent;
        this.mSpritePro.node.width = this.mSpriteProWidth * percent;
      };
      FreeCoinsForm.prototype.OnBtnVideo = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.FreeCoinAd);
        var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
        PlatformMgr_1.default.GetInstance().OnEventCount(NF_1.default.String.Splicing(DefineConfig_1.EventName.freeClick, freeTimes), "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_001", function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
            var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", PlayerMgr_1.default.Instance.PlayerData.mLv);
            var num = lvInfo["mBonus" + freeTimes];
            PlayerMgr_1.default.Instance.AddGold(num);
            if (PlayerMgr_1.default.Instance.mFreeCoinsNum <= 5) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["FreeCoin" + PlayerMgr_1.default.Instance.mFreeCoinsNum]);
              PlayerMgr_1.default.Instance.mFreeCoinsNum++;
            }
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay, freeTimes);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_HomeFreeCoins);
            var data = {
              mGold: num,
              mExp: 0,
              mFunc: null,
              mFormid: GameEnum_1.UIFormId.FreeCoinsForm
            };
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, data);
            freeTimes < DefineConfig_1.Constant.MaxFreeCoinsPerDay ? _this.SetView() : _this.OnBtnClose();
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        });
      };
      FreeCoinsForm.prototype.OnBtnClose = function() {
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Sprite) ], FreeCoinsForm.prototype, "mSpritePro", void 0);
      __decorate([ property(cc.Label) ], FreeCoinsForm.prototype, "mLabGoldArr", void 0);
      __decorate([ property(cc.Node) ], FreeCoinsForm.prototype, "mNodeGoldArr", void 0);
      __decorate([ property(cc.Label) ], FreeCoinsForm.prototype, "mLabelTimes", void 0);
      __decorate([ property(cc.Material) ], FreeCoinsForm.prototype, "mGrey", void 0);
      __decorate([ property(cc.Material) ], FreeCoinsForm.prototype, "mNORMAL", void 0);
      __decorate([ property(cc.Label) ], FreeCoinsForm.prototype, "mTitle", void 0);
      __decorate([ property(cc.Label) ], FreeCoinsForm.prototype, "mLabelTips", void 0);
      __decorate([ property(cc.Node) ], FreeCoinsForm.prototype, "mBtnSp", void 0);
      __decorate([ property(cc.Sprite) ], FreeCoinsForm.prototype, "mBtnIconSp", void 0);
      __decorate([ property(cc.Label) ], FreeCoinsForm.prototype, "mBtnTF", void 0);
      __decorate([ property(cc.SpriteFrame) ], FreeCoinsForm.prototype, "mBtnIconArr", void 0);
      FreeCoinsForm = __decorate([ ccclass ], FreeCoinsForm);
      return FreeCoinsForm;
    }(UIFormLogic_1.default);
    exports.default = FreeCoinsForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  GameDataMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4440tEM/BE8YNfNSfXBiWh", "GameDataMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../../NFramework/Base/BaseInstance");
    var NF_1 = require("../../NFramework/NF");
    var GameDataMgr = function(_super) {
      __extends(GameDataMgr, _super);
      function GameDataMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mDatas = {};
        return _this;
      }
      GameDataMgr.prototype.setData = function(key, value) {
        NF_1.default.Debug.Log(">>> setData ", key, value);
        this.mDatas[key] = value;
      };
      GameDataMgr.prototype.getData = function(key, def) {
        if (null != this.mDatas[key]) {
          NF_1.default.Debug.Log(">>> getData", key, this.mDatas[key]);
          return this.mDatas[key];
        }
        NF_1.default.Debug.Log(">>> ", key, def);
        return def;
      };
      GameDataMgr.prototype.clear = function() {
        this.mDatas = {};
      };
      return GameDataMgr;
    }(BaseInstance_1.default);
    exports.default = GameDataMgr;
    cc._RF.pop();
  }, {
    "../../NFramework/Base/BaseInstance": "BaseInstance",
    "../../NFramework/NF": "NF"
  } ],
  GameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c34en4qTJE/pmoxsKiy2F7", "GameData");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("./NFramework/NF");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DefaultConfig = function() {
      function DefaultConfig() {}
      DefaultConfig.prototype.loadByJsonAsset = function(ja) {
        var json = {};
        var tmp = ja.json;
        tmp.forEach(function(item) {
          json[item.Id] = item.Value;
        });
        this.fakeModeMatchMin = parseInt(json.Match_time_a);
        this.fakeModeMatchMax = parseInt(json.Match_time_b);
        this.fakeModeRefreshBase = parseInt(json.Mode_entrance_a);
        this.fakeModeRefreshCD = parseInt(json.Mode_entrance_cd);
        this.fakeModeBidDelay = parseInt(json.Bid_time_b);
        this.fakeModeSecDiscardDelay = parseInt(json.Dealer_time_b);
        this.fakeModeFirDiscardDelay = parseInt(json.Player_time_b);
        this.fakeModeBotOfflineY = parseInt(json.Change_bot_odds1);
        this.fakeModeBotOfflineZ = parseInt(json.Change_bot_odds2);
      };
      return DefaultConfig;
    }();
    var GameData = function(_super) {
      __extends(GameData, _super);
      function GameData() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.jsonCfg = null;
        _this.headUrl = [];
        _this.mBg = [];
        _this.mCard = [];
        _this.RoomNumber = 0;
        _this.fakeNames = [];
        _this.fakeHead = [];
        _this.cfg = null;
        _this.count = 0;
        _this.eventList = [];
        _this.tmpList = [];
        _this.timeCountSec = 0;
        return _this;
      }
      GameData_1 = GameData;
      GameData.prototype.onLoad = function() {
        cc.game.addPersistRootNode(this.node);
        cc.game.on(cc.game.EVENT_HIDE, function() {
          GameData_1.OnApplicationPause(true);
        }, this);
        cc.game.on(cc.game.EVENT_SHOW, function() {
          GameData_1.OnApplicationPause(false);
        }, this);
      };
      GameData.OnApplicationPause = function(pause) {
        pause || NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Licensing);
      };
      GameData.prototype.start = function() {
        this.cfg = new DefaultConfig();
        this.loadCfg();
      };
      GameData.prototype.loadCfg = function() {
        this.cfg.loadByJsonAsset(this.jsonCfg);
      };
      GameData.prototype.getFakeModeMatchTime = function() {
        var delay = RandomCardLogic_1.default.GetInstance().random(this.cfg.fakeModeMatchMin, this.cfg.fakeModeMatchMax);
        return delay;
      };
      GameData.prototype.getFakeModeRefreshCD = function() {
        return this.cfg.fakeModeRefreshCD;
      };
      GameData.prototype.getFakeModeRefreshInfo = function() {
        var A = this.cfg.fakeModeRefreshBase;
        var B = RandomCardLogic_1.default.GetInstance().random(0, 5);
        var C = RandomCardLogic_1.default.GetInstance().random(0, 10);
        var D = RandomCardLogic_1.default.GetInstance().random(0, 10);
        var players = A + 100 * B + 10 * C + D;
        var games = A - 100 * B - 10 * C - D;
        return {
          players: players,
          games: games
        };
      };
      GameData.prototype.getFakeModeBotOfflineY = function() {
        var r = RandomCardLogic_1.default.GetInstance().random(0, 100);
        if (r > this.cfg.fakeModeBotOfflineY - 1) return false;
        return true;
      };
      GameData.prototype.getFakeModeBotOfflineZ = function() {
        var r = RandomCardLogic_1.default.GetInstance().random(0, 100);
        if (r > this.cfg.fakeModeBotOfflineZ - 1) return false;
        return true;
      };
      GameData.prototype.getFakeModeBidDelay = function() {
        return RandomCardLogic_1.default.GetInstance().random(0, this.cfg.fakeModeBidDelay);
      };
      GameData.prototype.getFakeModeFirDiscardDelay = function() {
        return RandomCardLogic_1.default.GetInstance().random(0, this.cfg.fakeModeFirDiscardDelay);
      };
      GameData.prototype.getFakeModeSecDiscardDelay = function() {
        return RandomCardLogic_1.default.GetInstance().random(0, this.cfg.fakeModeSecDiscardDelay);
      };
      GameData.prototype.getTimeCountSec = function() {
        return this.timeCountSec;
      };
      GameData.prototype.sendEvent = function(event) {
        this.eventList.push(event);
      };
      GameData.prototype.sendEventToMobile = function(event) {
        if (cc.sys.isNative) PlatformMgr_1.default.GetInstance().OnEventCount(event); else {
          cc.log("Event Send: " + event);
          this.tmpList.push(event);
        }
      };
      GameData.prototype.doEvent = function() {
        this.eventList.length > 0 && this.sendEventToMobile(this.eventList.shift());
      };
      GameData.prototype.showTmpEventList = function() {
        cc.log(this.tmpList);
      };
      GameData.prototype.update = function() {
        this.count++;
        if (this.count >= 60) {
          this.timeCountSec++;
          this.count = 0;
          this.doEvent();
        }
      };
      var GameData_1;
      __decorate([ property(cc.JsonAsset) ], GameData.prototype, "jsonCfg", void 0);
      __decorate([ property(cc.SpriteFrame) ], GameData.prototype, "headUrl", void 0);
      __decorate([ property(cc.SpriteFrame) ], GameData.prototype, "mBg", void 0);
      __decorate([ property(cc.SpriteFrame) ], GameData.prototype, "mCard", void 0);
      GameData = GameData_1 = __decorate([ ccclass ], GameData);
      return GameData;
    }(cc.Component);
    exports.default = GameData;
    cc._RF.pop();
  }, {
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/NF": "NF",
    "./Platform/PlatformMgr": "PlatformMgr",
    "./RandomCardLogic": "RandomCardLogic"
  } ],
  GameEntry: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "babe25LTSVKJowHZyWAHiZ7", "GameEntry");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var NFConstant_1 = require("../../NFramework/Definition/NFConstant");
    var NF_1 = require("../../NFramework/NF");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var PlayerMgr_1 = require("./PlayerMgr");
    var UIComponentMgr_1 = require("./UIComponentMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameEntry = function(_super) {
      __extends(GameEntry, _super);
      function GameEntry() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameEntry_1 = GameEntry;
      GameEntry.prototype.onLoad = function() {
        PlatformMgr_1.default.GetInstance().InitData();
        if (GameEntry_1.UI) GameEntry_1.UI.OpenUIForm(GameEnum_1.UIFormId.HomeForm); else {
          NF_1.default.Init();
          NF_1.default.Audio.SetMusicMute(NF_1.default.Storage.GetBool(NFConstant_1.default.AudioMusicMuteKey, true));
          GameEntry_1.UI = cc.find("UI").getComponent(UIComponentMgr_1.default);
          cc.loader.loadResDir("cards", function(err, pics) {
            var _this = this;
            err && cc.log(err);
            NF_1.default.DataTables.LoadDataTables("DataTabels", function(loaded) {
              if (loaded) {
                _this.OnInit();
                _this.OpenHome();
              }
            });
          }.bind(this));
        }
      };
      GameEntry.prototype.OnInit = function() {
        PlatformMgr_1.default.GetInstance().CheckSubs();
        PlayerMgr_1.default.Instance.Init();
        cc.game.on(cc.game.EVENT_HIDE, function() {
          GameEntry_1.OnApplicationPause(true);
        }, this);
        cc.game.on(cc.game.EVENT_SHOW, function() {
          GameEntry_1.OnApplicationPause(false);
        }, this);
        NF_1.default.Platform.InitSdk(1);
      };
      GameEntry.prototype.OpenHome = function() {
        GameEntry_1.UI.OpenUIForm(GameEnum_1.UIFormId.HomeForm);
        var frist = NF_1.default.Storage.GetBool("FristLaunch", true);
        if (frist) {
          NF_1.default.Storage.SetBool("FristLaunch", false);
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Start_frist);
        } else PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Start_normal, "Save_Time", NF_1.default.Time.GetCurrentTimeMillis() - this.startTimes);
      };
      GameEntry.OnApplicationPause = function(pause) {
        pause || PlayerMgr_1.default.Instance.EventNet();
      };
      var GameEntry_1;
      GameEntry = GameEntry_1 = __decorate([ ccclass ], GameEntry);
      return GameEntry;
    }(cc.Component);
    exports.default = GameEntry;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/Definition/NFConstant": "NFConstant",
    "../../NFramework/NF": "NF",
    "../../Platform/PlatformMgr": "PlatformMgr",
    "./PlayerMgr": "PlayerMgr",
    "./UIComponentMgr": "UIComponentMgr"
  } ],
  GameEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46273/YzqxCqaamXD+YCs7C", "GameEnum");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EnumNotify = exports.FormGrop = exports.UIFormId = void 0;
    var UIFormId;
    (function(UIFormId) {
      UIFormId[UIFormId["HomeForm"] = 10001] = "HomeForm";
      UIFormId[UIFormId["FakeGameForm"] = 10002] = "FakeGameForm";
      UIFormId[UIFormId["HeadSelectForm"] = 10003] = "HeadSelectForm";
      UIFormId[UIFormId["FreeCoinsForm"] = 10004] = "FreeCoinsForm";
      UIFormId[UIFormId["TurntableForm"] = 10005] = "TurntableForm";
      UIFormId[UIFormId["SettingForm"] = 10006] = "SettingForm";
      UIFormId[UIFormId["GiveScoreForm"] = 10007] = "GiveScoreForm";
      UIFormId[UIFormId["SelectRoomForm"] = 10008] = "SelectRoomForm";
      UIFormId[UIFormId["WifiOpenForm"] = 10009] = "WifiOpenForm";
      UIFormId[UIFormId["BidModelStartForm"] = 10010] = "BidModelStartForm";
      UIFormId[UIFormId["BidModelHelpForm"] = 10011] = "BidModelHelpForm";
      UIFormId[UIFormId["GameForm"] = 20001] = "GameForm";
      UIFormId[UIFormId["ExitForm"] = 20002] = "ExitForm";
      UIFormId[UIFormId["LevelUpForm"] = 20003] = "LevelUpForm";
      UIFormId[UIFormId["SeeCardAdForm"] = 20004] = "SeeCardAdForm";
      UIFormId[UIFormId["SeeCardBuyForm"] = 20005] = "SeeCardBuyForm";
      UIFormId[UIFormId["BidForm"] = 20006] = "BidForm";
      UIFormId[UIFormId["ScoreBoardForm"] = 20007] = "ScoreBoardForm";
      UIFormId[UIFormId["RewardForm"] = 30001] = "RewardForm";
      UIFormId[UIFormId["TipsForm"] = 30002] = "TipsForm";
      UIFormId[UIFormId["NFBannerForm"] = 30003] = "NFBannerForm";
      UIFormId[UIFormId["NFNativeBannerForm"] = 30004] = "NFNativeBannerForm";
      UIFormId[UIFormId["ShopForm"] = 40001] = "ShopForm";
      UIFormId[UIFormId["ShopPreviewForm"] = 40002] = "ShopPreviewForm";
      UIFormId[UIFormId["ShopResultForm"] = 40003] = "ShopResultForm";
      UIFormId[UIFormId["ShopFreeTrialForm"] = 40004] = "ShopFreeTrialForm";
      UIFormId[UIFormId["ShopDiscountForm"] = 40005] = "ShopDiscountForm";
    })(UIFormId = exports.UIFormId || (exports.UIFormId = {}));
    var FormGrop;
    (function(FormGrop) {
      FormGrop["FG_Default"] = "Default";
      FormGrop["FG_Middle"] = "Middle";
      FormGrop["FG_Top"] = "Top";
      FormGrop["FG_TopTop"] = "TopTop";
    })(FormGrop = exports.FormGrop || (exports.FormGrop = {}));
    var EnumNotify;
    (function(EnumNotify) {
      EnumNotify["Init_Game"] = "Init_Game";
      EnumNotify["EN_Refresh_Gold"] = "Refresh_Gold";
      EnumNotify["EN_Refresh_HomeFreeCoins"] = "Refresh_HomeFreeCoins";
      EnumNotify["EN_Refresh_HomeTurnTable"] = "Refresh_HomeTurnTable";
      EnumNotify["EN_Refresh_WearSkin"] = "EN_Refresh_WearSkin";
      EnumNotify["EN_Refresh_Shop"] = "EN_Refresh_Shop";
      EnumNotify["EN_Refresh_Shop_RedPoint"] = "EN_Refresh_Shop_RedPoint";
      EnumNotify["EN_Return_ShopPayCallBack"] = "Return_ShopPayCallBack";
      EnumNotify["EN_Game_Replay"] = "EN_Game_Replay";
      EnumNotify["EN_Game_UpdateNoteCardTime"] = "EN_Game_UpdateNoteCardTime";
      EnumNotify["Game_Change_Name"] = "Game_Change_Name";
      EnumNotify["Game_Change_Head"] = "Game_Change_Head";
      EnumNotify["Game_Licensing"] = "Game_Licensing";
      EnumNotify["Game_CompleteBid"] = "Game_CompleteBid";
      EnumNotify["Game_RefreshScore"] = "Game_RefreshScore";
      EnumNotify["Inter_Day_Event"] = "Inter_Day_Event";
      EnumNotify["ABTest_Event"] = "ABTest_Event";
      EnumNotify["Game_PrePare"] = "Game_PrePare";
      EnumNotify["AD_Status"] = "AD_Status";
    })(EnumNotify = exports.EnumNotify || (exports.EnumNotify = {}));
    cc._RF.pop();
  }, {} ],
  GameHeadItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16d1e3VE5xG7aau2Why+ETE", "GameHeadItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BidBoard_1 = require("./BidBoard");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameHeadItem = function(_super) {
      __extends(GameHeadItem, _super);
      function GameHeadItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mName = null;
        _this.mBid = null;
        _this.mHeadNode = null;
        _this.mHeadIcon = null;
        _this.mProTF = null;
        _this.mrankNode = null;
        _this.gameData = null;
        return _this;
      }
      GameHeadItem.prototype.SetName = function(str) {
        this.mName.string = str;
      };
      GameHeadItem.prototype.SetHead = function(headId) {
        if (null == this.gameData) {
          var gameData = cc.find("GameData").getComponent("GameData");
          this.gameData = gameData;
        }
        this.mHeadIcon.spriteFrame = this.gameData.headUrl[headId];
        this.mProTF.node.active = false;
      };
      GameHeadItem.prototype.SetBid = function(bid) {
        this.mBid.setBid(bid);
      };
      GameHeadItem.prototype.setScore = function(s) {
        this.mBid.setScore(s);
      };
      GameHeadItem.prototype.clear = function() {
        this.mBid.clear();
      };
      GameHeadItem.prototype.isWin = function() {
        return this.mBid.isWin();
      };
      GameHeadItem.prototype.SetShow = function(idx, b) {
        var s = 1;
        var v3;
        if (b) {
          this.mProTF.node.active = true;
          this.mProTF.fillRange = 1;
          s = 1;
        } else {
          this.mProTF.node.active = false;
          this.mProTF.fillRange = 0;
          s = .75;
        }
        switch (idx) {
         case 0:
          v3 = cc.v3(this.mHeadNode.x, b ? 9 : 0);
          break;

         case 1:
          v3 = cc.v3(b ? -9 : 0, this.mHeadNode.y);
          break;

         case 2:
          v3 = cc.v3(this.mHeadNode.x, b ? -9 : 0);
          break;

         case 3:
          v3 = cc.v3(b ? 9 : 0, this.mHeadNode.y);
        }
        cc.tween(this.mHeadNode).to(.3, {
          scale: s,
          position: v3
        }).start();
      };
      __decorate([ property(cc.Label) ], GameHeadItem.prototype, "mName", void 0);
      __decorate([ property(BidBoard_1.default) ], GameHeadItem.prototype, "mBid", void 0);
      __decorate([ property(cc.Node) ], GameHeadItem.prototype, "mHeadNode", void 0);
      __decorate([ property(cc.Sprite) ], GameHeadItem.prototype, "mHeadIcon", void 0);
      __decorate([ property(cc.Sprite) ], GameHeadItem.prototype, "mProTF", void 0);
      __decorate([ property(cc.Sprite) ], GameHeadItem.prototype, "mrankNode", void 0);
      GameHeadItem = __decorate([ ccclass ], GameHeadItem);
      return GameHeadItem;
    }(cc.Component);
    exports.default = GameHeadItem;
    cc._RF.pop();
  }, {
    "./BidBoard": "BidBoard"
  } ],
  GameMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "026b4xht/FFs7ANEGdcVQ4u", "GameMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../../NFramework/Base/BaseInstance");
    var dc = require("../../Definition/Constant/DefineConfig");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameMgr = function(_super) {
      __extends(GameMgr, _super);
      function GameMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.DealTimes = .04;
        _this.DiscardSpeed = .2;
        _this.RecoveryTimes = .4;
        _this.IsDeposit = false;
        _this.turnCount = 0;
        _this.mGameState = dc.GameState.None;
        _this.mCurrRound = 0;
        _this.mWinOrLose = [];
        _this.mThinkUpper = [ 1, 2 ];
        _this.mThinkUpper2 = [ 2, 3 ];
        _this.mCountDown = 0;
        _this.mRoundMax = 5;
        return _this;
      }
      Object.defineProperty(GameMgr.prototype, "CuttGameModel", {
        get: function() {
          return this.mGameModel;
        },
        set: function(model) {
          this.mGameModel = model;
        },
        enumerable: false,
        configurable: true
      });
      GameMgr.prototype.getIsDeposit = function() {
        return this.IsDeposit;
      };
      GameMgr.prototype.setIsDeposit = function(b) {
        this.IsDeposit = b;
      };
      GameMgr.prototype.setTurnCount = function(isResetting) {
        void 0 === isResetting && (isResetting = false);
        isResetting ? this.turnCount = 0 : this.turnCount += 1;
      };
      GameMgr.prototype.getTurnCount = function() {
        return this.turnCount;
      };
      Object.defineProperty(GameMgr.prototype, "GameState", {
        get: function() {
          return this.mGameState;
        },
        set: function(state) {
          this.mGameState = state;
        },
        enumerable: false,
        configurable: true
      });
      GameMgr.prototype.SetCurrRound = function(round) {
        this.mCurrRound = round;
      };
      GameMgr.prototype.GetCurrRound = function() {
        return this.mCurrRound;
      };
      Object.defineProperty(GameMgr.prototype, "WinOrLose", {
        get: function() {
          return this.mWinOrLose;
        },
        enumerable: false,
        configurable: true
      });
      GameMgr.prototype.SetWinOrLose = function(arr) {
        this.mWinOrLose = [];
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i][0];
          this.mWinOrLose.push(element > 0);
        }
      };
      Object.defineProperty(GameMgr.prototype, "CountDown", {
        get: function() {
          return this.mCountDown;
        },
        set: function(s) {
          this.mCountDown = s;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GameMgr.prototype, "OnlineCurRoomInfo", {
        get: function() {
          return this.mOnlineCurRoomInfo;
        },
        set: function(value) {
          this.mOnlineCurRoomInfo = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GameMgr.prototype, "RoundMax", {
        get: function() {
          return this.mRoundMax;
        },
        set: function(value) {
          this.mRoundMax = value;
        },
        enumerable: false,
        configurable: true
      });
      GameMgr = __decorate([ ccclass ], GameMgr);
      return GameMgr;
    }(BaseInstance_1.default);
    exports.default = GameMgr;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../NFramework/Base/BaseInstance": "BaseInstance"
  } ],
  GiveScoreForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8bd0BP3n5IbqgzhX+EY+yz", "GiveScoreForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GiveScoreForm = function(_super) {
      __extends(GiveScoreForm, _super);
      function GiveScoreForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ndStars = null;
        _this.ndTips = null;
        return _this;
      }
      GiveScoreForm.prototype.start = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Appraise_Appear);
        cc.sys.localStorage.setItem("GiveScore", "Show");
      };
      GiveScoreForm.prototype.onEnable = function() {
        this.ndTips.active = false;
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
      };
      GiveScoreForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      GiveScoreForm.prototype.btnStar = function(event, idx) {
        var _this = this;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Appraise_OK, "Grade", idx);
        var idxs = Number(idx);
        for (var i = 0; i < 5; i++) {
          var child = this.ndStars.getChildByName("BtnStar" + (i + 1));
          var button = child.getComponent(cc.Button);
          i < idxs ? button.interactable = false : button.enabled = false;
        }
        if (idxs < 3) {
          this.ndTips.active = true;
          cc.tween(this.ndTips).by(.5, {
            position: cc.v3(0, 120)
          }).delay(.2).call(function() {
            _super.prototype.Close.call(_this);
          }).start();
        } else {
          PlatformMgr_1.default.GetInstance().OnEventCount("OpenGPStore");
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SubmittedScore);
          _super.prototype.Close.call(this);
        }
      };
      GiveScoreForm.prototype.btnClose = function() {
        _super.prototype.Close.call(this);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Appraise_Close);
      };
      __decorate([ property(cc.Node) ], GiveScoreForm.prototype, "ndStars", void 0);
      __decorate([ property(cc.Node) ], GiveScoreForm.prototype, "ndTips", void 0);
      GiveScoreForm = __decorate([ ccclass ], GiveScoreForm);
      return GiveScoreForm;
    }(UIFormLogic_1.default);
    exports.default = GiveScoreForm;
    cc._RF.pop();
  }, {
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  HeadItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23613magPdPz6uq7bS39K78", "HeadItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var dc = require("../Definition/Constant/DefineConfig");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NF_1 = require("../NFramework/NF");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadItem = function(_super) {
      __extends(HeadItem, _super);
      function HeadItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mName = null;
        _this.mHead = null;
        _this.gameData = null;
        return _this;
      }
      HeadItem.prototype.onDisable = function() {
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      HeadItem.prototype.SetView = function() {
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_Change_Name, this.SetName, this);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_Change_Head, this.SetHead, this);
        this.SetName();
        this.SetHead();
      };
      HeadItem.prototype.SetName = function() {
        var namestr = cc.sys.localStorage.getItem(dc.LocalStorageKey.MyName);
        namestr || cc.sys.localStorage.setItem(dc.LocalStorageKey.MyName, "Player");
        namestr = namestr || "Player";
        this.mName.string = namestr;
      };
      HeadItem.prototype.SetHead = function() {
        if (null == this.gameData) {
          var gameData = cc.find("GameData").getComponent("GameData");
          this.gameData = gameData;
        }
        var Headid = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
        this.mHead.spriteFrame = this.gameData.headUrl[Headid];
      };
      HeadItem.prototype.onBtnClick = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.HeadSelectForm);
      };
      __decorate([ property(cc.Label) ], HeadItem.prototype, "mName", void 0);
      __decorate([ property(cc.Sprite) ], HeadItem.prototype, "mHead", void 0);
      HeadItem = __decorate([ ccclass ], HeadItem);
      return HeadItem;
    }(cc.Component);
    exports.default = HeadItem;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr"
  } ],
  HeadSelectForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9678AldlxF/oiS1diuMJgf", "HeadSelectForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dc = require("../Definition/Constant/DefineConfig");
    var NF_1 = require("../NFramework/NF");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var ScrollList_1 = require("../NFramework/Util/UI/Scroll/ScrollList");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeadSelectForm = function(_super) {
      __extends(HeadSelectForm, _super);
      function HeadSelectForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mInputName = null;
        _this.mList = null;
        _this.gameData = null;
        _this.pattern_Ch = new RegExp("[\u4e00-\u9fa5]");
        return _this;
      }
      HeadSelectForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      HeadSelectForm.prototype.onEnable = function() {};
      HeadSelectForm.prototype.onDisable = function() {};
      HeadSelectForm.prototype.OnOpen = function(param) {
        var _this = this;
        _super.prototype.OnOpen.call(this, param);
        NF_1.default.Audio.Play(2);
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        var namestr = cc.sys.localStorage.getItem(dc.LocalStorageKey.MyName);
        namestr || cc.sys.localStorage.setItem(dc.LocalStorageKey.MyName, "Player");
        namestr = namestr || "Player";
        this.mInputName.placeholder = namestr;
        this.mList.SetClickCallback(function(item, index) {
          if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
          _this.setSelect(_this.mClickItem, false);
          _this.setSelect(item, true);
          _this.mClickItem = item;
          _this.mHeadIndex = index;
        });
        this.mList.SetRenderCallback(function(item, index) {
          var headicon = item.getChildByName("headicon").getComponent(cc.Sprite);
          headicon.spriteFrame = _this.gameData.headUrl[index];
          var headid = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
          _this.setSelect(item, headid == index);
          if (headid == index) {
            _this.mClickItem = item;
            _this.mHeadIndex = index;
          }
        });
        this.mList.setData([ 0, 1, 2, 3, 4, 5, 6, 7 ]);
      };
      HeadSelectForm.prototype.setSelect = function(node, isactive) {
        var SelectBg = node.getChildByName("SelectBg");
        SelectBg.active = isactive;
      };
      HeadSelectForm.prototype.onBtnClick = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (this.mInputName.string) {
          cc.sys.localStorage.setItem(dc.LocalStorageKey.MyName, this.mInputName.string);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Change_Name);
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Player_Name_Change, "Name", this.mInputName.string);
        }
        var headid = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
        if (this.mHeadIndex != headid) {
          NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.PlayerHead, this.mHeadIndex);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Change_Head);
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Player_Avatar_Change, "Head", this.mHeadIndex.toString());
        }
        this.mInputName.string = "";
        this.Close();
      };
      HeadSelectForm.prototype.TextChange = function() {
        var count = 0;
        var danci = 0;
        var str = "";
        for (var index = 0; index < this.mInputName.string.length; index++) {
          var element = this.mInputName.string[index];
          this.pattern_Ch.test(element) ? count += 2 : danci += 1;
          var val = 12 - danci - count;
          if (val < 0) {
            this.mInputName.blur();
            break;
          }
          str += this.mInputName.string[index];
        }
        this.mInputName.string = str;
        console.log(">>>>>>>" + this.mInputName.string + ">>>>" + str);
      };
      __decorate([ property(cc.EditBox) ], HeadSelectForm.prototype, "mInputName", void 0);
      __decorate([ property(ScrollList_1.default) ], HeadSelectForm.prototype, "mList", void 0);
      HeadSelectForm = __decorate([ ccclass ], HeadSelectForm);
      return HeadSelectForm;
    }(UIFormLogic_1.default);
    exports.default = HeadSelectForm;
    cc._RF.pop();
  }, {
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../NFramework/Util/UI/Scroll/ScrollList": "ScrollList",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  HomeForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a18f4glQEhHjrbQMlm07F3Y", "HomeForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var NF_1 = require("./NFramework/NF");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var HeadItem_1 = require("./Home/HeadItem");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var SkinMgr_1 = require("./Common/Mgr/SkinMgr");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HomeForm = function(_super) {
      __extends(HomeForm, _super);
      function HomeForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labVer = null;
        _this.mLabGold = null;
        _this.mLabExp = null;
        _this.mLabLv = null;
        _this.mLabTime = null;
        _this.mSpriteExp = null;
        _this.mSpriteFreeCoinsRed = null;
        _this.mSpriteTurntableRed = null;
        _this.mSpriteShopRed = null;
        _this.mBtnStop = null;
        _this.mBtnShopCoin = null;
        _this.mBtnGameMore = null;
        _this.mSpriteRound5 = null;
        _this.mSpriteRound3 = null;
        _this.mShopSpine = null;
        _this.mBidBtn = null;
        _this.gameData = null;
        _this.mHeadItem = null;
        _this.mDealTimes = null;
        _this.mDiscardSpeed = null;
        _this.mRecoveryTimes = null;
        _this.sanS = null;
        _this.qiS = null;
        _this.mNodeBox = null;
        return _this;
      }
      HomeForm.prototype.Application = function() {
        GameMgr_1.default.GetInstance().DealTimes = "" != this.mDealTimes.string ? Number(this.mDealTimes.string) : GameMgr_1.default.GetInstance().DealTimes;
        GameMgr_1.default.GetInstance().DiscardSpeed = "" != this.mDiscardSpeed.string ? Number(this.mDiscardSpeed.string) : GameMgr_1.default.GetInstance().DiscardSpeed;
        GameMgr_1.default.GetInstance().RecoveryTimes = "" != this.mRecoveryTimes.string ? Number(this.mRecoveryTimes.string) : GameMgr_1.default.GetInstance().RecoveryTimes;
        var arr = this.sanS.string.split(",");
        GameMgr_1.default.GetInstance().mThinkUpper2 = "" != this.sanS.string ? [ Number(arr[0]), Number(arr[1]) ] : GameMgr_1.default.GetInstance().mThinkUpper2;
        var arr2 = this.qiS.string.split(",");
        GameMgr_1.default.GetInstance().mThinkUpper = "" != this.qiS.string ? [ Number(arr2[0]), Number(arr2[1]) ] : GameMgr_1.default.GetInstance().mThinkUpper;
        this.mDealTimes.string = "";
        this.mDiscardSpeed.string = "";
        this.mRecoveryTimes.string = "";
        this.sanS.string = "";
        this.qiS.string = "";
        this.mDealTimes.placeholder = "\u5f53\u524d\u53d1\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().DealTimes;
        this.mDiscardSpeed.placeholder = "\u5f53\u524d\u51fa\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().DiscardSpeed;
        this.mRecoveryTimes.placeholder = "\u5f53\u524d\u6536\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().RecoveryTimes;
        this.sanS.placeholder = GameMgr_1.default.GetInstance().mThinkUpper2[0] + "," + GameMgr_1.default.GetInstance().mThinkUpper2[1];
        this.qiS.placeholder = GameMgr_1.default.GetInstance().mThinkUpper[0] + "," + GameMgr_1.default.GetInstance().mThinkUpper[1];
      };
      HomeForm.prototype.onSkinBtn = function() {
        SkinMgr_1.default.GetInstance().ProduceDiscountData(true);
      };
      HomeForm.prototype.start = function() {
        cc.director.preloadScene("SingleGame");
        PlatformMgr_1.default.GetInstance().hideNativeSplash();
      };
      HomeForm.prototype.OnOpen = function(param) {
        var _this = this;
        _super.prototype.OnOpen.call(this, param);
        this.mBidBtn.node.active = false;
        if (PlayerMgr_1.default.Instance.PlayerData.mGameCount >= 1) {
          this.mBidBtn.node.active = true;
          var track = this.mBidBtn.setAnimation(0, "open", false);
          track && this.mBidBtn.setCompleteListener(function(trackEntry, loopCount) {
            trackEntry && setTimeout(function() {
              _this.mBidBtn.setAnimation(0, "loop", false);
            }, 1500);
          });
        }
        this.mNodeBox.active = false;
        if (cc.sys.OS_WINDOWS === cc.sys.os) {
          this.mDealTimes.placeholder = "\u5f53\u524d\u53d1\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().DealTimes;
          this.mDiscardSpeed.placeholder = "\u5f53\u524d\u51fa\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().DiscardSpeed;
          this.mRecoveryTimes.placeholder = "\u5f53\u524d\u6536\u724c\u65f6\u95f4" + GameMgr_1.default.GetInstance().RecoveryTimes;
        }
        SkinMgr_1.default.GetInstance().ProduceDiscountData(true);
        var gameData = cc.find("GameData").getComponent("GameData");
        this.mHeadItem.SetView();
        this.gameData = gameData;
        this.btnShowBannerAd();
        this.RefreshPlayerInfo();
        this.RefreshFreeCoinsNode();
        this.RefreshTurntableNode();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.HomePage);
        PlayerMgr_1.default.Instance.mBitPageNum = 1;
        PlayerMgr_1.default.Instance.mSumScorePageNum = 1;
        PlayerMgr_1.default.Instance.mOnlineBitPageNum = 1;
        PlayerMgr_1.default.Instance.mOnlineSumScorePageNum = 1;
        NF_1.default.Audio.Play(10001);
        this.ShowDayBtn();
        GameMgr_1.default.GetInstance().RoundMax = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.RoundMaxKey, DefineConfig_1.GameRound.Fire);
        this.mSpriteRound3.node.active = GameMgr_1.default.GetInstance().RoundMax == DefineConfig_1.GameRound.Three;
        this.mSpriteRound5.node.active = GameMgr_1.default.GetInstance().RoundMax == DefineConfig_1.GameRound.Fire;
        var win = NF_1.default.Storage.GetBool("GiveScoreEndWin");
        if (win) {
          var name = cc.sys.localStorage.getItem("GiveScore");
          name || GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.GiveScoreForm);
        }
        this.PlaySpine();
      };
      HomeForm.prototype.PlaySpine = function() {
        var _this = this;
        var track = this.mShopSpine.setAnimation(0, "ui_shop", false);
        track && this.mShopSpine.setCompleteListener(function(trackEntry, loopCount) {
          setTimeout(function() {
            _this.PlaySpine();
          }, 1e3);
        });
      };
      HomeForm.prototype.onEnable = function() {
        this.mSpriteExpWidth = this.mSpriteExp.node.getContentSize().width;
        PlatformMgr_1.default.GetInstance().IsTranssion();
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        this.mBtnShopCoin.node.active = show;
        this.mBtnGameMore.node.active = show;
        this.loadVersion();
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Gold, this.RefreshGold, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.Inter_Day_Event, this.ShowDayBtn, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_HomeFreeCoins, this.RefreshFreeCoinsNode, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_HomeTurnTable, this.RefreshTurntableNode, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint, this.RefreshShopRedPoint, this);
        var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
        var endTime = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.SkuTime + info.mPayId, 0);
        var nowTime = new Date().getTime();
        endTime > nowTime && GameDataMgr_1.default.GetInstance().setData("SkuEffective" + info.mPayId, 1);
        this.RefreshShopRedPoint(false);
      };
      HomeForm.prototype.onDisable = function() {
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.EN_Refresh_Gold, this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.EN_Refresh_HomeFreeCoins, this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.EN_Refresh_HomeTurnTable, this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.Inter_Day_Event, this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.ABTest_Event, this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint, this);
      };
      HomeForm.prototype.RefreshShopRedPoint = function(isClick) {
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        if (show) {
          var DayBtnClick = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick);
          this.mSpriteShopRed.node.active = isClick ? !DayBtnClick : null != item || !DayBtnClick;
        } else isClick ? this.mSpriteShopRed.node.active = false : null != item && (this.mSpriteShopRed.node.active = true);
      };
      HomeForm.prototype.ShowDayBtn = function() {
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        item && -1 != SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(item.SkinId) && SkinMgr_1.default.GetInstance().ProduceDiscountData(true, true);
      };
      HomeForm.prototype.btnRandomGame = function(event) {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.OnlinePlay, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.SelectRoomForm);
      };
      HomeForm.prototype.RefreshPlayerInfo = function() {
        var lv = PlayerMgr_1.default.Instance.PlayerData.mLv;
        this.mLabLv.string = lv.toString();
        if (lv >= PlayerMgr_1.default.Instance.MaxLv) {
          this.mSpriteExp.node.width = this.mSpriteExpWidth;
          this.mLabExp.string = "MAX";
        } else {
          var exp = PlayerMgr_1.default.Instance.PlayerData.mExp;
          var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", lv);
          this.mLabExp.string = exp + "/" + lvInfo.mExp;
          var percent = PlayerMgr_1.default.Instance.PlayerData.mExp / lvInfo.mExp;
          this.mSpriteExp.node.width = this.mSpriteExpWidth * percent;
        }
        this.RefreshGold();
      };
      HomeForm.prototype.RefreshGold = function() {
        this.mLabGold.string = NF_1.default.String.ToBigNumberString(PlayerMgr_1.default.Instance.PlayerData.mGold);
      };
      HomeForm.prototype.btnShowBannerAd = function() {
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      HomeForm.prototype.btnHideBannerAd = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      HomeForm.prototype.btnShowInterstitialAd = function() {
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_001");
      };
      HomeForm.prototype.loadVersion = function() {
        var mStrDebug = "";
        DefineConfig_1.DebugFlag && (mStrDebug = "       Debug");
        this.labVer.string = "v" + PlatformMgr_1.default.GetInstance().GetAndroidVersionName() + mStrDebug;
      };
      HomeForm.prototype.btnSingleGame = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SinglePlay, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        PlayerMgr_1.default.Instance.mIsGameSingle = true;
        this.btnHideBannerAd();
        GameMgr_1.default.GetInstance().CuttGameModel = DefineConfig_1.GameModel.Ordinary;
        _super.prototype.Close.call(this);
        cc.director.loadScene("SingleGame");
      };
      HomeForm.prototype.onBidClick = function() {
        var net = PlatformMgr_1.default.GetInstance().GetNetwork();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Click);
        if ("none" != net) GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.BidModelStartForm); else {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_NotOnline);
          NF_1.default.Storage.SetBool("GameIsOpenNet", false);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.WifiOpenForm);
        }
      };
      HomeForm.prototype.btnDebug = function() {
        this.gameData.showTmpEventList();
      };
      HomeForm.prototype.exitGame = function() {
        cc.game.end();
      };
      HomeForm.prototype.OnBtnFreeGold = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.FreeCoin);
        var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay);
        if (freeTimes >= DefineConfig_1.Constant.MaxFreeCoinsPerDay) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Come back tomorrow!");
          return;
        }
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.FreeCoinsForm);
      };
      HomeForm.prototype.RefreshFreeCoinsNode = function() {
        var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay);
        this.mSpriteFreeCoinsRed.node.active = freeTimes < DefineConfig_1.Constant.MaxFreeCoinsPerDay;
      };
      HomeForm.prototype.OnBtnTurntable = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SpinEnter);
        var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
        if (times >= DefineConfig_1.Constant.MaxTurntableTimesPerDay) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Come back tomorrow!");
          return;
        }
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TurntableForm);
      };
      HomeForm.prototype.OnBtnMoreGame = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        NF_1.default.Storage.SetBool("MoreGame", true);
        PlatformMgr_1.default.GetInstance().MoreGame();
      };
      HomeForm.prototype.OnBtnShop = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopClick);
        this.RefreshShopRedPoint(true);
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        if (show) if (item && item.SkinInfo.mTag2) GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, item.SkinInfo.mTag2); else {
          var isclick = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick);
          isclick ? GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 1) : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 3);
        } else item && item.SkinInfo.mTag2 ? GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, item.SkinInfo.mTag2) : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 1);
      };
      HomeForm.prototype.OnBtnShopGold = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopClick);
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 3);
      };
      HomeForm.prototype.OnBtnSetting = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_Set);
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.SettingForm);
      };
      HomeForm.prototype.OnBtnSelect5 = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.FakeGameForm)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Mode5rounds);
        this.mSpriteRound3.node.active = false;
        this.mSpriteRound5.node.active = true;
        GameMgr_1.default.GetInstance().RoundMax = DefineConfig_1.GameRound.Fire;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.RoundMaxKey, DefineConfig_1.GameRound.Fire);
      };
      HomeForm.prototype.OnBtnSelect3 = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.FakeGameForm)) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Mode3rounds);
        this.mSpriteRound3.node.active = true;
        this.mSpriteRound5.node.active = false;
        GameMgr_1.default.GetInstance().RoundMax = DefineConfig_1.GameRound.Three;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.RoundMaxKey, DefineConfig_1.GameRound.Three);
      };
      HomeForm.prototype.RefreshTurntableNode = function() {
        this.mLabTime.node.active = false;
        this.mSpriteTurntableRed.node.active = false;
        var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
        if (times >= DefineConfig_1.Constant.MaxTurntableTimesPerDay) {
          this.unschedule(this.RefreshTurntableTime);
          return;
        }
        var mills = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableMillis);
        if (mills > 0) {
          times = times >= DefineConfig_1.Constant.TurntableCdTime.length ? DefineConfig_1.Constant.TurntableCdTime.length : times;
          this.mSpinInterval = 1e3 * DefineConfig_1.Constant.TurntableCdTime[times - 1] * 60;
          if (NF_1.default.Time.GetCurrentTimeMillis() - mills > this.mSpinInterval) {
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableMillis, 0);
            mills = 0;
          }
        }
        if (mills > 0) {
          this.mLabTime.node.active = true;
          this.RefreshTurntableTime();
          this.schedule(this.RefreshTurntableTime, 1);
        } else {
          this.unschedule(this.RefreshTurntableTime);
          this.mSpriteTurntableRed.node.active = true;
        }
      };
      HomeForm.prototype.RefreshTurntableTime = function() {
        var millis = NF_1.default.Time.GetCurrentTimeMillis() - NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableMillis);
        millis = Math.floor((this.mSpinInterval - millis) / 1e3);
        if (millis < 0) {
          this.RefreshTurntableNode();
          return;
        }
        this.mLabTime.string = NF_1.default.Date.GetMinAndSec(millis);
      };
      __decorate([ property(cc.Label) ], HomeForm.prototype, "labVer", void 0);
      __decorate([ property(cc.Label) ], HomeForm.prototype, "mLabGold", void 0);
      __decorate([ property(cc.Label) ], HomeForm.prototype, "mLabExp", void 0);
      __decorate([ property(cc.Label) ], HomeForm.prototype, "mLabLv", void 0);
      __decorate([ property(cc.Label) ], HomeForm.prototype, "mLabTime", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteExp", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteFreeCoinsRed", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteTurntableRed", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteShopRed", void 0);
      __decorate([ property(cc.Button) ], HomeForm.prototype, "mBtnStop", void 0);
      __decorate([ property(cc.Button) ], HomeForm.prototype, "mBtnShopCoin", void 0);
      __decorate([ property(cc.Button) ], HomeForm.prototype, "mBtnGameMore", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteRound5", void 0);
      __decorate([ property(cc.Sprite) ], HomeForm.prototype, "mSpriteRound3", void 0);
      __decorate([ property(sp.Skeleton) ], HomeForm.prototype, "mShopSpine", void 0);
      __decorate([ property(sp.Skeleton) ], HomeForm.prototype, "mBidBtn", void 0);
      __decorate([ property(HeadItem_1.default) ], HomeForm.prototype, "mHeadItem", void 0);
      __decorate([ property(cc.EditBox) ], HomeForm.prototype, "mDealTimes", void 0);
      __decorate([ property(cc.EditBox) ], HomeForm.prototype, "mDiscardSpeed", void 0);
      __decorate([ property(cc.EditBox) ], HomeForm.prototype, "mRecoveryTimes", void 0);
      __decorate([ property(cc.EditBox) ], HomeForm.prototype, "sanS", void 0);
      __decorate([ property(cc.EditBox) ], HomeForm.prototype, "qiS", void 0);
      __decorate([ property(cc.Node) ], HomeForm.prototype, "mNodeBox", void 0);
      HomeForm = __decorate([ ccclass ], HomeForm);
      return HomeForm;
    }(UIFormLogic_1.default);
    exports.default = HomeForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Common/Mgr/SkinMgr": "SkinMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./Home/HeadItem": "HeadItem",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  JniComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4056npLbRG/Z5M/U8090lG", "JniComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlatformInterface_1 = require("./PlatformInterface");
    var JniComponent = function(_super) {
      __extends(JniComponent, _super);
      function JniComponent(classPath) {
        var _this = _super.call(this) || this;
        _this.mClassPath = "com/nf/service/JniService";
        _this.mNFClassPath = "com/nf/jni/JniService";
        classPath && "" != classPath && (_this.mClassPath = classPath);
        return _this;
      }
      JniComponent.prototype.InitGame = function() {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mNFClassPath, "InitGame", "()V");
      };
      JniComponent.prototype.InitSdk = function(type) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mNFClassPath, "InitSdk", "(I)V", type);
      };
      JniComponent.prototype.ShowAd = function(type, placeId) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mClassPath, "showAd", "(ILjava/lang/String;)V", type, placeId);
      };
      JniComponent.prototype.CloseAd = function(type) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mClassPath, "closeAd", "(I)V", type);
      };
      JniComponent.prototype.CheckAd = function(type, placeId) {
        if (cc.sys.OS_ANDROID === cc.sys.os) return jsb.reflection.callStaticMethod(this.mClassPath, "checkAD", "(ILjava/lang/String;)Z", type, placeId);
        return false;
      };
      JniComponent.prototype.OnEventCount = function(eventId, param) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mNFClassPath, "onEventCount", "(Ljava/lang/String;Ljava/lang/String;)V", eventId, param);
      };
      JniComponent.prototype.GetAppVersion = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os) return jsb.reflection.callStaticMethod(this.mNFClassPath, "getAppVersion", "()Ljava/lang/String;");
        return "";
      };
      JniComponent.prototype.CustomMethod = function(actionName, param) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mNFClassPath, "customMethod", "(Ljava/lang/String;Ljava/lang/String;)V", actionName, param);
      };
      JniComponent.prototype.CustomMethodByString = function(actionName, param) {
        if (cc.sys.OS_ANDROID === cc.sys.os) return jsb.reflection.callStaticMethod(this.mNFClassPath, "customMethodByString", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", actionName, param);
        return "";
      };
      JniComponent.prototype.CustomMethodN = function(eventName, actionName, param) {
        cc.sys.OS_ANDROID === cc.sys.os && jsb.reflection.callStaticMethod(this.mNFClassPath, "customMethod", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", eventName, actionName, param);
      };
      JniComponent.prototype.CustomMethodByStringN = function(eventName, actionName, param) {
        if (cc.sys.OS_ANDROID === cc.sys.os) return jsb.reflection.callStaticMethod(this.mNFClassPath, "customMethodByString", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", eventName, actionName, param);
        return "";
      };
      JniComponent.prototype.IsIphoneX = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os) return jsb.reflection.callStaticMethod(this.mNFClassPath, "isIphoneX", "()Z");
        return false;
      };
      return JniComponent;
    }(PlatformInterface_1.default);
    exports.default = JniComponent;
    cc._RF.pop();
  }, {
    "./PlatformInterface": "PlatformInterface"
  } ],
  KwaiGameComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f975mWAtNJB4em5Vu9u3ts", "KwaiGameComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EnumMacros_1 = require("../Definition/EnumMacros");
    var NF_1 = require("../NF");
    var PlatformInterface_1 = require("./PlatformInterface");
    var KwaiGameComponent = function(_super) {
      __extends(KwaiGameComponent, _super);
      function KwaiGameComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mKwaiGame = window["ks"];
        _this.mKwaiSystemInfo = null;
        return _this;
      }
      KwaiGameComponent.prototype.InitGame = function() {
        this.mKwaiSystemInfo = this.mKwaiGame.getSystemInfoSync();
        NF_1.default.Debug.Info("Kwai System Info success:", this.mKwaiSystemInfo);
      };
      KwaiGameComponent.prototype.CreateRewardedVideoAd = function(adUnitId) {
        NF_1.default.Debug.Log("Create Rewarded Video Ad");
        this.mRewardedVideoAd = this.mKwaiGame.createRewardedVideoAd({
          adUnitId: adUnitId
        });
        if (this.mRewardedVideoAd) {
          this.mRewardedVideoAd.onError(function(err) {
            NF_1.default.Debug.Error("Rewarded Video Ad Error", err);
            var data = {
              mType: EnumMacros_1.AdsType.AT_RewardVideo,
              mStatus: EnumMacros_1.CallBackStatus.CALL_FALIED
            };
            window["PlatformMgr"].AdStatusListen(JSON.stringify(data));
          });
          this.mRewardedVideoAd.onClose(function(res) {
            var data = null;
            if (res && res.isEnded || void 0 === res) {
              NF_1.default.Debug.Log("Close Rewarded Video Ad Success");
              data = {
                mType: EnumMacros_1.AdsType.AT_RewardVideo,
                mStatus: EnumMacros_1.CallBackStatus.CALL_SUCCESS
              };
            } else {
              NF_1.default.Debug.Log("Close Rewarded Video Ad Cancel");
              data = {
                mType: EnumMacros_1.AdsType.AT_RewardVideo,
                mStatus: EnumMacros_1.CallBackStatus.CALL_CANCEL
              };
            }
            window["PlatformMgr"].OnVideoAdReward(JSON.stringify(data));
            window["PlatformMgr"].AdStatusListen(JSON.stringify(data));
          });
        } else NF_1.default.Debug.Error("\u521b\u5efa\u6fc0\u52b1\u89c6\u9891\u7ec4\u4ef6\u5931\u8d25");
      };
      KwaiGameComponent.prototype.CreateInterstitialAd = function(adUnitId) {
        NF_1.default.Debug.Log("Create Interstitial Ad");
        this.mInterstitialAd = this.mKwaiGame.createInterstitialAd({
          adUnitId: adUnitId
        });
        if (this.mInterstitialAd) {
          this.mInterstitialAd.onError(function(err) {
            NF_1.default.Debug.Error("Interstitial Ad Error", err);
            var data = {
              mType: EnumMacros_1.AdsType.AT_Interstitial,
              mStatus: EnumMacros_1.CallBackStatus.CALL_FALIED
            };
            window["PlatformMgr"].OnVideoAdReward(JSON.stringify(data));
          });
          this.mInterstitialAd.onClose(function(res) {
            NF_1.default.Debug.Log("Close Interstitial Ad");
            var data = {
              mType: EnumMacros_1.AdsType.AT_Interstitial,
              mStatus: EnumMacros_1.CallBackStatus.CALL_CLOSE
            };
            window["PlatformMgr"].OnVideoAdReward(JSON.stringify(data));
            window["PlatformMgr"].AdStatusListen(JSON.stringify(data));
          });
        } else NF_1.default.Debug.Error("\u521b\u5efa\u63d2\u5c4f\u89c6\u9891\u7ec4\u4ef6\u5931\u8d25");
      };
      KwaiGameComponent.prototype.CreateAd = function(type, adUnitId) {
        type == EnumMacros_1.AdsType.AT_RewardVideo ? this.CreateRewardedVideoAd(adUnitId) : type == EnumMacros_1.AdsType.AT_Interstitial && this.CreateInterstitialAd(adUnitId);
      };
      KwaiGameComponent.prototype.ShowAd = function(type, placeId) {
        if (type == EnumMacros_1.AdsType.AT_RewardVideo) if (this.mRewardedVideoAd) {
          var p = this.mRewardedVideoAd.show();
          p.then(function(result) {
            NF_1.default.Debug.Log("show rewarded video ad success, result is :", result);
          }).catch(function(error) {
            NF_1.default.Debug.Error("show rewarded video ad failed, error is : ", error);
          });
        } else NF_1.default.Debug.Error("\u521b\u5efa\u6fc0\u52b1\u89c6\u9891\u7ec4\u4ef6\u5931\u8d25"); else if (type == EnumMacros_1.AdsType.AT_Interstitial) if (this.mInterstitialAd) {
          var p = this.mInterstitialAd.show();
          p.then(function(result) {
            NF_1.default.Debug.Log("show interstitial ad success, result is :", result);
          }).catch(function(error) {
            NF_1.default.Debug.Error("show interstitial ad failed, error is :", error);
          });
        } else NF_1.default.Debug.Error("\u521b\u5efa\u63d2\u5c4f\u5e7f\u544a\u7ec4\u4ef6\u5931\u8d25");
      };
      KwaiGameComponent.prototype.CheckAd = function(type, placeId) {
        if (type == EnumMacros_1.AdsType.AT_RewardVideo) return null != this.mRewardedVideoAd;
        if (type == EnumMacros_1.AdsType.AT_Interstitial) return null != this.mInterstitialAd;
        return false;
      };
      KwaiGameComponent.prototype.CustomMethod = function(actionName, param) {};
      KwaiGameComponent.prototype.CustomMethodByString = function(actionName, param) {
        switch (actionName) {
         case "getLanguage":
          if (this.mKwaiSystemInfo) return this.mKwaiSystemInfo.language;
        }
        return "";
      };
      return KwaiGameComponent;
    }(PlatformInterface_1.default);
    exports.default = KwaiGameComponent;
    cc._RF.pop();
  }, {
    "../Definition/EnumMacros": "EnumMacros",
    "../NF": "NF",
    "./PlatformInterface": "PlatformInterface"
  } ],
  LevelUpForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8160fUX+9tFva9eN121HEsq", "LevelUpForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../NFramework/NF");
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("../../NFramework/Definition/EnumMacros");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var AdManger_1 = require("../../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelUpForm = function(_super) {
      __extends(LevelUpForm, _super);
      function LevelUpForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mLabLv1 = null;
        _this.mLabLv2 = null;
        _this.mLabLvTips = null;
        _this.mANode = null;
        _this.mBNode = null;
        _this.mCommonNode = null;
        _this.mHead = null;
        _this.mBtnSp = null;
        _this.mBtnTF = null;
        return _this;
      }
      LevelUpForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        var data = param;
        this.mLabLv1.string = data.mLastLv.toString();
        this.mLabLv2.string = data.mCurLv.toString();
        this.mLabLvTips.node.active = false;
        var roomInfos = NF_1.default.DataTables.GetAllInfos("RoomInfo");
        for (var index = 0; index < roomInfos.length; index++) {
          var element = roomInfos[index];
          if (element.mUnlock == data.mCurLv) {
            this.mLabLvTips.node.active = true;
            break;
          }
        }
        NF_1.default.Audio.Play(12);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.UpgradeShow);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Player_Level_Up, "Level", data.mCurLv.toString());
        this.AbTestShow();
      };
      LevelUpForm.prototype.AbTestShow = function() {
        this.mANode.active = false;
        this.mBNode.active = true;
        this.mCommonNode.y = 25.872;
        this.mBtnTF.fontSize = 42;
        this.mBtnTF.enableBold = true;
        this.mBtnSp.color = cc.color(19, 173, 23, 255);
        this.mLabLvTips.fontSize = this.mLabLv2.fontSize = this.mLabLv1.fontSize = 52;
        this.mLabLvTips.enableBold = this.mLabLv2.enableBold = this.mLabLv1.enableBold = true;
        var gameData = cc.find("GameData").getComponent("GameData");
        var Headid = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
        this.mHead.spriteFrame = gameData.headUrl[Headid];
      };
      LevelUpForm.prototype.onEnable = function() {
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
      };
      LevelUpForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      LevelUpForm.prototype.OnBtnClose = function() {
        _super.prototype.Close.call(this);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
      };
      __decorate([ property(cc.Label) ], LevelUpForm.prototype, "mLabLv1", void 0);
      __decorate([ property(cc.Label) ], LevelUpForm.prototype, "mLabLv2", void 0);
      __decorate([ property(cc.Label) ], LevelUpForm.prototype, "mLabLvTips", void 0);
      __decorate([ property(cc.Node) ], LevelUpForm.prototype, "mANode", void 0);
      __decorate([ property(cc.Node) ], LevelUpForm.prototype, "mBNode", void 0);
      __decorate([ property(cc.Node) ], LevelUpForm.prototype, "mCommonNode", void 0);
      __decorate([ property(cc.Sprite) ], LevelUpForm.prototype, "mHead", void 0);
      __decorate([ property(cc.Node) ], LevelUpForm.prototype, "mBtnSp", void 0);
      __decorate([ property(cc.Label) ], LevelUpForm.prototype, "mBtnTF", void 0);
      LevelUpForm = __decorate([ ccclass ], LevelUpForm);
      return LevelUpForm;
    }(UIFormLogic_1.default);
    exports.default = LevelUpForm;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../NFramework/Definition/EnumMacros": "EnumMacros",
    "../../NFramework/NF": "NF",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../../Platform/AdManger": "AdManger",
    "../../Platform/PlatformMgr": "PlatformMgr"
  } ],
  MyCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84daeqlVwNMAYG5OKZ35V2R", "MyCard");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    function getCardUrl(card) {
      var url = "cards/";
      var _a = RandomCardLogic_1.default.GetInstance().getCardZoom(card), t = _a[0], v = _a[1];
      url += RandomCardLogic_1.default.GetInstance().printfCardValue(v);
      t == RandomCardLogic_1.CardType.Clubs ? url += "C" : t == RandomCardLogic_1.CardType.Diamonds ? url += "D" : t == RandomCardLogic_1.CardType.Hearts ? url += "H" : t == RandomCardLogic_1.CardType.Spades && (url += "S");
      return url;
    }
    var MyCard = function(_super) {
      __extends(MyCard, _super);
      function MyCard() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.popHight = 50;
        _this.m_Shine = null;
        _this.tableCards = null;
        _this.enable = false;
        _this.disable = false;
        _this.touchCount = -1;
        return _this;
      }
      MyCard.prototype.onLoad = function() {
        this.loadTouchEvents();
      };
      MyCard.prototype.start = function() {
        this.gameData = cc.find("GameData").getComponent("GameData");
      };
      MyCard.prototype.loadTouchEvents = function() {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (GameMgr_1.default.GetInstance().getIsDeposit()) return;
          if (!_this.enable) return _this.shake();
          _this.touchCount = 10;
          _this.big();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          if (GameMgr_1.default.GetInstance().getIsDeposit()) return;
          if (!_this.enable) return;
          if (GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online && GameMgr_1.default.GetInstance().CountDown <= 0) return;
          var dis = event.getLocationY() - event.getStartLocation().y;
          if (dis <= 0) return;
          _this.node.y = _this.posCurrent.y + dis;
          _this.touchCount = -1;
          if (dis > 45) {
            _this.enable = false;
            _this.tableCards.myCard(_this);
          }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
          if (GameMgr_1.default.GetInstance().getIsDeposit()) return;
          if (!_this.enable) return;
          _this.goback();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          if (GameMgr_1.default.GetInstance().getIsDeposit()) return;
          if (!_this.enable) return;
          _this.goback();
        }, this);
      };
      MyCard.prototype.refreshCard = function(card) {
        var sf = cc.loader.getRes(getCardUrl(card), cc.SpriteFrame);
        var sp = this.getComponent(cc.Sprite);
        sp.spriteFrame = sf;
        this.card = card;
      };
      MyCard.prototype.goback = function() {
        var pos = this.posCurrent.clone();
        this.disable && (pos.y -= this.popHight);
        cc.tween(this.node).to(.1, {
          position: cc.v3(this.posCurrent),
          scale: 1
        }).start();
      };
      MyCard.prototype.big = function() {
        cc.tween(this.node).to(.2, {
          scale: 1.3
        }).start();
      };
      MyCard.prototype.disableCard = function() {
        this.disable = true;
        this.enable = false;
        cc.tween(this.node).to(.2, {
          position: cc.v3(this.posCurrent.x, this.posCurrent.y - this.popHight)
        }).start();
      };
      MyCard.prototype.goto = function(pos) {
        cc.tween(this.node).to(.5, {
          position: cc.v3(pos),
          scale: 1
        }, {
          easing: "backInOut"
        }).start();
      };
      MyCard.prototype.shake = function() {
        if (!this.disable) return;
        var ea = cc.easeSineIn();
        var mv1 = cc.moveBy(.06, cc.v2(-5, 0)).easing(ea);
        var mv2 = cc.moveBy(.12, cc.v2(5, 0)).easing(ea);
        cc.tween(this.node).sequence(mv1, mv2).repeat(3).start();
      };
      MyCard.prototype.update = function(dt) {
        if (this.touchCount > 0) this.touchCount--; else if (0 == this.touchCount) {
          this.goback();
          this.touchCount--;
        }
      };
      MyCard.prototype.ShowShine = function() {
        this.m_Shine.active = true;
      };
      __decorate([ property(cc.Integer) ], MyCard.prototype, "popHight", void 0);
      __decorate([ property(cc.Node) ], MyCard.prototype, "m_Shine", void 0);
      MyCard = __decorate([ ccclass ], MyCard);
      return MyCard;
    }(cc.Component);
    exports.default = MyCard;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./RandomCardLogic": "RandomCardLogic"
  } ],
  NFArrayUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "484c9NdLOxHOZKGhDJ3pFtN", "NFArrayUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFArrayUtils = function() {
      function NFArrayUtils() {}
      NFArrayUtils.prototype.DeepCopy = function(obj) {
        if ("object" !== typeof obj || null === obj) return obj;
        var newObj = Array.isArray(obj) ? [] : {};
        for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = this.DeepCopy(obj[key]));
        return newObj;
      };
      return NFArrayUtils;
    }();
    exports.default = NFArrayUtils;
    cc._RF.pop();
  }, {} ],
  NFAudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b497Mg7J9Ki6ZrBpGxrglg", "NFAudioManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFDataTables_1 = require("../DataBase/NFDataTables");
    var NFConstant_1 = require("../Definition/NFConstant");
    var NF_1 = require("../NF");
    var NFAudioManager = function(_super) {
      __extends(NFAudioManager, _super);
      function NFAudioManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mMusicMute = false;
        _this.mEffectMute = false;
        _this.mClipArr = {};
        _this.mMusicVolume = 1;
        _this.mSoundVolume = 1;
        return _this;
      }
      NFAudioManager.prototype.Init = function() {
        _super.prototype.Init.call(this);
        this.mMusicMute = NF_1.default.Storage.GetBool(NFConstant_1.default.AudioMusicMuteKey, false);
        this.mEffectMute = NF_1.default.Storage.GetBool(NFConstant_1.default.AudioEffectMuteKey, false);
        this.mMusicVolume = Number(NF_1.default.Storage.GetString(NFConstant_1.default.AudioMusicVolumeKey, "1"));
        cc.audioEngine.setMusicVolume(this.mMusicVolume);
        this.mSoundVolume = Number(NF_1.default.Storage.GetString(NFConstant_1.default.AudioEffectVolumeKey, "1"));
        cc.audioEngine.setEffectsVolume(this.mSoundVolume);
      };
      Object.defineProperty(NFAudioManager.prototype, "MusicMute", {
        get: function() {
          return this.mMusicMute;
        },
        enumerable: false,
        configurable: true
      });
      NFAudioManager.prototype.SetMusicMute = function(isMute) {
        if (this.mMusicMute != isMute) {
          this.mMusicMute = isMute;
          NF_1.default.Storage.SetBool(NFConstant_1.default.AudioMusicMuteKey, isMute);
          this.StopMusic();
        }
      };
      Object.defineProperty(NFAudioManager.prototype, "EffectMute", {
        get: function() {
          return this.mEffectMute;
        },
        enumerable: false,
        configurable: true
      });
      NFAudioManager.prototype.SetEffectMute = function(isMute) {
        if (this.mEffectMute != isMute) {
          this.mEffectMute = isMute;
          NF_1.default.Storage.SetBool(NFConstant_1.default.AudioEffectMuteKey, isMute);
        }
      };
      Object.defineProperty(NFAudioManager.prototype, "MusicVolume", {
        get: function() {
          return this.mMusicVolume;
        },
        set: function(value) {
          this.mMusicVolume = value;
          NF_1.default.Storage.SetString(NFConstant_1.default.AudioMusicVolumeKey, value.toString());
          cc.audioEngine.setMusicVolume(value);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFAudioManager.prototype, "SoundVolume", {
        get: function() {
          return this.mSoundVolume;
        },
        set: function(value) {
          this.mSoundVolume = value;
          NF_1.default.Storage.SetString(NFConstant_1.default.AudioEffectVolumeKey, value.toString());
          cc.audioEngine.setEffectsVolume(value);
        },
        enumerable: false,
        configurable: true
      });
      NFAudioManager.prototype.GetInfo = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var info = NF_1.default.DataTables.GetInfoById("SoundInfo", id, bundleName);
        if (!info) {
          NF_1.default.Debug.Error("Can not find sound id: " + id + "!");
          return null;
        }
        return info;
      };
      NFAudioManager.prototype.GetUrl = function(name) {
        return "Sounds/" + name;
      };
      NFAudioManager.prototype.Preload = function(id) {
        if (this.mClipArr[id]) {
          NF_1.default.Debug.Info("Sound clip exist: " + id + "!");
          return;
        }
        var info = NFDataTables_1.default.GetInstance().GetInfoById("SoundInfo", id);
        if (info) var self = this;
      };
      NFAudioManager.prototype.Play = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var info = this.GetInfo(id, bundleName);
        if (info) {
          var assetUrl = this.GetUrl(info.mAssetName);
          this.PlayByUrl(assetUrl, info.mType, info.mLoop, bundleName);
        }
      };
      NFAudioManager.prototype.PlayByUrl = function(assetUrl, type, loop, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        if (1 == type && this.mMusicMute || 2 == type && this.mEffectMute) return;
        var clip = this.mClipArr[assetUrl];
        if (clip) this.PlaySound(type, loop, clip); else {
          var self_1 = this;
          NF_1.default.ResLoad.LoadBundleRes(bundleName, assetUrl, function(clip) {
            self_1.PlaySound(type, loop, clip);
            self_1.mClipArr[assetUrl] = clip;
          }, cc.AudioClip);
        }
      };
      NFAudioManager.prototype.PlaySound = function(type, loop, clip) {
        1 == type ? cc.audioEngine.playMusic(clip, loop) : cc.audioEngine.playEffect(clip, loop);
      };
      NFAudioManager.prototype.Pause = function(audioID) {
        cc.audioEngine.pause(audioID);
      };
      NFAudioManager.prototype.PauseAll = function() {
        cc.audioEngine.pauseAll();
      };
      NFAudioManager.prototype.Resume = function(audioID) {
        cc.audioEngine.resume(audioID);
      };
      NFAudioManager.prototype.ResumeAll = function() {
        cc.audioEngine.resumeAll();
      };
      NFAudioManager.prototype.Stop = function(audioID) {
        cc.audioEngine.stop(audioID);
      };
      NFAudioManager.prototype.StopMusic = function() {
        cc.audioEngine.stopMusic();
      };
      NFAudioManager.prototype.StopAll = function() {
        cc.audioEngine.stopAll();
      };
      NFAudioManager.prototype.uncache = function(clip) {
        cc.audioEngine.uncache(clip);
      };
      NFAudioManager.prototype.UncacheAll = function() {
        cc.audioEngine.uncacheAll();
      };
      return NFAudioManager;
    }(BaseInstance_1.default);
    exports.default = NFAudioManager;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../DataBase/NFDataTables": "NFDataTables",
    "../Definition/NFConstant": "NFConstant",
    "../NF": "NF"
  } ],
  NFBannerForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "edb85DVNIdFvp/Fg6TkY0QR", "NFBannerForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NFBannerForm = function(_super) {
      __extends(NFBannerForm, _super);
      function NFBannerForm() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NFBannerForm.prototype.onLoad = function() {};
      NFBannerForm.prototype.start = function() {};
      NFBannerForm = __decorate([ ccclass ], NFBannerForm);
      return NFBannerForm;
    }(UIFormLogic_1.default);
    exports.default = NFBannerForm;
    cc._RF.pop();
  }, {
    "../../NFramework/UI/UIFormLogic": "UIFormLogic"
  } ],
  NFBasePlatformMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4660ehzxlBMmK0rWRWBXaPW", "NFBasePlatformMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var ActionName_1 = require("../Definition/ActionName");
    var NF_1 = require("../NF");
    var JniComponent_1 = require("./JniComponent");
    var KwaiGameComponent_1 = require("./KwaiGameComponent");
    var PlatformInterface_1 = require("./PlatformInterface");
    var NFBasePlatformMgr = function(_super) {
      __extends(NFBasePlatformMgr, _super);
      function NFBasePlatformMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mPlatformInterface = null;
        _this.mClassPath = "";
        return _this;
      }
      Object.defineProperty(NFBasePlatformMgr.prototype, "ClassPath", {
        set: function(value) {
          this.mClassPath = value;
        },
        enumerable: false,
        configurable: true
      });
      NFBasePlatformMgr.prototype.Init = function() {
        _super.prototype.Init.call(this);
        if (window["ks"]) {
          NF_1.default.Debug.Log("Platform ks");
          this.mPlatformInterface = new KwaiGameComponent_1.default();
        } else if (cc.sys.isNative) {
          NF_1.default.Debug.Log("Platform Native");
          cc.sys.OS_ANDROID === cc.sys.os ? this.mPlatformInterface = new JniComponent_1.default(this.mClassPath) : this.mPlatformInterface = new PlatformInterface_1.default();
        } else {
          NF_1.default.Debug.Log("Platform Base");
          this.mPlatformInterface = new PlatformInterface_1.default();
        }
        this.mPlatformInterface.InitGame();
      };
      NFBasePlatformMgr.prototype.InitSdk = function(type) {
        this.mPlatformInterface.InitSdk(type);
      };
      NFBasePlatformMgr.prototype.CreateAd = function(type, adUnitId) {
        this.mPlatformInterface.CreateAd(type, adUnitId);
      };
      NFBasePlatformMgr.prototype.ShowAd = function(type, placeId) {
        this.mPlatformInterface.ShowAd(type, placeId);
      };
      NFBasePlatformMgr.prototype.CloseAd = function(type) {
        this.mPlatformInterface.CloseAd(type);
      };
      NFBasePlatformMgr.OnVideoAdReward = function(params) {};
      NFBasePlatformMgr.OnVideoAdRewardJson = function(params) {};
      NFBasePlatformMgr.AdStatusListen = function(params) {};
      NFBasePlatformMgr.prototype.CheckAd = function(type, placeId) {
        return this.mPlatformInterface.CheckAd(type, placeId);
      };
      NFBasePlatformMgr.prototype.OnEventCount = function(eventId, param) {
        this.mPlatformInterface.OnEventCount(eventId, param);
      };
      NFBasePlatformMgr.prototype.GetAppVersion = function() {
        return this.mPlatformInterface.GetAppVersion();
      };
      NFBasePlatformMgr.prototype.CustomMethod = function(actionName, param) {
        this.mPlatformInterface.CustomMethod(actionName, param);
      };
      NFBasePlatformMgr.prototype.CustomMethodByString = function(actionName, param) {
        return this.mPlatformInterface.CustomMethodByString(actionName, param);
      };
      NFBasePlatformMgr.prototype.CustomMethodN = function(eventName, actionName, param) {
        this.mPlatformInterface.CustomMethodN(eventName, actionName, param);
      };
      NFBasePlatformMgr.prototype.CustomMethodByStringN = function(eventName, actionName, param) {
        return this.mPlatformInterface.CustomMethodByStringN(eventName, actionName, param);
      };
      NFBasePlatformMgr.prototype.IsIphoneX = function() {
        return this.mPlatformInterface.IsIphoneX();
      };
      NFBasePlatformMgr.EnterForeground = function(param) {};
      NFBasePlatformMgr.prototype.PrivacyPolicy = function() {
        this.CustomMethod(ActionName_1.ActionName.PrivacyPolicy);
      };
      NFBasePlatformMgr.prototype.PrivacyPolicyUrl = function() {
        return this.CustomMethodByString(ActionName_1.ActionName.PrivacyPolicy);
      };
      return NFBasePlatformMgr;
    }(BaseInstance_1.default);
    exports.default = NFBasePlatformMgr;
    window["NFPlatformMgr"] = NFBasePlatformMgr;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../Definition/ActionName": "ActionName",
    "../NF": "NF",
    "./JniComponent": "JniComponent",
    "./KwaiGameComponent": "KwaiGameComponent",
    "./PlatformInterface": "PlatformInterface"
  } ],
  NFBtnUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f898eBlZf5EcoGZm1PWuxDz", "NFBtnUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../../Definition/NFConstant");
    var NF_1 = require("../../NF");
    var NFBtnUtils = function() {
      function NFBtnUtils() {
        this.mCanTouch = true;
      }
      NFBtnUtils.prototype.IsTouchEnd = function(soundId, bundleName) {
        var _this = this;
        void 0 === soundId && (soundId = 1);
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        if (this.mCanTouch) {
          "number" == typeof soundId && soundId > 0 ? NF_1.default.Audio.Play(soundId, bundleName) : "string" != typeof soundId || NF_1.default.String.IsNullOrEmpty(soundId) || NF_1.default.Audio.PlayByUrl(soundId, 2, false, bundleName);
          this.mCanTouch = false;
          setTimeout(function() {
            _this.mCanTouch = true;
          }, 100);
          return true;
        }
        return false;
      };
      NFBtnUtils.prototype.SetBtnState = function(btn, active, interactable, interactableGrey) {
        void 0 === interactable && (interactable = true);
        void 0 === interactableGrey && (interactableGrey = true);
        btn.node.active != active && (btn.node.active = active);
        if (active && btn.interactable != interactable) {
          btn.interactable = interactable;
          interactableGrey && NF_1.default.UIUtils.SetGrey(btn.node, !interactable);
        }
      };
      return NFBtnUtils;
    }();
    exports.default = NFBtnUtils;
    cc._RF.pop();
  }, {
    "../../Definition/NFConstant": "NFConstant",
    "../../NF": "NF"
  } ],
  NFCaptrueMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75672s85slLh6Z/powsCS/H", "NFCaptrueMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../../../Base/BaseInstance");
    var NFCaptureToNative_1 = require("./NFCaptureToNative");
    var NFCaptureToWeb_1 = require("./NFCaptureToWeb");
    var NFCaptrueMgr = function(_super) {
      __extends(NFCaptrueMgr, _super);
      function NFCaptrueMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTextureRenderBase = null;
        return _this;
      }
      NFCaptrueMgr.prototype.Init = function() {
        cc.sys.OS_ANDROID === cc.sys.os ? this.mTextureRenderBase = new NFCaptureToNative_1.default() : cc.sys.OS_WINDOWS === cc.sys.os && (this.mTextureRenderBase = new NFCaptureToWeb_1.default());
      };
      NFCaptrueMgr.prototype.ToScreenCapture = function(camera) {
        return this.mTextureRenderBase.ToCapture(camera);
      };
      return NFCaptrueMgr;
    }(BaseInstance_1.default);
    exports.default = NFCaptrueMgr;
    cc._RF.pop();
  }, {
    "../../../Base/BaseInstance": "BaseInstance",
    "./NFCaptureToNative": "NFCaptureToNative",
    "./NFCaptureToWeb": "NFCaptureToWeb"
  } ],
  NFCaptureToNative: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73e1aZpP55P2r1XmtP+k4iz", "NFCaptureToNative");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../../NF");
    var NFTextureRenderBase_1 = require("./NFTextureRenderBase");
    var NFCaptureToNative = function(_super) {
      __extends(NFCaptureToNative, _super);
      function NFCaptureToNative() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mWidth = 0;
        _this.mHeight = 0;
        return _this;
      }
      NFCaptureToNative.prototype.ToCapture = function(camera) {
        _super.prototype.ToCapture.call(this, camera);
        this.mCamera.enabled = true;
        var picData = this.CreateNativeImg();
        var filePath = this.SaveFile(picData);
        this.mCamera.enabled = false;
        return filePath;
      };
      NFCaptureToNative.prototype.CreateNativeImg = function() {
        this.mCamera.render();
        var data = this.mTexture.readPixels();
        this.mWidth = this.mTexture.width;
        this.mHeight = this.mTexture.height;
        var picData = this.FilpYImage(data, this.mWidth, this.mHeight);
        return picData;
      };
      NFCaptureToNative.prototype.SaveFile = function(picData) {
        var fileName;
        var filePath;
        var success;
        false;
        return "";
      };
      NFCaptureToNative.prototype.FilpYImage = function(data, width, height) {
        var picData = new Uint8Array(width * height * 4);
        var rowBytes = 4 * width;
        for (var row = 0; row < height; row++) {
          var srow = height - 1 - row;
          var start = srow * width * 4;
          var reStart = row * width * 4;
          for (var i = 0; i < rowBytes; i++) picData[reStart + i] = data[start + i];
        }
        return picData;
      };
      return NFCaptureToNative;
    }(NFTextureRenderBase_1.default);
    exports.default = NFCaptureToNative;
    cc._RF.pop();
  }, {
    "../../../NF": "NF",
    "./NFTextureRenderBase": "NFTextureRenderBase"
  } ],
  NFCaptureToWeb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d838l582REq67P7T2cynuq", "NFCaptureToWeb");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFTextureRenderBase_1 = require("./NFTextureRenderBase");
    var NFCaptureToWeb = function(_super) {
      __extends(NFCaptureToWeb, _super);
      function NFCaptureToWeb() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NFCaptureToWeb.prototype.ToCapture = function(camera) {
        _super.prototype.ToCapture.call(this, camera);
        this.mCamera.enabled = true;
        this.CreateCanvas();
        var img = this.CreateImg();
        this.ShowImage(img);
        this.mCamera.enabled = false;
        return "";
      };
      return NFCaptureToWeb;
    }(NFTextureRenderBase_1.default);
    exports.default = NFCaptureToWeb;
    cc._RF.pop();
  }, {
    "./NFTextureRenderBase": "NFTextureRenderBase"
  } ],
  NFCommandDelegate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2187x8NtxGhJ/zZEvjYxt8", "NFCommandDelegate");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFCommandDelegate = void 0;
    var NFCommandService_1 = require("./NFCommandService");
    var NFHttpService_1 = require("./NFHttpService");
    var NFCommandDelegate = function() {
      function NFCommandDelegate() {}
      Object.defineProperty(NFCommandDelegate, "Delegate", {
        get: function() {
          return NFCommandDelegate.mDelegate;
        },
        enumerable: false,
        configurable: true
      });
      NFCommandDelegate.SetDelegate = function(delegate) {
        NFCommandDelegate.mDelegate = delegate;
      };
      Object.defineProperty(NFCommandDelegate.prototype, "CurHttpUrl", {
        get: function() {
          return NFHttpService_1.NFHttpService.GetInstance().CurHttpUrl;
        },
        enumerable: false,
        configurable: true
      });
      NFCommandDelegate.prototype.SetNetServerUrl = function(url) {
        NFHttpService_1.NFHttpService.GetInstance().ServerUrl(url);
      };
      NFCommandDelegate.prototype.UpdateDataToServer = function(mode, toServer) {
        void 0 === toServer && (toServer = true);
      };
      NFCommandDelegate.prototype.ExecuteCommand = function(nd, data) {};
      NFCommandDelegate.prototype.ExecuteMessage = function(nd) {};
      NFCommandDelegate.prototype.CreateNetData = function(eventName, data) {
        return null;
      };
      NFCommandDelegate.prototype.AddCommand = function(nd) {
        NFCommandService_1.NFCommandService.GetInstance().AddCommand(nd);
      };
      NFCommandDelegate.prototype.ErrorCommand = function(netData) {};
      NFCommandDelegate.prototype.SendHeartbeat = function() {};
      return NFCommandDelegate;
    }();
    exports.NFCommandDelegate = NFCommandDelegate;
    cc._RF.pop();
  }, {
    "./NFCommandService": "NFCommandService",
    "./NFHttpService": "NFHttpService"
  } ],
  NFCommandService: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "668c1ZdxUdNOJZnJx5uMFxm", "NFCommandService");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFCommandService = void 0;
    var NFNetData_1 = require("./Model/NFNetData");
    var NFCommandDelegate_1 = require("./NFCommandDelegate");
    var NFNetData_2 = require("./Model/NFNetData");
    var NFScoketService_1 = require("./NFScoketService");
    var NF_1 = require("../NF");
    var EnumMacros_1 = require("../Definition/EnumMacros");
    var NFHttpService_1 = require("./NFHttpService");
    var NFDictionary_1 = require("../Dictionary/NFDictionary");
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFCommandService = function(_super) {
      __extends(NFCommandService, _super);
      function NFCommandService() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mCommands = new Array();
        _this.mCommandList = new NFDictionary_1.default();
        _this.mRemoveList = new Array();
        _this.mTimeout = 5e3;
        return _this;
      }
      NFCommandService.prototype.StartUpdate = function() {
        NF_1.default.Timer.AddUpdate(this.ExecuteCommand, this);
      };
      NFCommandService.prototype.AddCommand = function(netData) {
        this.AddExecuteCommand(netData);
      };
      NFCommandService.prototype.GetKey = function(httpData) {
        var key = httpData.Command;
        0 != httpData.Index && "time" != key && (key = httpData.Command + "_" + httpData.Index);
        return key;
      };
      NFCommandService.prototype.CheckCommand = function(httpData) {
        if (httpData.mRequestConnectType == NFNetData_2.ERequestConnectType.RCT_WSocket) return true;
        var key = this.GetKey(httpData);
        if (this.mCommandList.ContainsKey(key)) {
          var data = this.mCommandList.TryGetValue(key);
          if (NF_1.default.Time.GetCurrentTimeMillis() - httpData.Time > this.mTimeout) {
            this.RemoveCommand(data);
            this.mCommandList.Add(key, httpData);
            return true;
          }
          !httpData.mAsyn && data.mAsyn && (data.mAsyn = false);
          return false;
        }
        this.mCommandList.Add(key, httpData);
        return true;
      };
      NFCommandService.prototype.RemoveCommand = function(httpData) {
        var key = this.GetKey(httpData);
        this.mCommandList.ContainsKey(key) && this.mCommandList.Remove(key);
      };
      NFCommandService.prototype.AddExecuteCommand = function(netData) {
        if (!netData.mQueue) {
          !netData.mAsyn;
          if (this.CheckCommand(netData)) {
            !netData.mAsyn;
            netData.mRequestStatus == NFNetData_1.ERequestStatus.RS_MYDATA ? netData.mRequestConnectType == NFNetData_2.ERequestConnectType.RCT_SocketIO || (netData.mRequestConnectType == NFNetData_2.ERequestConnectType.RCT_Http ? NFHttpService_1.NFHttpService.GetInstance().HttpUrl(netData) : netData.mRequestConnectType == NFNetData_2.ERequestConnectType.RCT_WSocket && NFScoketService_1.WFScoketService.GetInstance().Send(netData)) : netData.mRequestStatus == NFNetData_1.ERequestStatus.RS_URL;
          }
        }
      };
      NFCommandService.prototype.GetNetDateFromList = function(rootData) {
        var command = "";
        var rootJsonData = JSON.parse(rootData);
        if (null == rootJsonData) return null;
        var jsonData = rootJsonData.responseMsg;
        if (!jsonData) return null;
        command = jsonData.mCommand;
        if (!command || command.length <= 0) return null;
        var timestamp = jsonData.mTimestamp;
        var key = command;
        timestamp && timestamp.length > 0 && (key = command + "_" + timestamp);
        if (this.mCommandList.ContainsKey(key)) {
          var nd = this.mCommandList.TryGetValue(key);
          nd.mErrorCode = 0;
          var data = jsonData.mData;
          data.mError && (nd.mErrorCode = Number(data.mError));
          0 == nd.mErrorCode && (null != NFCommandDelegate_1.NFCommandDelegate.Delegate ? nd.mResponseData = data : NF_1.default.Debug.Log("CommandDelegate.Delegate is null"));
          return nd;
        }
        if (null != NFCommandDelegate_1.NFCommandDelegate.Delegate) {
          var data = jsonData.mData;
          var nd = NFCommandDelegate_1.NFCommandDelegate.Delegate.CreateNetData(command, data);
          if (nd) {
            nd.mResponseData = data;
            data.mError && (nd.mErrorCode = Number(data.mError));
          }
          return nd;
        }
        return null;
      };
      NFCommandService.prototype.AddExecuteCommandData = function(data) {
        0 != data.length && this.mCommands.push(data);
      };
      NFCommandService.prototype.ExecuteCommand = function() {
        for (var i = 0; i < this.mCommands.length; i++) {
          var data = this.mCommands[i];
          if (data.length <= 0) continue;
          var nd = this.GetNetDateFromList(data);
          if (null != nd && 0 != nd.mErrorCode) {
            nd.mCallBackFc && nd.mCallBackFc(EnumMacros_1.CallBackStatus.CALL_FALIED, nd);
            null != NFCommandDelegate_1.NFCommandDelegate.Delegate && NFCommandDelegate_1.NFCommandDelegate.Delegate.ErrorCommand(nd);
            !nd.mAsyn;
            this.RemoveCommand(nd);
            continue;
          }
          var hd = nd;
          if (null == hd) break;
          !hd.mAsyn;
          if (hd.mRequestConnectType == NFNetData_2.ERequestConnectType.RCT_WSocket) {
            nd.mCallBackFc && hd.mCallBackFc(EnumMacros_1.CallBackStatus.CALL_SUCCESS, hd);
            null != NFCommandDelegate_1.NFCommandDelegate.Delegate && NFCommandDelegate_1.NFCommandDelegate.Delegate.ExecuteMessage(nd);
          } else nd.mCallBackFc && hd.mCallBackFc(EnumMacros_1.CallBackStatus.CALL_SUCCESS, hd.mResponseData);
          this.RemoveCommand(hd);
        }
        this.mCommands.length = 0;
        this.CommandCheckAll();
      };
      NFCommandService.prototype.CheckIsArray = function(data) {
        var jsonData = JSON.parse(data);
        if (jsonData && Array.isArray(jsonData)) return true;
        return false;
      };
      NFCommandService.prototype.CommandCheckAll = function() {
        this.mRemoveList.length = 0;
        for (var i = 0; i < this.mCommandList.GetKeys().length; ++i) {
          var netData = this.mCommandList.TryGetValue(this.mCommandList.GetKeys()[i]);
          if (netData.mRequestStatus != NFNetData_1.ERequestStatus.RS_NONE) {
            var curT = NF_1.default.Time.GetCurrentTimeMillis() - netData.Time;
            if (curT > 1e3 * this.mTimeout) {
              netData.mErrorCode = -404;
              netData.mCallBackFc(EnumMacros_1.CallBackStatus.CALL_FALIED, netData);
              null != NFCommandDelegate_1.NFCommandDelegate.Delegate && NFCommandDelegate_1.NFCommandDelegate.Delegate.ErrorCommand(netData);
              !netData.mAsyn;
              this.mRemoveList.push(netData);
              break;
            }
          }
        }
        for (var i = 0; i < this.mRemoveList.length; i++) {
          var newData = this.mRemoveList[i];
          this.RemoveCommand(newData);
        }
        this.mRemoveList.length = 0;
      };
      return NFCommandService;
    }(BaseInstance_1.default);
    exports.NFCommandService = NFCommandService;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../Definition/EnumMacros": "EnumMacros",
    "../Dictionary/NFDictionary": "NFDictionary",
    "../NF": "NF",
    "./Model/NFNetData": "NFNetData",
    "./NFCommandDelegate": "NFCommandDelegate",
    "./NFHttpService": "NFHttpService",
    "./NFScoketService": "NFScoketService"
  } ],
  NFConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8849cWkY6pJzL6gaUEdv9H0", "NFConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConfigDebug = function() {
      function NFConfigDebug() {
        this.ShowLog = false;
        this.ShowNetLog = false;
        this.DataDeBug = false;
        this.GMDebug = false;
        this.ShowProfiler = false;
        this.DevOutlineUrl = false;
        this.GMChangeAccount = false;
        this.AdDebug = false;
      }
      return NFConfigDebug;
    }();
    exports.default = NFConfigDebug;
    cc._RF.pop();
  }, {} ],
  "NFConstant.NetKey": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "460a65Omn9JWq89G4W3xRsC", "NFConstant.NetKey");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFConstantNetKey = void 0;
    var NFConstantNetKey = function() {
      function NFConstantNetKey() {}
      NFConstantNetKey.AcceptEncoding = "lib-encoding";
      NFConstantNetKey.ActionName = "mCommand";
      NFConstantNetKey.RequestMsg = "requestMsg";
      NFConstantNetKey.ResponseMsg = "responseMsg";
      NFConstantNetKey.TimestampKey = "mTimestamp";
      NFConstantNetKey.NetDataKey = "mData";
      NFConstantNetKey.ChannelIdKey = "mChannelId";
      NFConstantNetKey.DeviceIdKey = "mDeviceId";
      NFConstantNetKey.PlayerIdKey = "mPlayerId";
      NFConstantNetKey.VersionKey = "mVersion";
      NFConstantNetKey.GameTypeKey = "mGameType";
      return NFConstantNetKey;
    }();
    exports.NFConstantNetKey = NFConstantNetKey;
    cc._RF.pop();
  }, {} ],
  NFConstant: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f12a9sS1yBMfbp/KsMQSo3m", "NFConstant");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant = function() {
      function NFConstant() {}
      NFConstant.AudioMusicMuteKey = "AudioMusicMuteKey";
      NFConstant.AudioEffectMuteKey = "AudioEffectMuteKey";
      NFConstant.AudioMusicVolumeKey = "AudioMusicVolumeKey";
      NFConstant.AudioEffectVolumeKey = "AudioEffectVolumeKey";
      NFConstant.DefaultBundleName = "resources";
      NFConstant.FilterNodeName = [ "New Button", "New Sprite", "New Label", "Background", "Label", "scrollBar", "bar", "New Slider", "Handle", "New ProgressBar", "New EditBox", "BACKGROUND_SPRITE", "TEXT_LABEL", "PLACEHOLDER_LABEL" ];
      NFConstant.CurrLanguageTypeKey = "CurrLanguageTypeKey";
      return NFConstant;
    }();
    exports.default = NFConstant;
    cc._RF.pop();
  }, {} ],
  NFDataTables: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4da6ezdXyJFS5W47K2wS2hY", "NFDataTables");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFConstant_1 = require("../Definition/NFConstant");
    var NF_1 = require("../NF");
    var NFDataTables = function(_super) {
      __extends(NFDataTables, _super);
      function NFDataTables() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mDataTables = {};
        return _this;
      }
      NFDataTables.prototype.LoadDataTables = function(url, callback, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        this.LoadBundleDataTables(url, callback, bundleName);
      };
      NFDataTables.prototype.LoadBundleDataTables = function(url, callback, bundleName) {
        var _this = this;
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        NF_1.default.ResLoad.LoadBundleDir(bundleName, url, function(assets) {
          assets.length <= 0 && NF_1.default.Debug.Warn("No Data tables in dir: " + url);
          for (var i in assets) if (assets[i] instanceof cc.TextAsset) {
            var as = assets[i];
            _this.mDataTables[bundleName] || (_this.mDataTables[bundleName] = {});
            _this.mDataTables[bundleName][as.name] = _this.ParseDataTables(as.text);
          }
          callback(true);
        });
      };
      NFDataTables.prototype.ParseDataTables = function(csv, columnDelimiter, sp) {
        void 0 === columnDelimiter && (columnDelimiter = "\t");
        void 0 === sp && (sp = true);
        var obj = [];
        if (sp) {
          csv = csv.replace(/""/g, "XX#XX");
          csv = csv.replace(/"/g, "");
          csv = csv.replace(/XX#XX/g, "'");
        }
        var arrTable = this.CsvToArray(csv, columnDelimiter);
        var keys = arrTable[1];
        var types = arrTable[2];
        var idx = 0;
        for (var i = 4; i < arrTable.length; i++) {
          var table = arrTable[i];
          var id = table[1];
          if (!id || "" === id) continue;
          obj[idx] = {
            mId: Number(id)
          };
          for (var j = 2; j < table.length; j++) {
            if (!keys[j] || "" === keys[j]) continue;
            var key = "m" + keys[j];
            var value = table[j];
            if (!value || "" === value) continue;
            var type = types[j];
            if ("int" === type || "float" === type || "double" === type) obj[idx][key] = Number(value); else if ("int[]" === type || "float[]" === type || "double[]" === type) {
              var tjs = value.split("|");
              obj[idx][key] = [];
              for (var k = 0; k < tjs.length; k++) obj[id][key].push(Number(tjs[k]));
            } else if ("bool" === type) {
              var str = value.toLocaleLowerCase();
              obj[idx][key] = "true" == str;
            } else obj[idx][key] = value.replace(/\\n/g, "\n");
          }
          idx++;
        }
        return obj;
      };
      NFDataTables.prototype.CsvToArray = function(csv, columnDelimiter) {
        void 0 === columnDelimiter && (columnDelimiter = "\t");
        var temp = csv.split("\r\n");
        var arrTable = [ [] ];
        for (var index = 0; index < temp.length; index++) {
          var element = temp[index];
          arrTable[index] = element.split(columnDelimiter);
        }
        return arrTable;
      };
      NFDataTables.prototype.GetAllInfos = function(name, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        if (!this.mDataTables[bundleName]) {
          NF_1.default.Debug.Error("Can not find bundle data table: " + bundleName);
          return null;
        }
        var array = this.mDataTables[bundleName][name];
        if (!array) {
          NF_1.default.Debug.Error("Can not find data table: " + name);
          return null;
        }
        return array;
      };
      NFDataTables.prototype.GetInfoById = function(name, id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var array = this.GetAllInfos(name, bundleName);
        if (array) for (var index = 0; index < array.length; index++) {
          var element = array[index];
          if (null == element.mId) {
            NF_1.default.Debug.Error("Info not contains 'Id': " + id);
            return null;
          }
          if (element.mId == id) return element;
        }
        return null;
      };
      return NFDataTables;
    }(BaseInstance_1.default);
    exports.default = NFDataTables;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../Definition/NFConstant": "NFConstant",
    "../NF": "NF"
  } ],
  NFDateUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de790XjJGlNPKYpqB++taU+", "NFDateUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../NF");
    var NFTimeUtils_1 = require("./NFTimeUtils");
    var NFDateUtils = function() {
      function NFDateUtils() {}
      Object.defineProperty(NFDateUtils.prototype, "curTimes", {
        get: function() {
          return NF_1.default.Time.GetCurrentTimeMillis();
        },
        enumerable: false,
        configurable: true
      });
      NFDateUtils.prototype.StampChange = function(endStamp) {
        var surplus = endStamp - this.curTimes;
        var times = "0";
        var d, h, m, s;
        d = Math.floor(surplus / 1e3 / 60 / 60 / 24);
        h = Math.floor(surplus / 1e3 / 60 / 60 % 24);
        m = Math.floor(surplus / 1e3 / 60 % 60);
        s = Math.floor(surplus / 1e3 % 60);
        var H = h < 10 ? "0" + h : h.toString();
        var M = m < 10 ? "0" + m : m.toString();
        var S = s < 10 ? "0" + s : s.toString();
        s >= 0 && (times = d + "\u5929" + H + ":" + M + ":" + S);
        return times;
      };
      NFDateUtils.prototype.StampChange2 = function(endStamp) {
        var surplus = endStamp - this.curTimes;
        var times = "0";
        var d, h, m, s;
        d = Math.floor(surplus / 1e3 / 60 / 60 / 24);
        h = Math.floor(surplus / 1e3 / 60 / 60 % 24);
        m = Math.floor(surplus / 1e3 / 60 % 60);
        s = Math.floor(surplus / 1e3 % 60);
        var H = h < 10 ? "0" + h : h.toString();
        var M = m < 10 ? "0" + m : m.toString();
        var S = s < 10 ? "0" + s : s.toString();
        s >= 0 && (times = d + "\u5929" + H + "\u5c0f\u65f6" + M + "\u5206" + S + "\u79d2");
        return times;
      };
      NFDateUtils.prototype.StampChange3 = function(endStamp) {
        var surplus = endStamp - this.curTimes;
        var times = "0";
        var d, h, m, s;
        d = Math.floor(surplus / 1e3 / 60 / 60 / 24);
        h = Math.floor(surplus / 1e3 / 60 / 60 % 24);
        m = Math.floor(surplus / 1e3 / 60 % 60);
        s = Math.floor(surplus / 1e3 % 60);
        var H = h < 10 ? "0" + h : h.toString();
        var M = m < 10 ? "0" + m : m.toString();
        var S = s < 10 ? "0" + s : s.toString();
        d > 0 && (times = d + "\u5929" + H + "\u5c0f\u65f6" + M + "\u5206" + S + "\u79d2");
        d < 1 && h > 0 && (times = H + "\u5c0f\u65f6" + M + "\u5206" + S + "\u79d2");
        h < 1 && s >= 0 && (times = M + "\u5206" + S + "\u79d2");
        return times;
      };
      NFDateUtils.prototype.StampChangeYear = function(endStamp) {
        var times = "";
        var date = new Date(endStamp);
        var Y = date.getFullYear() + "\u5e74";
        var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "\u6708" : date.getMonth() + 1 + "\u6708";
        var D = date.getDate() + "\u65e5";
        var H = date.getHours() + "\u5c0f\u65f6";
        var B = date.getMinutes() < 10 ? "0" + date.getMinutes() + "\u5206" : date.getMinutes() + "\u5206";
        var S = date.getMinutes() < 10 ? "0" + date.getSeconds() + "\u79d2" : date.getSeconds() + "\u79d2";
        times = Y + M + D + " - " + (H + B + S);
        return times;
      };
      NFDateUtils.prototype.SurplusDay = function(endStamp) {
        if (this.curTimes > endStamp) return 0;
        if (this.curTimes == endStamp) return 1;
        var days = Math.ceil((endStamp - this.curTimes) / 864e5);
        return days;
      };
      NFDateUtils.prototype.Format = function(timeStamp, fmt) {
        void 0 === fmt && (fmt = "yyyy-MM-dd hh:mm:ss");
        var date = new Date(timeStamp);
        var o = {
          "M+": date.getMonth() + 1,
          "d+": date.getDate(),
          "h+": date.getHours(),
          "m+": date.getMinutes(),
          "s+": date.getSeconds(),
          "q+": Math.floor((date.getMonth() + 3) / 3),
          S: date.getMilliseconds()
        };
        /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) {
          var element = o[k].toString();
          fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? element : ("00" + element).substr(("" + element).length));
        }
        return fmt;
      };
      NFDateUtils.prototype.LeftTimeFormat = function(endStamp, fmt) {
        var lefttime = endStamp - this.curTimes;
        lefttime /= 1e3;
        var isOver = lefttime <= 0;
        var o = {
          "d+": isOver ? 0 : Math.floor(lefttime / 86400),
          "h+": isOver ? 0 : Math.floor(lefttime / 3600 % 24),
          "m+": isOver ? 0 : Math.floor(lefttime % 3600 / 60),
          "s+": isOver ? 0 : Math.floor(lefttime % 3600 % 60)
        };
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) {
          var element = o[k].toString();
          fmt = fmt.replace(RegExp.$1, 1 == RegExp.$1.length ? element : ("00" + element).substr(("" + element).length));
        }
        return fmt;
      };
      NFDateUtils.prototype.TimeSpansMin = function(mOutTime, unitLanguage) {
        if (-1 == mOutTime) return "";
        var off = (this.curTimes - mOutTime) / 1e3;
        var timeSpan = NFTimeUtils_1.TimeStamp.Create(off);
        var msg = "";
        msg = timeSpan.day > 0 ? timeSpan.day + " " + unitLanguage[0] : timeSpan.hour > 0 ? timeSpan.hour + " " + unitLanguage[1] : timeSpan.minutes + " " + unitLanguage[2];
        return msg;
      };
      NFDateUtils.prototype.TimeSpansSec = function(mOutTime, unitLanguage) {
        if (-1 == mOutTime) return "";
        var off = (this.curTimes - mOutTime) / 1e3;
        var timeSpan = NFTimeUtils_1.TimeStamp.Create(off);
        var msg = "";
        msg = timeSpan.day > 0 ? timeSpan.day + " " + unitLanguage[0] : timeSpan.hour > 0 ? timeSpan.hour + " " + unitLanguage[1] : timeSpan.minutes > 0 ? timeSpan.minutes + " " + unitLanguage[2] : timeSpan.seconds + " " + unitLanguage[3];
        return msg;
      };
      NFDateUtils.prototype.GetHourAndMinAndSec = function(second) {
        var h = 0, m = 0, s = 0;
        var hStr = "";
        var mStr = "";
        var sStr = "";
        if (second > 0) {
          h = second / 3600;
          hStr = ("0" + Math.floor(h)).slice(-2);
          m = second / 60 % 60;
          mStr = ("0" + Math.floor(m)).slice(-2);
          s = second % 60;
          sStr = ("0" + Math.floor(s)).slice(-2);
        }
        var str = hStr + ":" + mStr + ":" + sStr;
        return str;
      };
      NFDateUtils.prototype.GetMinAndSec = function(second) {
        var m = 0, s = 0;
        var mStr = "";
        var sStr = "";
        if (second > 0) {
          m = second / 60 % 60;
          mStr = ("0" + Math.floor(m)).slice(-2);
          s = second % 60;
          sStr = ("0" + Math.floor(s)).slice(-2);
        }
        var str = mStr + ":" + sStr;
        return str;
      };
      NFDateUtils.prototype.GetDayAndHourAndMinAndSec = function(sec) {
        var s = "";
        var timeSpan = NFTimeUtils_1.TimeStamp.Create(sec);
        s = timeSpan.day > 0 ? timeSpan.day + "\u5929" + timeSpan.hour + "\u5c0f\u65f6" + timeSpan.minutes + "\u5206" + timeSpan.seconds + "\u79d2" : timeSpan.hour > 0 ? timeSpan.hour + "\u5c0f\u65f6" + timeSpan.minutes + "\u5206" + timeSpan.seconds + "\u79d2" : timeSpan.minutes > 0 ? timeSpan.minutes + "\u5206" + timeSpan.seconds + "\u79d2" : timeSpan.seconds > 0 ? timeSpan.seconds + "\u79d2" : "";
        return s;
      };
      return NFDateUtils;
    }();
    exports.default = NFDateUtils;
    cc._RF.pop();
  }, {
    "../../NF": "NF",
    "./NFTimeUtils": "NFTimeUtils"
  } ],
  NFDebug: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6ca48zm1H5Lq7QtufkRQqop", "NFDebug");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../NF");
    var NFDebug = function() {
      function NFDebug() {}
      NFDebug.prototype.Debug = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog) && console.debug.apply(console, args);
      };
      NFDebug.prototype.Info = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog) && console.info.apply(console, args);
      };
      NFDebug.prototype.Warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog) && console.warn.apply(console, args);
      };
      NFDebug.prototype.Error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog) && console.error.apply(console, args);
      };
      NFDebug.prototype.Log = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog) && console.log.apply(console, args);
      };
      NFDebug.prototype.Assert = function(condition) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) data[_i - 1] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowLog && !condition) && console.assert.apply(console, __spreadArrays([ condition ], data));
      };
      NFDebug.prototype.Trace = function() {
        console.trace();
      };
      NFDebug.prototype.Request = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowNetLog) && console.info.apply(console, __spreadArrays([ "[Request]" ], args, [ "color: green" ]));
      };
      NFDebug.prototype.Response = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        (cc.sys.OS_WINDOWS === cc.sys.os || NF_1.default.Config.ShowNetLog) && console.info.apply(console, __spreadArrays([ "[Response]" ], args, [ "color: #9900ff" ]));
      };
      NFDebug.prototype.printDeviceInfo = function() {
        if (NF_1.default.Config.ShowLog && navigator) {
          var agentStr = navigator.userAgent;
          var start = agentStr.indexOf("(");
          var end = agentStr.indexOf(")");
          if (start < 0 || end < 0 || end < start) return;
          var infoStr = agentStr.substring(start + 1, end);
          var device = "", system = "", version = "";
          var infos = infoStr.split(";");
          if (3 == infos.length) {
            device = infos[2];
            var system_info = infos[1].split(" ");
            if (system_info.length >= 2) {
              system = system_info[1];
              version = system_info[2];
            }
          } else if (2 == infos.length) {
            system = infos[0];
            device = infos[0];
            version = infos[1];
          } else {
            system = navigator.platform;
            device = navigator.platform;
            version = infoStr;
          }
          this.Info(system, device, version);
        }
      };
      return NFDebug;
    }();
    exports.default = NFDebug;
    cc._RF.pop();
  }, {
    "../NF": "NF"
  } ],
  NFDictionary: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4afc6ppA1MH6l2yG8xY3oE", "NFDictionary");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFDictionary = function() {
      function NFDictionary(isCache) {
        void 0 === isCache && (isCache = false);
        this.keys = [];
        this.values = [];
        this.isCache = isCache;
      }
      Object.defineProperty(NFDictionary.prototype, "count", {
        get: function() {
          return this.Count();
        },
        enumerable: false,
        configurable: true
      });
      NFDictionary.prototype.Add = function(key, value) {
        this.isCache && (this[key] = value);
        this.keys.push(key);
        return this.values.push(value);
      };
      NFDictionary.prototype.Remove = function(key) {
        var index = this.keys.indexOf(key, 0);
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
        this.isCache && delete this[key];
      };
      NFDictionary.prototype.Count = function() {
        return this.keys.length;
      };
      NFDictionary.prototype.SetDicValue = function(key, value) {
        var index = this.keys.indexOf(key, 0);
        if (-1 != index) {
          this.keys[index] = key;
          this.values[index] = value;
          this.isCache && (this[key] = value);
        } else this.Add(key, value);
      };
      NFDictionary.prototype.TryGetValue = function(key) {
        var index = this.keys.indexOf(key, 0);
        if (-1 != index) return this.values[index];
        return null;
      };
      NFDictionary.prototype.ContainsKey = function(key) {
        var ks = this.keys;
        for (var i = 0; i < ks.length; ++i) if (ks[i] == key) return true;
        return false;
      };
      NFDictionary.prototype.GetKeys = function() {
        return this.keys;
      };
      NFDictionary.prototype.GetValues = function() {
        return this.values;
      };
      NFDictionary.prototype.Clear = function() {
        this.keys = [];
        this.values = [];
      };
      return NFDictionary;
    }();
    exports.default = NFDictionary;
    cc._RF.pop();
  }, {} ],
  NFHotUpdateMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7076d+tQr5IUIuRSlqyL3Ze", "NFHotUpdateMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NFHotUpdateMgr = function(_super) {
      __extends(NFHotUpdateMgr, _super);
      function NFHotUpdateMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mProjectManifest = null;
        _this.mVersionManifest = null;
        _this.mUpdating = false;
        _this.mCanUpdate = false;
        _this.mCanRetry = false;
        _this.mAssetsManager = null;
        _this.mCheckListener = null;
        _this.mUpdateListener = null;
        _this.mFailCount = 0;
        return _this;
      }
      NFHotUpdateMgr.prototype.Init = function() {
        var _this = this;
        if (!cc.sys.isNative) return;
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "blackjack-remote-asset";
        cc.log("Storage path for remote asset : " + storagePath);
        var versionCompareHandle = function(versionA, versionB) {
          cc.log("JS Custom Version Compare: version A is " + versionA + ", version B is " + versionB);
          var vA = versionA.split(".");
          var vB = versionB.split(".");
          for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || "0");
            if (a === b) continue;
            return a - b;
          }
          return vB.length > vA.length ? -1 : 0;
        };
        this.mAssetsManager = new jsb.AssetsManager("", storagePath, versionCompareHandle);
        this.mAssetsManager.setVerifyCallback(function(path, asset) {
          var compressed = asset.compressed;
          var expectedMD5 = asset.md5;
          var relativePath = asset.path;
          var size = asset.size;
          return compressed, true;
        });
        cc.sys.os === cc.sys.OS_ANDROID;
        cc.resources.load("manifest/project", cc.Asset, function(err, asset) {
          if (err) return;
          _this.mProjectManifest = asset;
        });
        cc.resources.load("manifest/version", cc.Asset, function(err, asset) {
          if (err) return;
          _this.mVersionManifest = asset;
        });
      };
      NFHotUpdateMgr.prototype.OnCheckCb = function(event) {
        cc.log("Code: " + event.getEventCode());
        var am = event.getAssetsManagerEx();
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          cc.log("No local manifest file found, hot update skipped.");
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          cc.log("Fail to download manifest file, hot update skipped.");
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          cc.log("Already up to date with the latest remote version. v" + am.getLocalManifest().getVersion() + "->v" + am.getRemoteManifest().getVersion());
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          cc.log("New version found, please try to update. (" + am.getTotalBytes() + ") v" + am.getLocalManifest().getVersion() + "->v" + am.getRemoteManifest().getVersion());
          this.mCanUpdate = true;
          break;

         default:
          return;
        }
        this.mAssetsManager.setEventCallback(null);
        this.mCheckListener && this.mCheckListener(event);
        this.mCheckListener = null;
        this.mUpdating = false;
      };
      NFHotUpdateMgr.prototype.OnUpdateCb = function(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          cc.log("No local manifest file found, hot update skipped.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          var msg = event.getMessage();
          msg && cc.log("Updated file: " + msg);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          cc.log("Fail to download manifest file, hot update skipped.");
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          cc.log("Already up to date with the latest remote version.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          cc.log("Update finished. " + event.getMessage());
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          cc.log("Update failed. " + event.getMessage());
          this.mUpdating = false;
          this.mCanRetry = true;
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          cc.log(event.getMessage());
        }
        this.mUpdateListener && this.mUpdateListener(event);
        if (failed) {
          this.mAssetsManager.setEventCallback(null);
          this.mUpdateListener = null;
          this.mUpdating = false;
        }
        if (needRestart) {
          this.mAssetsManager.setEventCallback(null);
          this.mUpdateListener = null;
          this.mCanUpdate = false;
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this.mAssetsManager.getLocalManifest().getSearchPaths();
          console.log(JSON.stringify(newPaths));
          for (var i = 0; i < newPaths.length; i++) -1 == searchPaths.indexOf(newPaths[i]) && Array.prototype.unshift.apply(searchPaths, [ newPaths[i] ]);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          cc.audioEngine.stopAll();
          cc.game.restart();
        }
      };
      NFHotUpdateMgr.prototype.OnRetry = function() {
        if (!this.mUpdating && this.mCanRetry) {
          this.mCanRetry = false;
          cc.log("Retry failed Assets...");
          this.mAssetsManager.downloadFailedAssets();
        }
      };
      NFHotUpdateMgr.prototype.OnCheckUpdate = function(CheckFun) {
        if (this.mUpdating) {
          cc.log("Checking or updating ...");
          return;
        }
        if (this.mAssetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
          var url = this.mVersionManifest.nativeUrl;
          cc.loader.md5Pipe && (url = cc.loader.md5Pipe.transformURL(url));
          this.mAssetsManager.loadLocalManifest(url);
        }
        if (!this.mAssetsManager.getLocalManifest() || !this.mAssetsManager.getLocalManifest().isLoaded()) {
          cc.log("Failed to load local manifest ...");
          return;
        }
        this.mCheckListener = CheckFun;
        this.mCanUpdate = false;
        this.mUpdating = true;
        this.mAssetsManager.setEventCallback(this.OnCheckCb.bind(this));
        this.mAssetsManager.checkUpdate();
      };
      NFHotUpdateMgr.prototype.OnHotUpdate = function(updateFun) {
        if (this.mAssetsManager && !this.mUpdating) {
          if (!this.mCanUpdate) {
            cc.log("Already up to date with the latest remote version. v" + this.mAssetsManager.getLocalManifest().getVersion() + "->v" + this.mAssetsManager.getRemoteManifest().getVersion());
            return;
          }
          this.mAssetsManager.setEventCallback(this.OnUpdateCb.bind(this));
          if (this.mAssetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.mProjectManifest.nativeUrl;
            cc.loader.md5Pipe && (url = cc.loader.md5Pipe.transformURL(url));
            this.mAssetsManager.loadLocalManifest(url);
          }
          this.mUpdateListener = updateFun;
          this.mFailCount = 0;
          this.mUpdating = true;
          this.mAssetsManager.update();
        }
      };
      NFHotUpdateMgr = __decorate([ ccclass ], NFHotUpdateMgr);
      return NFHotUpdateMgr;
    }(BaseInstance_1.default);
    exports.default = NFHotUpdateMgr;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance"
  } ],
  NFHttpService: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2198eZuuCtI8qSHxxV88gCR", "NFHttpService");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFHttpService = void 0;
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFConstant_NetKey_1 = require("../Definition/NFConstant.NetKey");
    var NFDictionary_1 = require("../Dictionary/NFDictionary");
    var NF_1 = require("../NF");
    var NFCommandService_1 = require("./NFCommandService");
    var NFHttpService = function(_super) {
      __extends(NFHttpService, _super);
      function NFHttpService() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTimeout = 5e3;
        _this.mServerUrl = "";
        _this.mHttpRequest = new NFDictionary_1.default();
        return _this;
      }
      NFHttpService.prototype.ServerUrl = function(url) {
        this.mServerUrl = url;
        NF_1.default.Debug.Log("Http url: " + url);
      };
      Object.defineProperty(NFHttpService.prototype, "CurHttpUrl", {
        get: function() {
          return this.mServerUrl;
        },
        enumerable: false,
        configurable: true
      });
      NFHttpService.prototype.HttpUrl = function(netData) {
        var sUrl = 0 == netData.mUrlStr.length ? this.mServerUrl : netData.mUrlStr;
        var command = "";
        var data = "";
        var postData = null;
        if (netData.mThirdPartyUrl) postData = netData.Serialize(); else {
          command = netData.Command;
          sUrl += command + ".action";
          data = netData.Serialize();
          NF_1.default.Debug.Request("#Http#" + data);
          data = NF_1.default.String.CompressString(data);
          data = NFConstant_NetKey_1.NFConstantNetKey.RequestMsg + "=" + data;
          postData = data;
        }
        var request = new XMLHttpRequest();
        request.timeout = this.mTimeout;
        var headers = [ "Content-Type", "application/x-www-form-urlencoded;charset=utf-8", "lib-encoding" ];
        netData.mThirdPartyUrl && headers.push("Access-Control-Allow-Origin");
        request.open(null != postData && 0 != postData.length ? "POST" : "GET", sUrl, true);
        this.mHttpRequest.Add(request, netData);
        var self = this;
        request.ontimeout = function() {
          if (self.mHttpRequest.ContainsKey(request)) {
            var data_1 = self.mHttpRequest.TryGetValue(request);
            var dataStr = '"' + NFConstant_NetKey_1.NFConstantNetKey.NetDataKey + '":{"mError":-405}';
            var errorStr = '{"responseMsg":{"' + NFConstant_NetKey_1.NFConstantNetKey.ActionName + '":"' + data_1.Command + '","' + NFConstant_NetKey_1.NFConstantNetKey.TimestampKey + '":"' + data_1.Index + '",' + dataStr + " }}";
            NFCommandService_1.NFCommandService.GetInstance().AddExecuteCommandData(errorStr);
            self.mHttpRequest.Remove(request);
          }
        };
        request.onreadystatechange = function() {
          if (4 === request.readyState && request.status >= 200 && request.status < 400) {
            var respone = request.responseText;
            respone = NF_1.default.String.DecompressString(respone);
            NF_1.default.Debug.Response("#Http#" + respone);
            NFCommandService_1.NFCommandService.GetInstance().AddExecuteCommandData(respone);
            self.mHttpRequest.ContainsKey(request) && self.mHttpRequest.Remove(request);
          } else if (self.mHttpRequest.ContainsKey(request)) {
            var data_2 = self.mHttpRequest.TryGetValue(request);
            var dataStr = '"' + NFConstant_NetKey_1.NFConstantNetKey.NetDataKey + '":{"mError":-404}';
            var errorStr = '{"responseMsg":{"' + NFConstant_NetKey_1.NFConstantNetKey.ActionName + '":"' + data_2.Command + '","' + NFConstant_NetKey_1.NFConstantNetKey.TimestampKey + '":"' + data_2.Index + '",' + dataStr + " }}";
            NFCommandService_1.NFCommandService.GetInstance().AddExecuteCommandData(errorStr);
            self.mHttpRequest.Remove(request);
          }
        };
        null != postData && 0 != postData.length ? request.send(postData) : request.send();
      };
      return NFHttpService;
    }(BaseInstance_1.default);
    exports.NFHttpService = NFHttpService;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../Definition/NFConstant.NetKey": "NFConstant.NetKey",
    "../Dictionary/NFDictionary": "NFDictionary",
    "../NF": "NF",
    "./NFCommandService": "NFCommandService"
  } ],
  NFIdentifyUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5ef2yXqkRLOrg0XpVbAgXY", "NFIdentifyUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFIdentifyUtils = function() {
      function NFIdentifyUtils() {
        this.goldBaseNum = 100;
      }
      NFIdentifyUtils.prototype.IsPhone = function(text) {
        return /^1[3-9]\d{9}$/.test(text);
      };
      NFIdentifyUtils.prototype.IsIndiaPhone = function(text) {
        return /^[6-9]\d{9}$/.test(text);
      };
      NFIdentifyUtils.prototype.IsIndiaOPT = function(text) {
        return /^\d+$/.test(text);
      };
      NFIdentifyUtils.prototype.IsChinese = function(text) {
        return /^[\u4E00-\u9FA5]{2,4}$/.test(text);
      };
      NFIdentifyUtils.prototype.IsEmail = function(text) {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/.test(text);
      };
      NFIdentifyUtils.prototype.IsReName = function(text) {
        return /^[\u4E00-\u9FA5]{2,8}$/.test(text);
      };
      NFIdentifyUtils.prototype.idCard = function(text) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
      };
      NFIdentifyUtils.prototype.IsPassWord = function(text, min, max) {
        void 0 === min && (min = 6);
        void 0 === max && (max = 18);
        var reg = new RegExp("^[\\w]{" + min + "," + max + "}$", "i");
        return reg.test(text);
      };
      NFIdentifyUtils.prototype.IsNumber = function(val) {
        var regPos = /^\d+(\.\d+)?$/;
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        return !(!regPos.test(val) && !regNeg.test(val));
      };
      NFIdentifyUtils.prototype.IsPureNumber = function(val) {
        var reg = new RegExp("^[0-9]*$");
        return !!reg.test(val);
      };
      NFIdentifyUtils.prototype.IsAbcNumber = function(text, min, max) {
        void 0 === min && (min = 0);
        void 0 === max && (max = 12);
        if ("" == text) return false;
        if (text.length < min) return false;
        if (text.length > max) return false;
        return /^[a-zA-Z0-9]*$/.test(text);
      };
      NFIdentifyUtils.prototype.NickNameSubEight = function(text) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9\s]+$/.test(text);
        text = b ? text.substring(0, 10) : text.substring(0, 8);
        return text;
      };
      NFIdentifyUtils.prototype.NickNameSubSeven = function(text) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9\s]+$/.test(text);
        text = b ? text.substring(0, 12) : text.substring(0, 7);
        return text;
      };
      NFIdentifyUtils.prototype.NickNameSubSix = function(text) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9\s]+$/.test(text);
        text = b ? text.substring(0, 12) : text.substring(0, 6);
        return text;
      };
      NFIdentifyUtils.prototype.NickNameSubFive = function(text) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9\s]+$/.test(text);
        text = b ? text.substring(0, 10) : text.substring(0, 5);
        return text;
      };
      NFIdentifyUtils.prototype.SaveScoreByLength = function(text, len) {
        void 0 === len && (len = 8);
        var reg = /^[_0-9.L]+$/g;
        var b = reg.test(text);
        len || (len = 8);
        text = text.substring(0, 8);
        return text;
      };
      NFIdentifyUtils.prototype.NickNameSubFour = function(text) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9]+$/.test(text);
        text = b ? text.substring(0, 8) : text.substring(0, 4);
        return text;
      };
      NFIdentifyUtils.prototype.NickNameSubByLength = function(text, enLength, chLength) {
        text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
        var b = /^[_a-zA-Z0-9]+$/.test(text);
        text = b ? text.substring(0, enLength) : text.substring(0, chLength);
        return text;
      };
      NFIdentifyUtils.prototype.SubstrWithEmoji = function(str, start, end) {
        void 0 === start && (start = 0);
        var i = start;
        i = i < 0 ? 0 : i;
        var char;
        var betweenEmoji = function(char) {
          if (between(char, 128513, 128591) || between(char, 128640, 128704) || between(char, 127344, 127569) || between(char, 128512, 128566) || between(char, 128641, 128709) || between(char, 127757, 128359) || between(char, 127744, 128511)) return true;
          return false;
          function between(cur, start, end) {
            return cur >= start && cur <= end;
          }
        };
        if (end && start >= end) return "";
        char = str.codePointAt(Math.max(i - 1, 0));
        char && betweenEmoji(char) && (start = Math.max(start - 1, 0));
        if (end) while (char = str.codePointAt(i)) {
          betweenEmoji(char) && (end += 1);
          i++;
          if (i >= end) break;
        }
        return str.substring(start, end);
      };
      NFIdentifyUtils.prototype.NickNameMacth = function(text) {
        return /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,6}$|^[_a-zA-Z0-9]{1,12}$/.test(text);
      };
      NFIdentifyUtils.prototype.HidePhone = function(text) {
        return text.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
      };
      NFIdentifyUtils.prototype.HideIdCardNumber = function(text) {
        var lastcode = text.charAt(17);
        if ("x" == lastcode || "X" == lastcode) {
          var temp = text.substr(0, 17);
          return temp.replace(/^(\d{3})\d{12}(\d{2})$/, "$1************$2").concat(lastcode);
        }
        return text.replace(/^(\d{3})\d{12}(\d{3})$/, "$1************$2");
      };
      NFIdentifyUtils.prototype.HideIdCardName = function(text) {
        return text.substr(0, 1).concat("**");
      };
      NFIdentifyUtils.prototype.NickNameCh8 = function(text) {
        return /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(text);
      };
      NFIdentifyUtils.prototype.NickNameEN10 = function(text) {
        return /^[_a-zA-Z0-9]*$/.test(text);
      };
      NFIdentifyUtils.prototype.IsChorAbc = function(text) {
        return /^[a-zA-Z\u4e00-\u9fa5]{2,6}$/.test(text);
      };
      NFIdentifyUtils.prototype.IsChorAbcorNum = function(text) {
        return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(text);
      };
      NFIdentifyUtils.prototype.IsBrackets = function(text) {
        for (var x in text) {
          cc.log(text[x]);
          if (" " == text[x]) return false;
        }
        return true;
      };
      NFIdentifyUtils.prototype.IsJSON = function(str) {
        if ("string" == typeof str) try {
          var obj = JSON.parse(str);
          return !("object" != typeof obj || !obj);
        } catch (e) {
          cc.log("error\uff1a" + str + "!!!" + e);
          return false;
        }
        cc.log("It is not a string!");
      };
      NFIdentifyUtils.prototype.AddPreZero = function(num, len) {
        "number" != typeof num && (num = parseInt(num));
        if (len) {
          if (num.toString().length >= len) return num.toString();
          var str = "";
          for (var i = 0; i < len - 1; i++) str += "0";
          return (str + num).slice(-len);
        }
        return "";
      };
      NFIdentifyUtils.prototype.ToDecimal2NoZero = function(num) {
        var f = Math.round(100 * num) / 100;
        var s = f.toString();
        return s;
      };
      NFIdentifyUtils.prototype.ToDecimal1NoZero = function(num) {
        var f = Math.round(10 * num) / 10;
        var s = f.toString();
        return s;
      };
      NFIdentifyUtils.prototype.ShowGameScore = function(score) {
        var s = this.ChangeScoreToSortString(score / this.goldBaseNum);
        return s;
      };
      NFIdentifyUtils.prototype.ChangeScoreToSortString = function(score, thousand) {
        var oriscore = score;
        score = Math.abs(score);
        var scoreStr = score + "";
        score > 99999 && (scoreStr = this.ToDecimal2NoZero(score / 1e5) + "L");
        oriscore < 0 && (scoreStr = "-" + scoreStr);
        return scoreStr;
      };
      NFIdentifyUtils.prototype.FormatRealName = function(name) {
        var newStr;
        if (2 === name.length) newStr = name.substr(0, 1) + "*"; else if (name.length > 2) {
          var char = "";
          for (var i = 0, len = name.length - 2; i < len; i++) char += "*";
          newStr = name.substr(0, 1) + char + name.substr(-1, 1);
        } else newStr = name;
        return newStr;
      };
      NFIdentifyUtils.prototype.GetSubAddstr = function(addstr) {
        if (addstr.length < 1) return addstr;
        var startIndex = addstr.indexOf("\u7701");
        startIndex < 0 && (startIndex = addstr.indexOf("\u56fd"));
        var arr = [ "\u9053", "\u8857", "\u8def", "\u6751" ];
        var endIndex = addstr.length - 1;
        for (var x in arr) {
          var tempIndex = addstr.indexOf(arr[x]);
          if (tempIndex > 0) {
            endIndex = tempIndex;
            break;
          }
        }
        addstr = addstr.substring(startIndex + 1, endIndex + 1);
        return addstr;
      };
      NFIdentifyUtils.prototype.AnalyzeIDCard = function(IDCard) {
        var userCard = IDCard;
        if (!userCard) return 0;
        var yearBirth = Number(userCard.substring(6, 10));
        var monthBirth = Number(userCard.substring(10, 12));
        var dayBirth = Number(userCard.substring(12, 14));
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        (monthNow < monthBirth || monthNow == monthBirth && dayNow < dayBirth) && age--;
        return age;
      };
      NFIdentifyUtils.prototype.DecNumber = function(num, len, wan, yi) {
        void 0 === len && (len = 4);
        void 0 === wan && (wan = "\u4e07");
        void 0 === yi && (yi = "\u4ebf");
        if (!num) return "0";
        if (!len || len < 0) return "0";
        var orinum = num;
        num = Math.abs(num);
        var decNum = "";
        var unit = "";
        if (num >= Math.pow(10, 8)) {
          decNum = (num / Math.pow(10, 8)).toString();
          unit = yi;
        } else if (num >= Math.pow(10, 4)) {
          decNum = (num / Math.pow(10, 4)).toString();
          unit = wan;
        } else decNum = num.toString();
        var decNumStr = decNum.length >= len ? decNum.substring(0, len) : decNum;
        "." == decNumStr[decNumStr.length - 1] && (decNumStr = decNum.substring(0, len - 1));
        return orinum < 0 ? "-" + decNumStr + unit : decNumStr + unit;
      };
      return NFIdentifyUtils;
    }();
    exports.default = NFIdentifyUtils;
    cc._RF.pop();
  }, {} ],
  NFLanguageComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4a9fGScaRBZrA2klMqSwx9", "NFLanguageComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../Definition/NFConstant");
    var NFNotifications_1 = require("../Definition/NFNotifications");
    var NF_1 = require("../NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var LanguageComponent = function(_super) {
      __extends(LanguageComponent, _super);
      function LanguageComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTextId = 0;
        _this.mBundleName = NFConstant_1.default.DefaultBundleName;
        _this.mIsRich = false;
        _this.mParam = null;
        _this.mLanguageParam = null;
        _this.mLabelTF = null;
        _this.mRichTextTF = null;
        return _this;
      }
      LanguageComponent.prototype.onLoad = function() {
        this.mIsRich ? this.mRichTextTF = this.node.getComponent(cc.RichText) : this.mLabelTF = this.node.getComponent(cc.Label);
      };
      LanguageComponent.prototype.onEnable = function() {
        this.ShowText();
        NF_1.default.Notify.Listen(NFNotifications_1.NFNotifications.EventId_NFLanguage, this.OnNotify, this);
      };
      LanguageComponent.prototype.onDisable = function() {
        NF_1.default.Notify.UnListen(NFNotifications_1.NFNotifications.EventId_NFLanguage, this);
      };
      LanguageComponent.prototype.OnNotify = function(event) {
        switch (event.mEventType) {
         case NFNotifications_1.NFNotifications.NFLanguage_LoadComplete:
          this.ShowText();
        }
      };
      LanguageComponent.prototype.ShowText = function() {
        if (0 == this.mTextId) return;
        var info = NF_1.default.Language.GetLanguageInfo(this.mTextId, this.mBundleName);
        if (info) {
          var str = info.mText;
          if (this.mLanguageParam && this.mLanguageParam.length > 0) {
            var strArr = [];
            for (var i = 0; i < this.mLanguageParam.length; i++) {
              var element = this.mLanguageParam[i];
              strArr.push(NF_1.default.Language.GetLanguageText(element));
            }
            str = NF_1.default.String.SplicingArray(info.mText, strArr);
          } else this.mParam && this.mParam.length > 0 && (str = NF_1.default.String.SplicingArray(info.mText, this.mParam));
          this.SetString(str);
        }
      };
      LanguageComponent.prototype.SetString = function(str) {
        this.mLabelTF && (this.mLabelTF.string = str);
        this.mRichTextTF && (this.mRichTextTF.string = str);
      };
      LanguageComponent.prototype.SetTextId = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) param[_i - 2] = arguments[_i];
        this.mTextId = id;
        this.mParam = param;
        bundleName || (bundleName = NFConstant_1.default.DefaultBundleName);
        this.mBundleName = bundleName;
        this.ShowText();
      };
      LanguageComponent.prototype.SetTextIdAny = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) param[_i - 2] = arguments[_i];
        this.mTextId = id;
        this.mLanguageParam = param;
        bundleName || (bundleName = NFConstant_1.default.DefaultBundleName);
        this.mBundleName = bundleName;
        this.ShowText();
      };
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u591a\u8bed\u8a00\u8868Id"
      }) ], LanguageComponent.prototype, "mTextId", void 0);
      __decorate([ property({
        tooltip: "Bundle\u540d\u79f0, \u9ed8\u8ba4: resources"
      }) ], LanguageComponent.prototype, "mBundleName", void 0);
      __decorate([ property({
        tooltip: "\u662f\u5426\u662f\u5bcc\u6587\u672c, \u9ed8\u8ba4: false"
      }) ], LanguageComponent.prototype, "mIsRich", void 0);
      LanguageComponent = __decorate([ ccclass, menu("NFramework/NFLanguageComponent") ], LanguageComponent);
      return LanguageComponent;
    }(cc.Component);
    exports.default = LanguageComponent;
    cc._RF.pop();
  }, {
    "../Definition/NFConstant": "NFConstant",
    "../Definition/NFNotifications": "NFNotifications",
    "../NF": "NF"
  } ],
  NFLanguageLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8a7fg6UAJDUYUtjLOg88wP", "NFLanguageLabel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../Definition/NFConstant");
    var NFNotifications_1 = require("../Definition/NFNotifications");
    var NF_1 = require("../NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LanguageLabel = function(_super) {
      __extends(LanguageLabel, _super);
      function LanguageLabel() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTextId = 0;
        _this.mBundleName = NFConstant_1.default.DefaultBundleName;
        _this.mParam = null;
        return _this;
      }
      LanguageLabel.prototype.onEnable = function() {
        _super.prototype.onEnable.call(this);
        this.ShowText();
        NF_1.default.Notify.Listen(NFNotifications_1.NFNotifications.EventId_NFLanguage, this.OnNotify, this);
      };
      LanguageLabel.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        NF_1.default.Notify.UnListen(NFNotifications_1.NFNotifications.EventId_NFLanguage, this);
      };
      LanguageLabel.prototype.OnNotify = function(event) {
        switch (event.mEventType) {
         case NFNotifications_1.NFNotifications.NFLanguage_LoadComplete:
          this.ShowText();
        }
      };
      LanguageLabel.prototype.ShowText = function() {
        if (0 == this.mTextId) return;
        var info = NF_1.default.Language.GetLanguageInfo(this.mTextId, this.mBundleName);
        if (info) {
          var str = info.mText;
          this.mParam && this.mParam.length > 0 && (str = NF_1.default.String.Splicing(str, this.mParam));
          this.SetString(str);
        }
      };
      LanguageLabel.prototype.SetString = function(str) {
        this.string = str;
      };
      LanguageLabel.prototype.SetTextId = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) param[_i - 2] = arguments[_i];
        this.mTextId = id;
        this.mParam = param;
        this.mBundleName = bundleName;
        this.ShowText();
      };
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u591a\u8bed\u8a00\u8868Id"
      }) ], LanguageLabel.prototype, "mTextId", void 0);
      __decorate([ property({
        tooltip: "Bundle\u540d\u79f0, \u9ed8\u8ba4: resources"
      }) ], LanguageLabel.prototype, "mBundleName", void 0);
      LanguageLabel = __decorate([ ccclass ], LanguageLabel);
      return LanguageLabel;
    }(cc.Label);
    exports.default = LanguageLabel;
    cc._RF.pop();
  }, {
    "../Definition/NFConstant": "NFConstant",
    "../Definition/NFNotifications": "NFNotifications",
    "../NF": "NF"
  } ],
  NFLanguageMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6fa95EmtShE0L6e2yikOoaI", "NFLanguageMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFConstant_1 = require("../Definition/NFConstant");
    var NFNotifications_1 = require("../Definition/NFNotifications");
    var NF_1 = require("../NF");
    var NFLanguageType_1 = require("./NFLanguageType");
    var NFLanguageMgr = function(_super) {
      __extends(NFLanguageMgr, _super);
      function NFLanguageMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mLanguageInfos = {};
        _this.mCurrLanguageType = null;
        return _this;
      }
      Object.defineProperty(NFLanguageMgr.prototype, "LanguageData", {
        get: function() {
          return this.mLanguageInfos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFLanguageMgr.prototype, "CurrLanguageType", {
        get: function() {
          return this.mCurrLanguageType;
        },
        enumerable: false,
        configurable: true
      });
      NFLanguageMgr.prototype.LoadLanguageInfo = function(url, callback, bundleName) {
        var _this = this;
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        NF_1.default.ResLoad.LoadBundleRes(bundleName, url, function(assets) {
          var arr = NF_1.default.DataTables.ParseDataTables(assets.text);
          for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            _this.mLanguageInfos[bundleName] || (_this.mLanguageInfos[bundleName] = {});
            _this.mLanguageInfos[bundleName][element.mId] = element;
          }
          callback(true);
        });
      };
      NFLanguageMgr.prototype.GetLanguageInfo = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        if (!this.mLanguageInfos[bundleName]) {
          NF_1.default.Debug.Error("Can not find bundle data table: " + bundleName);
          return null;
        }
        var info = this.mLanguageInfos[bundleName][id];
        if (info) return info;
        NF_1.default.Debug.Error("Can not find id: " + id);
        return null;
      };
      NFLanguageMgr.prototype.GetLanguageText = function(id, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        var info = this.GetLanguageInfo(id, bundleName);
        if (info) return info.mText;
        return "";
      };
      NFLanguageMgr.prototype.SetCurLanguage = function(url, language, bundleName, save) {
        void 0 === language && (language = NFLanguageType_1.NFLanguageType.None);
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        void 0 === save && (save = true);
        if (NF_1.default.String.IsNullOrEmpty(language)) {
          var str = NF_1.default.Storage.GetString(NFConstant_1.default.CurrLanguageTypeKey);
          NF_1.default.String.IsNullOrEmpty(str) ? this.mCurrLanguageType = NFLanguageType_1.NFLanguageType.English : this.mCurrLanguageType = str;
        } else {
          this.mCurrLanguageType = language;
          save && NF_1.default.Storage.SetString(NFConstant_1.default.CurrLanguageTypeKey, this.mCurrLanguageType);
        }
        this.LoadLanguageInfo(url + "/" + this.mCurrLanguageType, function(loaded) {
          loaded && NF_1.default.Notify.Push(NFNotifications_1.NFNotifications.EventId_NFLanguage, NFNotifications_1.NFNotifications.NFLanguage_LoadComplete);
        }, bundleName);
      };
      NFLanguageMgr.prototype.GetLanguageName = function(language) {
        if (language instanceof Array) {
          var nameArr = [];
          for (var i = 0; i < language.length; i++) {
            var element = language[i];
            nameArr.push(NFLanguageType_1.NFLanguageName.GetInstance()[element]);
          }
          return nameArr;
        }
        return NFLanguageType_1.NFLanguageName.GetInstance()[language];
      };
      return NFLanguageMgr;
    }(BaseInstance_1.default);
    exports.default = NFLanguageMgr;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../Definition/NFConstant": "NFConstant",
    "../Definition/NFNotifications": "NFNotifications",
    "../NF": "NF",
    "./NFLanguageType": "NFLanguageType"
  } ],
  NFLanguageType: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "679c77mkxtCkoq97soE/6nE", "NFLanguageType");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFLanguageName = exports.NFLanguageType = void 0;
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFLanguageType;
    (function(NFLanguageType) {
      NFLanguageType["None"] = "";
      NFLanguageType["Chinese"] = "zh";
      NFLanguageType["English"] = "en";
      NFLanguageType["French"] = "fr";
      NFLanguageType["German"] = "de";
      NFLanguageType["Spain"] = "es";
      NFLanguageType["Italy"] = "it";
      NFLanguageType["Portugal"] = "pt";
      NFLanguageType["Japan"] = "jp";
      NFLanguageType["Russian"] = "ru";
      NFLanguageType["Denmark"] = "dk";
      NFLanguageType["Arabic"] = "ar";
      NFLanguageType["Korean"] = "kr";
      NFLanguageType["Indonesia"] = "id";
      NFLanguageType["Czech"] = "cs";
      NFLanguageType["Greek"] = "el";
      NFLanguageType["Finnish"] = "fl";
      NFLanguageType["Hungarian"] = "hu";
      NFLanguageType["Lithuanian"] = "lt";
      NFLanguageType["Malay"] = "ms";
      NFLanguageType["Dutch"] = "nl";
      NFLanguageType["Polish"] = "pl";
      NFLanguageType["Romanian"] = "ro";
      NFLanguageType["Slovak"] = "sk";
      NFLanguageType["Swedish"] = "se";
      NFLanguageType["TraditionalChinese"] = "cn-SP";
      NFLanguageType["India"] = "in";
      NFLanguageType["Ukrainian"] = "uk";
      NFLanguageType["Kazakh"] = "kz";
      NFLanguageType["Uzbek"] = "uz";
    })(NFLanguageType = exports.NFLanguageType || (exports.NFLanguageType = {}));
    var NFLanguageName = function(_super) {
      __extends(NFLanguageName, _super);
      function NFLanguageName() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.zh = "\u4e2d\u6587";
        _this.en = "English";
        _this.in = "\u0939\u093f\u0902\u0926\u0940";
        _this.ru = "Py\u0441\u0441\u043a\u0438\u0439";
        _this.es = "Espa\xf1ol";
        _this.pt = "Portugu\xeas";
        _this.uk = "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430 \u041c\u043e\u0432\u0430";
        _this.kz = "\u049a\u0430\u0437\u0430\u049b";
        _this.uz = "O'zbek";
        _this.id = "Bahasa Indonesia";
        _this.ar = "\u0627\u0644\u0639\u0631\u0628\u064a\u0629";
        return _this;
      }
      return NFLanguageName;
    }(BaseInstance_1.default);
    exports.NFLanguageName = NFLanguageName;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance"
  } ],
  NFLocalStorage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d9a9vBxqNLzYjYb53FSzd6", "NFLocalStorage");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NFLocalStorage = function(_super) {
      __extends(NFLocalStorage, _super);
      function NFLocalStorage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mUserData = {};
        return _this;
      }
      NFLocalStorage.prototype.encrypt = function(code) {
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        return escape(c);
      };
      NFLocalStorage.prototype.decrypt = function(code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        return c;
      };
      NFLocalStorage.prototype.SetData = function(key, params) {
        if (null === params) return;
        var str = JSON.stringify(params);
        var encodeStr = this.encrypt(str);
        if (this.mUserData[key] != encodeStr) {
          this.mUserData[key] = encodeStr;
          cc.sys.localStorage.setItem(key, encodeStr);
        }
        return encodeStr;
      };
      NFLocalStorage.prototype.GetData = function(key, defaultValue, autoSet) {
        void 0 === defaultValue && (defaultValue = null);
        void 0 === autoSet && (autoSet = false);
        var decipher = null;
        if (this.mUserData[key]) decipher = this.decrypt(this.mUserData[key]); else {
          var str = cc.sys.localStorage.getItem(key);
          if (str) {
            this.mUserData[key] = str;
            decipher = this.decrypt(str);
          } else if (autoSet && null != defaultValue) {
            this.SetData(key, defaultValue);
            return defaultValue;
          }
        }
        decipher = null == decipher ? defaultValue : JSON.parse(decipher);
        return decipher;
      };
      NFLocalStorage.prototype.HasKey = function(key) {
        var context = cc.sys.localStorage.getItem(key);
        if (context && context.length > 0) return true;
        return false;
      };
      NFLocalStorage.prototype.SetInt = function(key, value) {
        value = Math.floor(value);
        this.SetData(key, value);
      };
      NFLocalStorage.prototype.GetInt = function(key, defaultValue, autoSet) {
        void 0 === defaultValue && (defaultValue = 0);
        void 0 === autoSet && (autoSet = false);
        var value = this.GetData(key, defaultValue, autoSet);
        return value;
      };
      NFLocalStorage.prototype.SetBool = function(key, value) {
        this.SetData(key, value);
      };
      NFLocalStorage.prototype.GetBool = function(key, defaultValue, autoSet) {
        void 0 === defaultValue && (defaultValue = false);
        void 0 === autoSet && (autoSet = false);
        var value = this.GetData(key, defaultValue, autoSet);
        return value;
      };
      NFLocalStorage.prototype.SetString = function(key, value) {
        this.SetData(key, value);
      };
      NFLocalStorage.prototype.GetString = function(key, defaultValue, autoSet) {
        void 0 === defaultValue && (defaultValue = "");
        void 0 === autoSet && (autoSet = false);
        var value = this.GetData(key, defaultValue, autoSet);
        return value;
      };
      NFLocalStorage.prototype.RemoveData = function(key) {
        cc.sys.localStorage.removeItem(key);
        this.mUserData[key] && (this.mUserData[key] = null);
      };
      NFLocalStorage.prototype.RemoveAllDatas = function() {
        cc.sys.localStorage.clear();
        this.mUserData = {};
      };
      return NFLocalStorage;
    }(BaseInstance_1.default);
    exports.default = NFLocalStorage;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance"
  } ],
  NFMathUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42a22n/Mi9FMaXlTFdF6tgY", "NFMathUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../NF");
    var NFMathUtils = function() {
      function NFMathUtils() {}
      NFMathUtils.prototype.RandomInt = function(left, right) {
        NF_1.default.Debug.Assert(left < right);
        return Math.floor(this.Random(right, left));
      };
      NFMathUtils.prototype.Approximately = function(left, right, delta) {
        void 0 === delta && (delta = .001);
        return Math.abs(left - right) <= delta;
      };
      NFMathUtils.prototype.GetAngle = function(startPoint, endPoint) {
        var pointX = endPoint.x - startPoint.x;
        var pointY = endPoint.y - startPoint.x;
        var theta = 360 * Math.atan(pointY / pointX) / (2 * Math.PI);
        return theta;
      };
      NFMathUtils.prototype.GetDistance = function(startPoint, endPoint) {
        var pointX = endPoint.x - startPoint.x;
        var pointY = endPoint.y - startPoint.y;
        return Math.sqrt(pointX * pointX + pointY * pointY);
      };
      NFMathUtils.prototype.Bessel2eLevel = function(t, p0, p1, p2) {
        var temp = 1 - t;
        var tx = temp * temp * p0.x + 2 * t * temp * p1.x + t * t * p2.x;
        var ty = temp * temp * p0.y + 2 * t * temp * p1.y + t * t * p2.y;
        return new cc.Vec2(tx, ty);
      };
      NFMathUtils.prototype.Bassel3Level = function(t, p0, p1, p2, p3) {
        var temp = 1 - t;
        var tx = p0.x * temp * temp * temp + 3 * p1.x * t * temp * temp + 3 * p2.x * t * t * temp + p3.x * t * t * t;
        var ty = p0.y * temp * temp * temp + 3 * p1.y * t * temp * temp + 3 * p2.y * t * t * temp + p3.y * t * t * t;
        return new cc.Vec2(tx, ty);
      };
      NFMathUtils.prototype.Random = function(max, min) {
        void 0 === max && (max = 1);
        void 0 === min && (min = 0);
        return 1 == max && 0 == min ? Math.random() : min + Math.random() * (max - min);
      };
      NFMathUtils.prototype.RandomByWeight = function(weights) {
        var index = 0;
        var sum = 0;
        weights.forEach(function(element) {
          sum += element;
        });
        var temp = this.Random(sum);
        sum = 0;
        for (var i = 0; i < weights.length; i++) {
          index = i;
          sum += weights[i];
          if (sum > temp) break;
        }
        return index;
      };
      NFMathUtils.prototype.toDecimal = function(num, decimal) {
        void 0 === decimal && (decimal = 2);
        if (isNaN(num)) return 0;
        decimal = Math.pow(10, decimal);
        var f = Math.round(num * decimal) / decimal;
        return f;
      };
      NFMathUtils.prototype.InverseArithmetic = function(a1, diff, s) {
        if (0 == diff) return 1 * s / a1;
        var a = diff / 2;
        var b = a1 - a;
        var c = -s;
        return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
      };
      NFMathUtils.prototype.Arithmetic = function(a1, diff, n) {
        return (2 * a1 + (n - 1) * diff) * n / 2;
      };
      NFMathUtils.prototype.Log10 = function(num) {
        return Math.floor(Math.log(num) / Math.log(10));
      };
      NFMathUtils.prototype.Mix = function(heap) {
        var len = heap.length;
        for (var i = 0; i < len; i++) {
          var lastIndex = len - 1 - i;
          var index = NF_1.default.Math.RandomInt(0, lastIndex + 1);
          var c = heap[index];
          heap[index] = heap[lastIndex];
          heap[lastIndex] = c;
        }
      };
      NFMathUtils.prototype.PosInCircle = function(pos, radius, angle) {
        var newPos = cc.Vec2.ZERO;
        newPos.x = pos.x + radius * Math.cos(angle * Math.PI / 180);
        newPos.y = pos.y + radius * Math.sin(angle * Math.PI / 180);
        return newPos;
      };
      return NFMathUtils;
    }();
    exports.default = NFMathUtils;
    cc._RF.pop();
  }, {
    "../../NF": "NF"
  } ],
  NFModelBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ef20lFD6pKjpxSF3rlfxkT", "NFModelBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NFModelBase = function(_super) {
      __extends(NFModelBase, _super);
      function NFModelBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mErrorCode = 0;
        return _this;
      }
      NFModelBase = __decorate([ ccclass ], NFModelBase);
      return NFModelBase;
    }(cc.Object);
    exports.default = NFModelBase;
    cc._RF.pop();
  }, {} ],
  NFNativeBannerForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e2b7LO0K9LN7QyuV+eNtrr", "NFNativeBannerForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NFNativeBannerForm = function(_super) {
      __extends(NFNativeBannerForm, _super);
      function NFNativeBannerForm() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NFNativeBannerForm.prototype.onLoad = function() {};
      NFNativeBannerForm.prototype.start = function() {};
      NFNativeBannerForm = __decorate([ ccclass ], NFNativeBannerForm);
      return NFNativeBannerForm;
    }(UIFormLogic_1.default);
    exports.default = NFNativeBannerForm;
    cc._RF.pop();
  }, {
    "../../NFramework/UI/UIFormLogic": "UIFormLogic"
  } ],
  NFNetData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "82876ddxc9EcouqgW/qy1DY", "NFNetData");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFNetData = exports.ERequestConnectType = exports.ERequestStatus = void 0;
    var NFConstant_NetKey_1 = require("../../Definition/NFConstant.NetKey");
    var NFModelBase_1 = require("../../Model/NFModelBase");
    var NF_1 = require("../../NF");
    var ERequestStatus;
    (function(ERequestStatus) {
      ERequestStatus[ERequestStatus["RS_NONE"] = 0] = "RS_NONE";
      ERequestStatus[ERequestStatus["RS_MYDATA"] = 1] = "RS_MYDATA";
      ERequestStatus[ERequestStatus["RS_URL"] = 2] = "RS_URL";
      ERequestStatus[ERequestStatus["RS_END"] = 3] = "RS_END";
    })(ERequestStatus = exports.ERequestStatus || (exports.ERequestStatus = {}));
    var ERequestConnectType;
    (function(ERequestConnectType) {
      ERequestConnectType[ERequestConnectType["RCT_NONE"] = 0] = "RCT_NONE";
      ERequestConnectType[ERequestConnectType["RCT_Http"] = 1] = "RCT_Http";
      ERequestConnectType[ERequestConnectType["RCT_SocketIO"] = 2] = "RCT_SocketIO";
      ERequestConnectType[ERequestConnectType["RCT_WSocket"] = 3] = "RCT_WSocket";
    })(ERequestConnectType = exports.ERequestConnectType || (exports.ERequestConnectType = {}));
    var NFNetData = function(_super) {
      __extends(NFNetData, _super);
      function NFNetData(command, data, callBackFc, queue, asyn, sel, third) {
        void 0 === callBackFc && (callBackFc = null);
        void 0 === queue && (queue = false);
        void 0 === asyn && (asyn = true);
        void 0 === sel && (sel = false);
        void 0 === third && (third = false);
        var _this = _super.call(this) || this;
        _this.mCommand = "";
        _this.mRequestData = null;
        _this.mResponseData = null;
        _this.mCallBackFc = null;
        _this.mAsyn = false;
        _this.mQueue = false;
        _this.mSel = false;
        _this.mUrlStr = "";
        _this.mThirdPartyUrl = false;
        _this.mChannelId = "H5";
        _this.mContentBuff = null;
        _this.AgainSend = false;
        _this.mCommand = command;
        _this.mRequestData = data;
        _this.mResponseData = null;
        _this.mCallBackFc = callBackFc;
        _this.mAsyn = asyn;
        _this.mQueue = queue;
        _this.mSel = sel;
        _this.mUrlStr = "";
        _this.mThirdPartyUrl = third;
        _this.mTime = NF_1.default.Time.GetCurrentTimeMillis();
        _this.mRequestStatus = ERequestStatus.RS_MYDATA;
        _this.mRequestConnectType = ERequestConnectType.RCT_Http;
        _this.mIndex = NFNetData.mCurrentIndex;
        NFNetData.mCurrentIndex++;
        _this.SerializedStr = "";
        return _this;
      }
      Object.defineProperty(NFNetData.prototype, "Index", {
        get: function() {
          return this.mIndex;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFNetData.prototype, "Time", {
        get: function() {
          return this.mTime;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFNetData.prototype, "Command", {
        get: function() {
          return this.mCommand;
        },
        enumerable: false,
        configurable: true
      });
      NFNetData.Create = function(command, data, callBackFc, queue, asyn, sel, third) {
        void 0 === callBackFc && (callBackFc = null);
        void 0 === queue && (queue = false);
        void 0 === asyn && (asyn = true);
        void 0 === sel && (sel = false);
        void 0 === third && (third = false);
        var netData = new NFNetData(command, data, callBackFc, queue, asyn, sel, third);
        return netData;
      };
      NFNetData.prototype.Serialize = function() {
        if (0 != this.SerializedStr.length) return this.SerializedStr;
        var dataStr = "";
        if (this.mQueue) null != this.mRequestData; else {
          dataStr = this.mSel ? this.mRequestData.ToString() : null != this.mRequestData ? JSON.stringify(this.mRequestData) : "{}";
          if (!this.mThirdPartyUrl) {
            var deviceId = "1";
            dataStr = '{"' + NFConstant_NetKey_1.NFConstantNetKey.ActionName + '":"' + this.mCommand + '","' + NFConstant_NetKey_1.NFConstantNetKey.TimestampKey + '":"' + this.Index + '","' + NFConstant_NetKey_1.NFConstantNetKey.ChannelIdKey + '":"' + this.mChannelId + '","' + NFConstant_NetKey_1.NFConstantNetKey.NetDataKey + '":' + dataStr + ',"' + NFConstant_NetKey_1.NFConstantNetKey.DeviceIdKey + '":"' + deviceId + '","' + NFConstant_NetKey_1.NFConstantNetKey.PlayerIdKey + '":"' + NFNetData.PlayerId + '","mAreaId":"' + NFNetData.AreaId + '","' + NFConstant_NetKey_1.NFConstantNetKey.VersionKey + '":"' + NFNetData.mAppVersion + '","' + NFConstant_NetKey_1.NFConstantNetKey.GameTypeKey + '":' + NFNetData.GameType + "}";
          }
        }
        this.mTime = NF_1.default.Time.GetCurrentTimeMillis();
        return dataStr;
      };
      NFNetData.mCurrentIndex = 1;
      NFNetData.mAppVersion = "1.0.0";
      NFNetData.PlayerId = "";
      NFNetData.AreaId = "0";
      NFNetData.GameType = 0;
      return NFNetData;
    }(NFModelBase_1.default);
    exports.NFNetData = NFNetData;
    cc._RF.pop();
  }, {
    "../../Definition/NFConstant.NetKey": "NFConstant.NetKey",
    "../../Model/NFModelBase": "NFModelBase",
    "../../NF": "NF"
  } ],
  NFNotifications: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eacb5IWxmhN05fUvKoQLrlb", "NFNotifications");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFNotifications = void 0;
    var NFNotifications;
    (function(NFNotifications) {
      NFNotifications["EventId_NFUIComponentBase"] = "NFUIComponentBase";
      NFNotifications["NFUICB_CloseFormName"] = "NFUICB_CloseFormName";
      NFNotifications["EventId_NFLanguage"] = "EventId_NFLanguage";
      NFNotifications["NFLanguage_LoadComplete"] = "NFLanguage_LoadComplete";
    })(NFNotifications = exports.NFNotifications || (exports.NFNotifications = {}));
    cc._RF.pop();
  }, {} ],
  NFNotifyMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06624b82HZAFomf8rana6U9", "NFNotifyMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NF_1 = require("../NF");
    var NFNotifyMgr = function(_super) {
      __extends(NFNotifyMgr, _super);
      function NFNotifyMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mEventBuff = {};
        return _this;
      }
      NFNotifyMgr.prototype.Listen = function(eventName, callfunc, target) {
        if ("function" != typeof callfunc) {
          NF_1.default.Debug.Log(">> NFNotifyMgr listen \u76d1\u63a7\u4e8b\u4ef6\u7684\u56de\u8c03\u9700\u8981\u662f\u51fd\u6570 ", eventName);
          return;
        }
        null == this.mEventBuff[eventName] && (this.mEventBuff[eventName] = []);
        this.CheckListen(eventName, target) || NF_1.default.Debug.Warn(">> NFNotifyMgr CheckListen \u68c0\u67e5\u5230\u6709\u91cd\u590d\u6ce8\u518c\u4e8b\u4ef6", eventName);
        var item = {};
        item["_target"] = target;
        item["_callfunc"] = callfunc;
        this.mEventBuff[eventName].push(item);
      };
      NFNotifyMgr.prototype.CheckListen = function(eventName, target) {
        var buff = this.mEventBuff[eventName] || [];
        for (var i = 0; i < buff.length; i++) {
          var item = buff[i];
          if (item && item["_target"] == target) return false;
        }
        return true;
      };
      NFNotifyMgr.prototype.UnListenByObj = function(target) {
        for (var key in this.mEventBuff) {
          var itemlist = this.mEventBuff[key];
          if (null != itemlist) for (var i = itemlist.length - 1; i >= 0; i--) {
            var element = itemlist[i];
            null != element && element._target === target && itemlist.splice(i, 1);
          }
        }
      };
      NFNotifyMgr.prototype.UnListen = function(eventName, target) {
        var itemlist = this.mEventBuff[eventName];
        if (null != itemlist) for (var i = itemlist.length - 1; i >= 0; i--) {
          var element = itemlist[i];
          null != element && element._target === target && itemlist.splice(i, 1);
        }
      };
      NFNotifyMgr.prototype.Notify = function(eventName, data) {
        void 0 === data && (data = null);
        var itemlist = this.mEventBuff[eventName];
        if (null != itemlist) for (var index = itemlist.length - 1; index >= 0; index--) {
          var element = itemlist[index];
          element && element._callfunc && element._target ? element._callfunc.call(element._target, data) : NF_1.default.Debug.Log(">> NFNotifyMgr notify Event callfunc / target null : ", eventName);
        }
      };
      NFNotifyMgr.prototype.Push = function(evtId, key, data) {
        void 0 === data && (data = null);
        var eventArgs = {
          mEventId: evtId,
          mEventType: key,
          mUserData: data
        };
        this.Notify(evtId, eventArgs);
      };
      return NFNotifyMgr;
    }(BaseInstance_1.default);
    exports.default = NFNotifyMgr;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../NF": "NF"
  } ],
  NFPackBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea88bmL3WRNIblXU0dqtUup", "NFPackBase");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WFPackBase = void 0;
    var WFPackBase = function() {
      function WFPackBase() {
        this.cmd = 0;
        this.msgid = 0;
        this.errorcode = 0;
        this.contentBuff = null;
      }
      return WFPackBase;
    }();
    exports.WFPackBase = WFPackBase;
    cc._RF.pop();
  }, {} ],
  NFProtoMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "399c7yTuDtMFqs5hiE77B5E", "NFProtoMap");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFProtoMap = void 0;
    var NFProtoMap = function() {
      function NFProtoMap() {}
      NFProtoMap.Add = function(key, type) {
        this.classMap[key] = type;
      };
      NFProtoMap.Pack = function(head, data) {
        void 0 === data && (data = null);
        var proto = this.protos[head.Command];
        if (null == proto) {
          console.error("\u5c1d\u8bd5\u5c01\u5305\u4e00\u4e2a\u6ca1\u6709\u6ce8\u518c\u7684\u6d88\u606f id=" + head.Command);
          return null;
        }
        var _c = proto.request;
        null != _c && null != data && (head.mContentBuff = this.PackByClasName(_c, data));
        return this.PackByClasName("packbase", head);
      };
      NFProtoMap.UnPack = function(head, buff) {
        void 0 === buff && (buff = null);
        var proto = this.protos[head.Command];
        if (null == proto) {
          console.error("\u5c1d\u8bd5\u89e3\u5305\u4e00\u4e2a\u6ca1\u6709\u6ce8\u518c\u7684\u6d88\u606f id=" + head.Command);
          return null;
        }
        var _c = proto.response;
        if (null != _c) {
          buff = null == buff ? head.mContentBuff : buff;
          return this.UnPackByClasName(_c, buff);
        }
        return null;
      };
      NFProtoMap.UnPackHead = function(buffer) {
        if (null == buffer || 0 == buffer.byteLength) return null;
        return this.UnPackByClasName("packbase", buffer);
      };
      NFProtoMap.PackByClasName = function(cname, data) {
        var c = this.classMap[cname];
        if (null != c) {
          var obj = new c(data);
          return c.encode(obj).finish();
        }
        console.error("\u53cd\u5e8f\u5217\u5316\u4e00\u6761\u6ca1\u6709\u5b9e\u73b0\u7684\u6d88\u606fid\uff1a" + cname);
        return null;
      };
      NFProtoMap.UnPackByClasName = function(cname, buff) {
        var c = this.classMap[cname];
        if (null != c && null != buff) {
          var bf = new Uint8Array(buff);
          return c.decode(bf);
        }
        null == c && console.error("\u53cd\u5e8f\u5217\u5316\u4e00\u6761\u6ca1\u6709\u5b9e\u73b0\u7684\u6d88\u606fid\uff1a" + cname);
        return null;
      };
      NFProtoMap.AddProto = function(proto) {
        if (null != this.protos[proto.id]) {
          console.log(this.protos);
          console.error("\u4e0d\u80fd\u91cd\u590d\u6ce8\u518c\u6d88\u606f  id=" + proto.id);
        }
        this.protos[proto.id] = proto;
      };
      NFProtoMap.protos = {
        1: {
          id: 1,
          request: null,
          response: null
        }
      };
      NFProtoMap.classMap = {};
      return NFProtoMap;
    }();
    exports.NFProtoMap = NFProtoMap;
    cc._RF.pop();
  }, {} ],
  NFResLoad: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fef57gCU2BKb6Wd+/VWARNb", "NFResLoad");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NF_1 = require("../NF");
    var NFResLoad = function(_super) {
      __extends(NFResLoad, _super);
      function NFResLoad() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NFResLoad.prototype.Preload = function() {};
      NFResLoad.prototype.LoadBundleRes = function(bundleName, resUrl, callback, resType) {
        void 0 === resType && (resType = cc.Asset);
        cc.assetManager.loadBundle(bundleName, function(err, bundle) {
          if (err) {
            NF_1.default.Debug.Log("loadBundleRes on cc.assetManager.loadBundle error =", err, bundleName, resUrl);
            return;
          }
          var assets = bundle.get(resUrl, resType);
          assets ? callback(assets) : bundle.load(resUrl, resType, function(err, res) {
            if (err) {
              NF_1.default.Debug.Log("loadBundleRes on bundle.load error =", err, bundleName, resUrl);
              return;
            }
            callback(res);
          });
        });
      };
      NFResLoad.prototype.AsyncLoadBundleRes = function(bundleName, resUrl, resType) {
        var _this = this;
        void 0 === resType && (resType = cc.Asset);
        return new Promise(function(resolve, reject) {
          _this.LoadBundleRes(bundleName, resUrl, function(asset) {
            asset ? resolve(asset) : reject();
          }, resType);
        });
      };
      NFResLoad.prototype.GetBundleRes = function(bundleName, resUrl, resType) {
        void 0 === resType && (resType = cc.Asset);
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
          var assets = bundle.get(resUrl, resType);
          return assets;
        }
        return null;
      };
      NFResLoad.prototype.LoadBundleDir = function(bundleName, resUrl, callback) {
        cc.assetManager.loadBundle(bundleName, function(err, bundle) {
          if (err) {
            console.log("loadBundleDir cc.assetManager.loadBundle error: ", err);
            return;
          }
          bundle.loadDir(resUrl, function(err, assets) {
            if (err) {
              console.log("loadBundleDir bundle.loadDir error: ", err);
              return;
            }
            callback && callback(assets);
          });
        });
      };
      NFResLoad.prototype.LoadScene = function(sceneName) {
        cc.assetManager.loadBundle(sceneName, function(err, bundle) {
          if (err) {
            console.log("loadScene cc.assetManager.loadBundle error: ", err);
            return;
          }
          cc.director.loadScene(sceneName);
        });
      };
      return NFResLoad;
    }(BaseInstance_1.default);
    exports.default = NFResLoad;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../NF": "NF"
  } ],
  NFScoketService: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be40aCrZnZIJ7AHgjQldvpj", "NFScoketService");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NetMgrEventDef = exports.WFScoketService = void 0;
    var BaseInstance_1 = require("../Base/BaseInstance");
    var NF_1 = require("../NF");
    var NFNetData_1 = require("./Model/NFNetData");
    var NFProtoMap_1 = require("./Model/NFProtoMap");
    var NFCommandDelegate_1 = require("./NFCommandDelegate");
    var NFCommandService_1 = require("./NFCommandService");
    var WFScoketService = function(_super) {
      __extends(WFScoketService, _super);
      function WFScoketService() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mWsUrl = "ws://192.168.1.166:1580";
        _this.mSocket = null;
        _this.mSendQueue = new Array();
        _this.lastActivityTime = 0;
        _this.mIsConnecting = false;
        _this.mMustOffline = false;
        _this.mNetRequestDict = null;
        return _this;
      }
      WFScoketService.prototype.InitSocket = function() {
        this.mSocket = new WebSocket(this.mWsUrl);
        this.mSocket.onopen = this.OnOpen;
        this.mSocket.onclose = this.OnClose;
        this.mSocket.onmessage = this.OnMessage;
        this.mSocket.onerror = this.OnError;
      };
      WFScoketService.prototype.ConnectToServer = function(wsUrl) {
        void 0 === wsUrl && (wsUrl = null);
        if (wsUrl) {
          this.mWsUrl = wsUrl;
          NF_1.default.Debug.Log("Socket url: " + wsUrl);
        }
        this.InitSocket();
      };
      WFScoketService.prototype.OnOpen = function(ev) {
        var _this = this;
        NF_1.default.Debug.Log("\u94fe\u63a5\u670d\u52a1\u5668\u6210\u529f");
        this.mIsConnecting = true;
        this.mMustOffline = false;
        NF_1.default.Timer.Remove(this.SendHeartbeat, this);
        NF_1.default.Timer.Remove(this.CheckHeartbeat, this);
        NF_1.default.Timer.Add(15, 0, this.SendHeartbeat, this);
        NF_1.default.Timer.Add(15, 0, this.CheckHeartbeat, this);
        this.lastActivityTime = Date.now();
        NF_1.default.Notify.Notify(NetMgrEventDef.onopen, true);
        setTimeout(function() {
          if (null != _this.mNetRequestDict && _this.mNetRequestDict.count > 0) {
            var netArr = _this.mNetRequestDict.GetValues();
            for (var i = 0; i < netArr.length; i++) {
              var element = netArr[i];
              _this.Send(element);
            }
          }
        }, 100);
      };
      WFScoketService.prototype.IsConnect = function() {
        return null != this.mSocket && this.mSocket.readyState == WebSocket.CONNECTING;
      };
      WFScoketService.prototype.DisConnect = function(msgType, msg) {
        this.mSendQueue && this.mSendQueue.splice(0, this.mSendQueue.length);
        if (this.IsConnect()) {
          this.mSocket.close();
          this.mSocket = null;
        }
        this.mIsConnecting && (this.mIsConnecting = false);
        NF_1.default.Timer.Remove(this.SendHeartbeat, this);
        NF_1.default.Timer.Remove(this.CheckHeartbeat, this);
        var data = {
          type: msgType,
          msg: msg
        };
      };
      WFScoketService.prototype.OnError = function(ev) {
        console.log("\u4e0e\u670d\u52a1\u5668\u8fde\u63a5\u5931\u8d25");
        this.DisConnect(NetMgrEventDef.onerror, "\u4e0e\u670d\u52a1\u5668\u8fde\u63a5\u5931\u8d25");
      };
      WFScoketService.prototype.OnClose = function(ev) {
        console.log("\u4e0e\u670d\u52a1\u5668\u8fde\u63a5\u65ad\u5f00");
        this.DisConnect(NetMgrEventDef.onclose, "\u4e0e\u670d\u52a1\u5668\u8fde\u63a5\u65ad\u5f00");
      };
      WFScoketService.prototype.OnMessage = function(data) {
        var head;
        data = NF_1.default.String.DecompressString(data);
        data = NF_1.default.String.ReplaceSpecialCharacters(data);
        NF_1.default.Debug.Response(data);
        NFCommandService_1.NFCommandService.GetInstance().AddExecuteCommandData(data);
        var jsonData = JSON.parse(data);
        if (jsonData && jsonData.responseMsg) {
          "10002" == jsonData.responseMsg.mCommand && this.ForceOffline();
          if (jsonData.responseMsg.mTimestamp && "" != jsonData.responseMsg.mTimestamp) {
            var index = jsonData.responseMsg.mTimestamp;
            var netData = this.mNetRequestDict.TryGetValue(index);
            if (netData && netData.Command == jsonData.responseMsg.mCommand) {
              this.mNetRequestDict.Remove(index);
              NF_1.default.Debug.Log("\u65ad\u7ebf\u91cd\u8fde\u6536\u5230\u540e\u7aef\u8fd4\u56de\u8865\u5355\u6d88\u606f message:" + data);
            }
          }
        }
      };
      WFScoketService.prototype.SendHeartbeat = function() {
        this.IsConnect() && NFCommandDelegate_1.NFCommandDelegate.Delegate && NFCommandDelegate_1.NFCommandDelegate.Delegate.SendHeartbeat();
      };
      WFScoketService.prototype.CheckHeartbeat = function() {
        Date.now() - this.lastActivityTime > 1e4;
      };
      WFScoketService.prototype.msgTimeOut = function(head) {
        if ("" == head.Command) this.DisConnect(NetMgrEventDef.HeartbeatTimeOut, "\u4e0e\u670d\u52a1\u5668\u8fde\u63a5\u8d85\u65f6"); else {
          head.mErrorCode = -1;
          console.error("\u6d88\u606f\u8fd4\u56de\u8d85\u65f6id=" + head.Command);
        }
      };
      WFScoketService.prototype.Send = function(netData) {
        if (this.IsConnect()) {
          var head = netData;
          head.mErrorCode = 0;
          var data = netData.Serialize();
          NF_1.default.Debug.Request(data);
          data = NF_1.default.String.CompressString(data);
          var sendData = {
            head: head,
            sendTime: Date.now()
          };
          data = NFNetData_1.NFNetData.GameType + data;
          this.mSendQueue.push(sendData);
          this.mSocket.send(data);
        } else console.error("\u7f51\u7edc\u65ad\u5f00\u65e0\u6cd5\u53d1\u9001\u6d88\u606f");
        if (netData.AgainSend && !this.mNetRequestDict.ContainsKey(netData.Index.toString())) {
          this.mNetRequestDict.Add(netData.Index.toString(), netData);
          NF_1.default.Debug.Log("\u53d1\u9001\u8865\u5355\u7c7b\u578b\u6d88\u606f Commond:" + netData.Command + ".Index:" + netData.Index);
        }
      };
      WFScoketService.prototype.distributeMsg = function(head) {
        var msg = NFProtoMap_1.NFProtoMap.UnPack(head);
        null != head.mErrorCode && 0 != head.mErrorCode && console.warn("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef\u7801  \u6d88\u606fid\uff1a" + head.Command + "/errorcode=" + head.mErrorCode);
        if (null == head || null == head.Command) console.warn("\u670d\u52a1\u5668\u8fd4\u56de\u65e0\u6548\u7684cmdid"); else {
          var index = this.mSendQueue.findIndex(function(obj, index, any) {
            return obj.head.Index == head.Index && obj.head.Command == head.Command;
          });
          -1 != index && this.mSendQueue.splice(index, 1);
        }
      };
      WFScoketService.prototype.AddProto = function(pbName, protoNames) {};
      WFScoketService.prototype.ForceOffline = function() {
        this.mMustOffline = true;
        this.DisConnect("", "");
        this.mNetRequestDict.Clear();
      };
      WFScoketService.prototype.Close = function() {
        this.DisConnect("", "");
      };
      return WFScoketService;
    }(BaseInstance_1.default);
    exports.WFScoketService = WFScoketService;
    var NetMgrEventDef = function() {
      function NetMgrEventDef() {}
      NetMgrEventDef.disConnect = "disConnect";
      NetMgrEventDef.onerror = "onerror";
      NetMgrEventDef.onclose = "onclose";
      NetMgrEventDef.onopen = "onopen";
      NetMgrEventDef.HeartbeatTimeOut = "HeartbeatTimeOut";
      return NetMgrEventDef;
    }();
    exports.NetMgrEventDef = NetMgrEventDef;
    cc._RF.pop();
  }, {
    "../Base/BaseInstance": "BaseInstance",
    "../NF": "NF",
    "./Model/NFNetData": "NFNetData",
    "./Model/NFProtoMap": "NFProtoMap",
    "./NFCommandDelegate": "NFCommandDelegate",
    "./NFCommandService": "NFCommandService"
  } ],
  NFSoundInfoBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6952a4HqxZJDJwhAJkmB+rt", "NFSoundInfoBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFModelBase_1 = require("../Model/NFModelBase");
    var NFSoundInfoBase = function(_super) {
      __extends(NFSoundInfoBase, _super);
      function NFSoundInfoBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mId = 0;
        _this.mAssetName = "";
        _this.mVolume = 0;
        _this.mType = 0;
        _this.mPriority = 0;
        _this.mLoop = false;
        return _this;
      }
      return NFSoundInfoBase;
    }(NFModelBase_1.default);
    exports.default = NFSoundInfoBase;
    cc._RF.pop();
  }, {
    "../Model/NFModelBase": "NFModelBase"
  } ],
  NFStringUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9deaV5SENIt64OEsp9RH6h", "NFStringUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../NF");
    var Base64_1 = require("./Base64");
    var NFStringUtils = function() {
      function NFStringUtils() {}
      NFStringUtils.prototype.CompressString = function(str) {
        str = encodeURIComponent(str);
        var data = Base64_1.default.encode(str);
        return data;
      };
      NFStringUtils.prototype.DecompressString = function(str) {
        str = Base64_1.default.decode(str);
        str.indexOf("%") >= 0 && (str = str.replace(/%/g, "0"));
        return decodeURIComponent(str);
      };
      NFStringUtils.prototype.ReplaceSpecialCharacters = function(dataStr) {
        dataStr = dataStr.replace(/Infinity/g, "0");
        return dataStr;
      };
      NFStringUtils.prototype.ToIntArray = function(content, separt) {
        void 0 === separt && (separt = "|");
        var tbl = [];
        this.IsNullOrEmpty(content) || (tbl = content.split(separt));
        var arr = new Array();
        for (var _i = 0, tbl_1 = tbl; _i < tbl_1.length; _i++) {
          var value = tbl_1[_i];
          arr.push(parseInt(value));
        }
        return arr;
      };
      NFStringUtils.prototype.ToFloatArray = function(content, separt) {
        void 0 === separt && (separt = "|");
        var tbl = [];
        this.IsNullOrEmpty(content) || (tbl = content.split(separt));
        var arr = new Array();
        for (var _i = 0, tbl_2 = tbl; _i < tbl_2.length; _i++) {
          var value = tbl_2[_i];
          arr.push(parseFloat(value));
        }
        return arr;
      };
      NFStringUtils.prototype.ToStringArray = function(content, separt) {
        void 0 === separt && (separt = "|");
        var tbl = [];
        this.IsNullOrEmpty(content) || (tbl = content.split(separt));
        return tbl;
      };
      NFStringUtils.prototype.NumberToFixedString = function(num) {
        var str = ("0" + Math.floor(num)).slice(-2);
        return str;
      };
      NFStringUtils.prototype.Splicing = function() {
        var any = [];
        for (var _i = 0; _i < arguments.length; _i++) any[_i] = arguments[_i];
        if (arguments && arguments.length > 1) {
          var i = 1;
          var strs = arguments[0];
          for (;i < arguments.length; i++) {
            var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            strs = strs.replace(re, arguments[i]);
          }
          return strs;
        }
        var str = arguments[0];
        return str;
      };
      NFStringUtils.prototype.SplicingArray = function(str, param) {
        if (param && param.length > 0) {
          var tempStr = str;
          for (var i = 0; i < param.length; i++) {
            var re = new RegExp("\\{" + i + "\\}", "gm");
            tempStr = tempStr.replace(re, param[i]);
          }
          return tempStr;
        }
        return str;
      };
      NFStringUtils.prototype.JsonParse = function(str) {
        str = str.replace(/'/g, '"');
        return JSON.parse(str);
      };
      NFStringUtils.prototype.IsLegalName = function(text) {
        var pattern = "^[\u4e00-\u9fa5a-zA-Z0-9]+$";
        var re = new RegExp(pattern);
        return re.test(text);
      };
      NFStringUtils.prototype.ToNormalString = function(text) {
        if (text) {
          var array = text.split(">");
          var result = "";
          for (var i = 0; i < array.length; i++) {
            var context = array[i];
            context.indexOf("<") >= 0 ? result += context.substring(0, context.indexOf("<")) : result += context;
          }
          return result;
        }
        return "";
      };
      NFStringUtils.prototype.IsNullOrEmpty = function(str) {
        if (!str || "" == str) return true;
        return false;
      };
      NFStringUtils.prototype.ToBigNumberString = function(num) {
        if (num < 1e4) return num.toString();
        var level = NF_1.default.Math.Log10(num);
        var bigLevel = Math.floor(level / 3);
        var digits = 3;
        var temp = Math.floor(num / Math.pow(10, level - digits)) * Math.pow(10, level - digits - 3 * bigLevel);
        var str = NF_1.default.Math.toDecimal(temp, 1).toString();
        switch (bigLevel) {
         case 1:
          str += "K";
          break;

         case 2:
          str += "M";
          break;

         case 3:
          str += "B";
          break;

         case 4:
          str += "T";
        }
        return str;
      };
      return NFStringUtils;
    }();
    exports.default = NFStringUtils;
    cc._RF.pop();
  }, {
    "../../NF": "NF",
    "./Base64": "Base64"
  } ],
  NFTextureRenderBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dd690e9uQVD94AMv0Wk+K6f", "NFTextureRenderBase");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFTextureRenderBase = function() {
      function NFTextureRenderBase() {}
      NFTextureRenderBase.prototype.ToCapture = function(camera) {
        camera ? this.mCamera = camera : this.mCamera || (this.mCamera = this.CreateCamera());
        var texture = new cc.RenderTexture();
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, cc.gfx.RB_FMT_S8);
        this.mCamera.targetTexture = texture;
        this.mTexture = texture;
        return "";
      };
      NFTextureRenderBase.prototype.CreateCamera = function() {
        var scene = cc.director.getScene();
        var node = new cc.Node();
        node.parent = scene;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        var camera = node.addComponent(cc.Camera);
        return camera;
      };
      NFTextureRenderBase.prototype.CreateImg = function() {
        var dataURL = this.mCanvas.toDataURL("image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
      };
      NFTextureRenderBase.prototype.CreateCanvas = function() {
        var width = this.mTexture.width;
        var height = this.mTexture.height;
        if (this.mCanvas) this.ClearCanvas(); else {
          this.mCanvas = document.createElement("canvas");
          this.mCanvas.width = width;
          this.mCanvas.height = height;
        }
        var ctx = this.mCanvas.getContext("2d");
        this.mCamera.render();
        var data = this.mTexture.readPixels();
        var rowBytes = 4 * width;
        for (var row = 0; row < height; row++) {
          var srow = height - 1 - row;
          var imageData = ctx.createImageData(width, 1);
          var start = srow * width * 4;
          for (var i = 0; i < rowBytes; i++) imageData.data[i] = data[start + i];
          ctx.putImageData(imageData, 0, row);
        }
        return this.mCanvas;
      };
      NFTextureRenderBase.prototype.ClearCanvas = function() {
        var ctx = this.mCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
      };
      NFTextureRenderBase.prototype.ShowImage = function(img) {
        var texture = new cc.Texture2D();
        texture.initWithElement(img);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        var node = new cc.Node();
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        node.zIndex = cc.macro.MAX_ZINDEX;
        node.parent = cc.director.getScene();
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        node.x = width / 2;
        node.y = height / 2;
        node.on(cc.Node.EventType.TOUCH_START, function() {
          node.parent = null;
          node.destroy();
        });
        this.CaptureAction(node, width, height);
      };
      NFTextureRenderBase.prototype.CaptureAction = function(capture, width, height) {
        var scaleAction = cc.scaleTo(1, .3);
        var targetPos = cc.v2(width - width / 6, height / 4);
        var moveAction = cc.moveTo(1, targetPos);
        var spawn = cc.spawn(scaleAction, moveAction);
        capture.runAction(spawn);
        var blinkAction = cc.blink(.1, 1);
        cc.director.getScene().getChildByName("Canvas").runAction(blinkAction);
      };
      return NFTextureRenderBase;
    }();
    exports.default = NFTextureRenderBase;
    cc._RF.pop();
  }, {} ],
  NFTimeUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5b74d2dPD5E4YY6qQH6S4DZ", "NFTimeUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TimeStamp = void 0;
    var NF_1 = require("../../NF");
    var NFTimeUtils = function() {
      function NFTimeUtils() {
        this.mBeijingTime = Date.UTC(1970, 1, 1, 8, 0, 0).valueOf();
        this.mStartTime = 0;
        this.mNetTime = 0;
        this.mCheckTimeSinceStart = 0;
        this.mIsNetTime = false;
        this.mStartTimeStamp = 0;
        this.Init();
      }
      Object.defineProperty(NFTimeUtils.prototype, "BeijingTimer", {
        get: function() {
          return Date.now().valueOf();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFTimeUtils.prototype, "TimeSinceStartUp", {
        get: function() {
          return this.BeijingTimer - this.mStartTimeStamp;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NFTimeUtils.prototype, "TimeSinceStartUpSeconds", {
        get: function() {
          return Math.floor(this.TimeSinceStartUp / 1e3);
        },
        enumerable: false,
        configurable: true
      });
      NFTimeUtils.prototype.Init = function() {
        this.mStartTimeStamp = this.GetCurrentTimeMillis();
        this.CheckNowTime();
      };
      NFTimeUtils.prototype.SetNetTime = function(netTime) {
        this.mNetTime = netTime;
        this.mIsNetTime = true;
      };
      Object.defineProperty(NFTimeUtils.prototype, "CurrentNetTime", {
        get: function() {
          if (this.mIsNetTime) {
            var during = this.TimeSinceStartUp - this.mCheckTimeSinceStart;
            var delta = this.mNetTime + during;
            return delta;
          }
          var delta = this.mStartTime + this.TimeSinceStartUp - this.mCheckTimeSinceStart;
          return delta;
        },
        enumerable: false,
        configurable: true
      });
      NFTimeUtils.prototype.GetCurrentTimeMillis = function() {
        return this.CurrentNetTime;
      };
      NFTimeUtils.prototype.CheckNowTime = function() {
        this.mIsNetTime = false;
        this.mStartTime = Date.now().valueOf();
        this.mCheckTimeSinceStart = this.TimeSinceStartUp;
      };
      Object.defineProperty(NFTimeUtils.prototype, "CurrentTimeSeconds", {
        get: function() {
          return Math.floor(this.GetCurrentTimeMillis() / 1e3);
        },
        enumerable: false,
        configurable: true
      });
      NFTimeUtils.prototype.IsSameDay = function(millsLeft, millsRight) {
        var leftDate = new Date(millsLeft);
        var rightDate = new Date(millsRight);
        var flag = false;
        leftDate.getDay() === rightDate.getDay() && leftDate.getMonth() === rightDate.getMonth() && leftDate.getFullYear() === rightDate.getFullYear() && (flag = true);
        return flag;
      };
      NFTimeUtils.prototype.IsToday = function(mills) {
        return this.IsSameDay(this.CurrentNetTime, mills);
      };
      NFTimeUtils.prototype.IsNewDay = function(setDayTime) {
        void 0 === setDayTime && (setDayTime = true);
        var time = NF_1.default.Storage.GetString("NFDayTime");
        var isNewDay = NF_1.default.String.IsNullOrEmpty(time) || !this.IsToday(Date.parse(time));
        isNewDay && setDayTime && NF_1.default.Storage.SetString("NFDayTime", NF_1.default.Date.Format(this.CurrentNetTime));
        return isNewDay;
      };
      return NFTimeUtils;
    }();
    exports.default = NFTimeUtils;
    var TimeStamp = function() {
      function TimeStamp() {
        this.day = 0;
        this.hour = 0;
        this.minutes = 0;
        this.seconds = 0;
      }
      TimeStamp.Create = function(secs) {
        var stamp = new TimeStamp();
        stamp.day = Math.floor(secs / 86400);
        var restSecsAfterDay = secs % 86400;
        stamp.hour = Math.floor(restSecsAfterDay / 3600);
        var restSecsAfterHour = secs % 3600;
        stamp.minutes = Math.floor(restSecsAfterHour / 60);
        stamp.seconds = Math.floor(restSecsAfterHour % 60);
        return stamp;
      };
      return TimeStamp;
    }();
    exports.TimeStamp = TimeStamp;
    cc._RF.pop();
  }, {
    "../../NF": "NF"
  } ],
  NFTimer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcc72pNooZAmbAnUoCocuDq", "NFTimer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TimeDelayData = void 0;
    var BaseInstance_1 = require("../../Base/BaseInstance");
    var NF_1 = require("../../NF");
    var NFTimer = function(_super) {
      __extends(NFTimer, _super);
      function NFTimer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.repeat = 0;
        _this.items = new Array();
        _this.toAdd = new Array();
        _this.toRemove = new Array();
        _this.pool = new Array();
        _this.lastTime = 0;
        _this.deltaTime = 0;
        return _this;
      }
      NFTimer.prototype.Init = function() {
        var _this = this;
        this.lastTime = NF_1.default.Time.GetCurrentTimeMillis();
        setInterval(function() {
          _this.update();
        });
      };
      NFTimer.prototype.GetFromPool = function() {
        var t = null;
        t = this.pool.length > 0 ? this.pool.pop() : new TimeDelayData();
        return t;
      };
      NFTimer.prototype.ReturnToPool = function(t) {
        t.set(0, 0, null, null, null);
        t.elapsed = 0;
        t.deleted = false;
        this.pool.push(t);
      };
      NFTimer.prototype.Exists = function(callback, thisObj) {
        var t = this.toAdd.find(function(value, index, obj) {
          return value.callback == callback && value.thisObj == thisObj;
        });
        if (null != t) return true;
        t = this.items.find(function(value, index, obj) {
          return value.callback == callback && value.thisObj == thisObj;
        });
        if (null != t && !t.deleted) return true;
        return false;
      };
      NFTimer.prototype.Add = function(interval, repeat, callback, thisObj, callbackParam) {
        void 0 === callbackParam && (callbackParam = null);
        var t = null;
        t = this.items.find(function(value, index, obj) {
          return value.callback == callback && value.thisObj == thisObj;
        });
        null == t && (t = this.toAdd.find(function(value, index, obj) {
          return value.callback == callback && value.thisObj == thisObj;
        }));
        null == t && (t = this.GetFromPool());
        if (t) {
          this.toAdd.push(t);
          t.set(interval, repeat, callback, thisObj, callbackParam);
          t.deleted = false;
          t.elapsed = 0;
        }
      };
      NFTimer.prototype.AddUpdate = function(callback, thisObj, callbackParam) {
        void 0 === callbackParam && (callbackParam = null);
        this.Add(.001, 0, callback, thisObj, callbackParam);
      };
      NFTimer.prototype.Remove = function(callback, thisObj) {
        var findindex = -1;
        var t = this.toAdd.find(function(value, index, obj) {
          if (value.callback == callback && value.thisObj == thisObj) {
            findindex = index;
            return true;
          }
          return false;
        });
        if (null != t) {
          this.toAdd.splice(findindex, 1);
          this.ReturnToPool(t);
        }
        t = this.items.find(function(value, index, obj) {
          return value.callback == callback && value.thisObj == thisObj;
        });
        null != t && (t.deleted = true);
      };
      NFTimer.prototype.RemoveByObj = function(thisObj) {
        for (var index = this.toAdd.length - 1; index >= 0; index--) {
          var element = this.toAdd[index];
          if (element.thisObj == thisObj) {
            this.toAdd.splice(index, 1);
            this.ReturnToPool(element);
          }
        }
        for (var index = this.items.length - 1; index >= 0; index--) {
          var element = this.items[index];
          element.thisObj == thisObj && (element.deleted = true);
        }
      };
      NFTimer.prototype.CancelAllTimers = function() {
        var _this = this;
        this.toAdd.forEach(function(element) {
          _this.ReturnToPool(element);
        });
        this.toAdd = [];
        this.items.forEach(function(element) {
          _this.ReturnToPool(element);
        });
        this.items = [];
      };
      NFTimer.prototype.update = function() {
        this.deltaTime = (NF_1.default.Time.GetCurrentTimeMillis() - this.lastTime) / 1e3;
        this.lastTime = NF_1.default.Time.GetCurrentTimeMillis();
        for (var index = 0; index < this.items.length; index++) {
          var t = this.items[index];
          if (t.deleted) {
            this.toRemove.push(t);
            continue;
          }
          t.elapsed += this.deltaTime;
          if (t.elapsed < t.interval) continue;
          t.elapsed = 0;
          if (t.repeat > 0) {
            t.repeat--;
            if (0 == t.repeat) {
              t.deleted = true;
              this.toRemove.push(t);
            }
          }
          this.repeat = t.repeat;
          if (null != t.callback) try {
            t.callback.call(t.thisObj, t.param);
          } catch (error) {
            console.error(error);
          }
        }
        var len = this.toRemove.length;
        while (len) {
          var t = this.toRemove.pop();
          if (t) {
            var index = this.items.indexOf(t);
            if (t.deleted && -1 != index) {
              this.items.splice(index, 1);
              this.ReturnToPool(t);
            }
            len--;
          }
        }
        len = this.toAdd.length;
        while (len) {
          var t = this.toAdd.pop();
          t && this.items.push(t);
          len--;
        }
      };
      return NFTimer;
    }(BaseInstance_1.default);
    exports.default = NFTimer;
    var TimeDelayData = function() {
      function TimeDelayData() {
        this.repeat = 0;
        this.interval = 0;
        this.param = null;
        this.callback = null;
        this.thisObj = null;
        this.deleted = false;
        this.elapsed = 0;
      }
      TimeDelayData.prototype.set = function(interval, repeat, callback, thisObj, param) {
        this.interval = interval;
        this.repeat = repeat;
        this.callback = callback;
        this.param = param;
        this.thisObj = thisObj;
      };
      return TimeDelayData;
    }();
    exports.TimeDelayData = TimeDelayData;
    cc._RF.pop();
  }, {
    "../../Base/BaseInstance": "BaseInstance",
    "../../NF": "NF"
  } ],
  NFUIFormInfoBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b3ef45+EBCqZXfT0ZCDJhL", "NFUIFormInfoBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFModelBase_1 = require("../Model/NFModelBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NFUIFormInfoBase = function(_super) {
      __extends(NFUIFormInfoBase, _super);
      function NFUIFormInfoBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mId = 0;
        _this.mRootName = "";
        _this.mModuleName = "";
        _this.mAssetName = "";
        _this.mUIGroupName = "";
        _this.mAllowMultiInstance = false;
        _this.mPauseCoveredUIForm = false;
        return _this;
      }
      NFUIFormInfoBase = __decorate([ ccclass ], NFUIFormInfoBase);
      return NFUIFormInfoBase;
    }(NFModelBase_1.default);
    exports.default = NFUIFormInfoBase;
    cc._RF.pop();
  }, {
    "../Model/NFModelBase": "NFModelBase"
  } ],
  NFUIUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bcd274KWQ5A4IAyVvHJ3p/O", "NFUIUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../../Definition/NFConstant");
    var NF_1 = require("../../NF");
    var NFUIUtils = function() {
      function NFUIUtils() {}
      NFUIUtils.prototype.ReplaceUISkin = function(obj, imgUrl, bundleName) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        NF_1.default.ResLoad.LoadBundleRes(bundleName, imgUrl, function(spriteFrame) {
          obj.spriteFrame = spriteFrame;
        }, cc.SpriteFrame);
      };
      NFUIUtils.prototype.GetObjByPath = function(root, path) {
        if (!root) return null;
        var nameArr = NF_1.default.String.ToStringArray(path, "/");
        var idx = 0;
        var curNode = root;
        var child = null;
        do {
          child = curNode.getChildByName(nameArr[idx]);
          if (null == child) {
            NF_1.default.Debug.Log("\u8def\u5f84\u914d\u7f6e\u9519\u8bef-\u627e\u4e0d\u70b9\u8282\u70b9\u540d\u79f0: " + nameArr[idx]);
            break;
          }
          curNode = child;
          idx++;
        } while (idx < nameArr.length);
        return child;
      };
      NFUIUtils.prototype.AdaptFontSize = function(label, maxWidth, textStr) {
        textStr ? label.string = textStr : textStr = label.string;
        if (label.node.width > maxWidth) while (label.node.width > maxWidth) {
          label.fontSize = label.fontSize - 1;
          label.string = textStr;
        }
      };
      NFUIUtils.prototype.BlockInputEvents = function(node, enabled) {
        void 0 === enabled && (enabled = true);
        var blockInput = node.getComponent(cc.BlockInputEvents);
        !blockInput && enabled ? node.addComponent(cc.BlockInputEvents) : blockInput && (blockInput.enabled = enabled);
      };
      NFUIUtils.prototype.AdaptWidget = function(node) {
        var widget = node.getComponent(cc.Widget);
        if (!widget) {
          widget = node.addComponent(cc.Widget);
          widget.isAlignLeft = true;
          widget.isAlignRight = true;
          widget.isAlignTop = true;
          widget.isAlignBottom = true;
          widget.top = 0;
          widget.bottom = 0;
          widget.left = 0;
          widget.bottom = 0;
          widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
          widget.updateAlignment();
        }
      };
      NFUIUtils.prototype.SetGrey = function(node, grey) {
        var s = node.getComponentsInChildren(cc.RenderComponent);
        for (var i = 0; i < s.length; i++) this.ResetMaterial(grey ? "2d-gray-sprite" : "2d-sprite", s[i]);
      };
      NFUIUtils.prototype.ResetMaterial = function(materialName, renderComponent) {
        var material = cc.Material.getBuiltinMaterial(materialName);
        renderComponent.setMaterial(0, material);
      };
      NFUIUtils.prototype.UpdateMoneyAni = function(label, target, curnum, callbreak, curType) {
        void 0 === curType && (curType = "");
        var difference = target - curnum;
        var absDifference = Math.abs(difference);
        var changeTimes = absDifference < 8 ? absDifference : 8;
        var changeUnit = absDifference < 8 ? 1 : Math.floor(difference / 8);
        label.unscheduleAllCallbacks();
        for (var i = 0; i < changeTimes; i++) (function(i) {
          label.scheduleOnce(function() {
            label.string = curType + (curnum += changeUnit);
            if (i == changeTimes - 1) {
              label.string = curType + target;
              callbreak && callbreak();
            }
          }, (i + 1) / 10);
        })(i);
      };
      NFUIUtils.prototype.AdaptFullScreen = function(node) {
        var screenSize = cc.view.getVisibleSize();
        var bgSize = node.getContentSize();
        var scaleW = screenSize.width / bgSize.width;
        var scaleH = screenSize.height / bgSize.height;
        node.scale = 1;
        (scaleW > 1 || scaleH > 1) && (node.scale = scaleW > scaleH ? scaleW : scaleH);
      };
      return NFUIUtils;
    }();
    exports.default = NFUIUtils;
    cc._RF.pop();
  }, {
    "../../Definition/NFConstant": "NFConstant",
    "../../NF": "NF"
  } ],
  NF: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1dd7HjUitDpIJaKgA3kAOg", "NF");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConfig_1 = require("./Config/NFConfig");
    var NFDebug_1 = require("./Config/NFDebug");
    var NFDataTables_1 = require("./DataBase/NFDataTables");
    var NFLocalStorage_1 = require("./DataBase/NFLocalStorage");
    var NFHotUpdateMgr_1 = require("./HotUpdate/NFHotUpdateMgr");
    var NFNotifyMgr_1 = require("./Notification/NFNotifyMgr");
    var NFResLoad_1 = require("./ResModule/NFResLoad");
    var NFAudioManager_1 = require("./Audio/NFAudioManager");
    var NFMathUtils_1 = require("./Util/Math/NFMathUtils");
    var NFIdentifyUtils_1 = require("./Util/String/NFIdentifyUtils");
    var NFStringUtils_1 = require("./Util/String/NFStringUtils");
    var NFDateUtils_1 = require("./Util/Time/NFDateUtils");
    var NFTimer_1 = require("./Util/Time/NFTimer");
    var NFTimeUtils_1 = require("./Util/Time/NFTimeUtils");
    var NFBtnUtils_1 = require("./Util/UI/NFBtnUtils");
    var NFUIUtils_1 = require("./Util/UI/NFUIUtils");
    var NFLanguageMgr_1 = require("./Language/NFLanguageMgr");
    var NFCaptrueMgr_1 = require("./Util/UI/Capture/NFCaptrueMgr");
    var NFBasePlatformMgr_1 = require("./Platform/NFBasePlatformMgr");
    var NFLanguageType_1 = require("./Language/NFLanguageType");
    var NFArrayUtils_1 = require("./Util/Array/NFArrayUtils");
    var NF = function() {
      function NF() {}
      Object.defineProperty(NF, "UIUtils", {
        get: function() {
          NF.mUIUtils || (NF.mUIUtils = new NFUIUtils_1.default());
          return NF.mUIUtils;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Config", {
        get: function() {
          NF.mConfig || (NF.mConfig = new NFConfig_1.default());
          return NF.mConfig;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Math", {
        get: function() {
          NF.mMath || (NF.mMath = new NFMathUtils_1.default());
          return NF.mMath;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Time", {
        get: function() {
          NF.mTime || (NF.mTime = new NFTimeUtils_1.default());
          return NF.mTime;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Date", {
        get: function() {
          NF.mDate || (NF.mDate = new NFDateUtils_1.default());
          return NF.mDate;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "BtnUtils", {
        get: function() {
          NF.mBtnUtils || (NF.mBtnUtils = new NFBtnUtils_1.default());
          return NF.mBtnUtils;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Identify", {
        get: function() {
          NF.mIdentify || (NF.mIdentify = new NFIdentifyUtils_1.default());
          return NF.mIdentify;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Debug", {
        get: function() {
          NF.mDebug || (NF.mDebug = new NFDebug_1.default());
          return NF.mDebug;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "String", {
        get: function() {
          NF.mString || (NF.mString = new NFStringUtils_1.default());
          return NF.mString;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Array", {
        get: function() {
          NF.mArray || (NF.mArray = new NFArrayUtils_1.default());
          return NF.mArray;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Audio", {
        get: function() {
          return NFAudioManager_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "DataTables", {
        get: function() {
          return NFDataTables_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Platform", {
        get: function() {
          return NFBasePlatformMgr_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Notify", {
        get: function() {
          return NFNotifyMgr_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Storage", {
        get: function() {
          return NFLocalStorage_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "HotUpdate", {
        get: function() {
          return NFHotUpdateMgr_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Timer", {
        get: function() {
          return NFTimer_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "ResLoad", {
        get: function() {
          return NFResLoad_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Language", {
        get: function() {
          return NFLanguageMgr_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "LanguageName", {
        get: function() {
          return NFLanguageType_1.NFLanguageName.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(NF, "Capture", {
        get: function() {
          return NFCaptrueMgr_1.default.GetInstance();
        },
        enumerable: false,
        configurable: true
      });
      NF.Init = function() {
        NF.Time;
      };
      return NF;
    }();
    exports.default = NF;
    NF.Init();
    cc._RF.pop();
  }, {
    "./Audio/NFAudioManager": "NFAudioManager",
    "./Config/NFConfig": "NFConfig",
    "./Config/NFDebug": "NFDebug",
    "./DataBase/NFDataTables": "NFDataTables",
    "./DataBase/NFLocalStorage": "NFLocalStorage",
    "./HotUpdate/NFHotUpdateMgr": "NFHotUpdateMgr",
    "./Language/NFLanguageMgr": "NFLanguageMgr",
    "./Language/NFLanguageType": "NFLanguageType",
    "./Notification/NFNotifyMgr": "NFNotifyMgr",
    "./Platform/NFBasePlatformMgr": "NFBasePlatformMgr",
    "./ResModule/NFResLoad": "NFResLoad",
    "./Util/Array/NFArrayUtils": "NFArrayUtils",
    "./Util/Math/NFMathUtils": "NFMathUtils",
    "./Util/String/NFIdentifyUtils": "NFIdentifyUtils",
    "./Util/String/NFStringUtils": "NFStringUtils",
    "./Util/Time/NFDateUtils": "NFDateUtils",
    "./Util/Time/NFTimeUtils": "NFTimeUtils",
    "./Util/Time/NFTimer": "NFTimer",
    "./Util/UI/Capture/NFCaptrueMgr": "NFCaptrueMgr",
    "./Util/UI/NFBtnUtils": "NFBtnUtils",
    "./Util/UI/NFUIUtils": "NFUIUtils"
  } ],
  PlatformInterface: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ece54cd3spPyYUrr9Si7qE4", "PlatformInterface");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlatformInterface = function(_super) {
      __extends(PlatformInterface, _super);
      function PlatformInterface() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PlatformInterface.prototype.InitGame = function() {};
      PlatformInterface.prototype.InitSdk = function(type) {};
      PlatformInterface.prototype.CreateAd = function(type, adUnitId) {};
      PlatformInterface.prototype.ShowAd = function(type, placeId) {};
      PlatformInterface.prototype.CloseAd = function(type) {};
      PlatformInterface.prototype.CheckAd = function(type, placeId) {
        return false;
      };
      PlatformInterface.prototype.OnEventCount = function(string, param) {};
      PlatformInterface.prototype.GetAppVersion = function() {
        return "1.0.1";
      };
      PlatformInterface.prototype.CustomMethod = function(actionName, param) {};
      PlatformInterface.prototype.CustomMethodByString = function(actionName, param) {
        return "";
      };
      PlatformInterface.prototype.CustomMethodN = function(eventName, actionName, param) {};
      PlatformInterface.prototype.CustomMethodByStringN = function(eventName, actionName, param) {
        return "";
      };
      PlatformInterface.prototype.IsIphoneX = function() {
        return false;
      };
      return PlatformInterface;
    }(cc.Component);
    exports.default = PlatformInterface;
    cc._RF.pop();
  }, {} ],
  PlatformMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9bba9/fUoxBEqUqfJ1jDW+L", "PlatformMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var NFBasePlatformMgr_1 = require("../NFramework/Platform/NFBasePlatformMgr");
    var AdManger_1 = require("./AdManger");
    var PlatformMgr = function(_super) {
      __extends(PlatformMgr, _super);
      function PlatformMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mFBCData = {};
        _this.mAppActivity = "org/cocos2dx/javascript/AppActivity";
        _this.mJniPath = "org/cocos2dx/javascript/service/JniService";
        return _this;
      }
      PlatformMgr.prototype.Init = function() {
        this.ClassPath = this.mJniPath;
        _super.prototype.Init.call(this);
      };
      PlatformMgr.prototype.ShowAd = function(type, placeId) {
        void 0 === placeId && (placeId = "");
        cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative && _super.prototype.ShowAd.call(this, type, placeId);
      };
      PlatformMgr.OnVideoAdReward = function(params) {
        var parameters = params.split("#");
        var type = parseInt(parameters[0]);
        var status = parseInt(parameters[1]);
        var placeId = parameters[2];
        AdManger_1.default.GetInstance().OnVideoAdReward(type, status, placeId);
      };
      PlatformMgr.AdStatusListen = function(params) {
        var parameters = params.split("#");
        var status = parseInt(parameters[0]);
        var type = parseInt(parameters[1]);
        var placeId = parameters[2];
        AdManger_1.default.GetInstance().OnVideoAdReward(type, status, placeId);
      };
      PlatformMgr.prototype.OnEventCount = function(eventId, paramKey, paramVal) {
        void 0 === paramKey && (paramKey = "");
        void 0 === paramVal && (paramVal = "");
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          var param = paramKey;
          if ("" != paramKey && "" != paramVal) {
            param = {};
            param[paramKey] = paramVal;
            param = JSON.stringify(param);
          }
          _super.prototype.OnEventCount.call(this, eventId, param);
        }
      };
      PlatformMgr.prototype.Pay = function(data, callbreak) {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          jsb.reflection.callStaticMethod(this.mJniPath, "JniPay", "(I)V", data);
          GameDataMgr_1.default.GetInstance().setData("IsPaying", true);
        } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Stay tuned!");
      };
      PlatformMgr.prototype.CheckSubs = function() {
        cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative && jsb.reflection.callStaticMethod(this.mJniPath, "JniCheckSubs", "()V");
      };
      PlatformMgr.prototype.DecodeSkuDetail = function(params) {
        var skus = params.split("#");
        if (skus && skus.length > 0) for (var i = 0; i < skus.length; i++) {
          var skuItem = skus[i];
          var info = skuItem.split(",");
          var obj = {};
          obj.id = info[0];
          obj.type = info[1];
          obj.price = info[2];
          obj.priceAmountMicros = Number(info[3]);
          obj.priceCurrencyCode = info[4];
          GameDataMgr_1.default.GetInstance().setData("Sku" + obj.id, obj);
        }
      };
      PlatformMgr.prototype.OnPayInfo = function(info, sku, time, state) {
        var ms = 1;
        13 == time.length && (ms = 1e3);
        var endTime = Number(time) + 2592e3 * ms;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.SkuTime + sku, endTime);
        GameDataMgr_1.default.GetInstance().setData("SkuEffective" + sku, 1);
        if (info && 2 == info.mType) if (2 == info.mTag2 || 1 == info.mTag2) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, info);
          SkinMgr_1.default.GetInstance().SetSkinUnlock(info);
        } else {
          var gold = info.mNumber;
          PlayerMgr_1.default.Instance.AddGold(gold);
          var data = {
            mGold: gold,
            mExp: 0,
            mFunc: null,
            mFormid: null
          };
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, data);
        }
      };
      PlatformMgr.prototype.OnPaySubInfo = function(info, sku, time, state) {
        GameDataMgr_1.default.GetInstance().setData("SkuEffective" + info.mPayId, 0);
        NF_1.default.Debug.Log(">>>> OnPaySubInfo ", state, time, sku);
        if (time <= 0) return;
        if (state == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
          var ms = 1;
          13 == time.length && (ms = 1e3);
          var endTime = Number(time) + 2592e3 * ms;
          NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.SkuTime + sku, endTime);
          GameDataMgr_1.default.GetInstance().setData("SkuEffective" + sku, 1);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        }
      };
      PlatformMgr.OnPayCallBack = function(params) {
        NF_1.default.Debug.Log("callbreak OnPayCallBack>>>>" + params);
        var parameters = params.split("#");
        var sku = parameters[0];
        var time = parameters[1];
        var state = Number(parameters[2]);
        if (state == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
          var mShopData_1 = null;
          var list = NF_1.default.DataTables.GetAllInfos("ShopInfo");
          list.forEach(function(item) {
            item.mPayId == sku && (mShopData_1 = item);
          });
          if (mShopData_1) {
            1 == mShopData_1.mType && PlatformMgr.GetInstance().OnPaySubInfo(mShopData_1, sku, time, state);
            2 == mShopData_1.mType && PlatformMgr.GetInstance().OnPayInfo(mShopData_1, sku, time, state);
          }
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
        }
        NF_1.default && NF_1.default.Notify && NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Return_ShopPayCallBack, state);
      };
      PlatformMgr.OnSubInit = function(params) {
        NF_1.default.Debug.Log(">>>> OnSubInit:: ", params);
        var parameters = params.split("#");
        var sku = parameters[0];
        var times = parameters[2];
        var mShopData = null;
        var list = NF_1.default.DataTables.GetAllInfos("ShopInfo");
        list.forEach(function(item) {
          item.mPayId == sku && (mShopData = item);
        });
        if (mShopData) {
          if (1 == mShopData.mType) {
            var ms = 1;
            13 == times.length && (ms = 1e3);
            var endTime = Number(times) + 2592e3 * ms;
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.SkuTime + sku, endTime);
            GameDataMgr_1.default.GetInstance().setData("SkuEffective" + sku, 1);
          }
          2 == mShopData.mType && (2 != mShopData.mTag2 && 1 != mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(mShopData, false));
        }
      };
      PlatformMgr.OnSkuDetails = function(params) {
        NF_1.default.Debug.Log(">>>> OnSkuDetails:: ", params);
        PlatformMgr.GetInstance().DecodeSkuDetail(params);
      };
      PlatformMgr.OnSkuSubsDetails = function(params) {
        NF_1.default.Debug.Log(">>>> OnSkuSubsDetails:: ", params);
        PlatformMgr.GetInstance().DecodeSkuDetail(params);
      };
      PlatformMgr.onPause = function() {
        NF_1.default.Debug.Log("callbreak onPause");
      };
      PlatformMgr.onResume = function() {
        NF_1.default.Debug.Log("callbreak onResume");
        var channel = PlatformMgr.GetInstance().GetChannel();
        if ("GooglePlay" == channel) {
          NF_1.default.Debug.Log(">>> onResume IsGooglePlay do not play ins ad");
          return;
        }
        var ismore = NF_1.default.Storage.GetBool("MoreGame", false);
        ismore || AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_005");
        NF_1.default.Storage.SetBool("MoreGame", false);
      };
      PlatformMgr.prototype.GetAndroidVersionName = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) return _super.prototype.GetAppVersion.call(this);
        return "1.0.0";
      };
      PlatformMgr.prototype.MoreGame = function() {
        cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative && jsb.reflection.callStaticMethod(this.mJniPath, "MoreGame", "()V");
      };
      PlatformMgr.prototype.IsTranssion = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          NF_1.default.Debug.Log(">> callbreak call IsTranssion");
          var isTranss = jsb.reflection.callStaticMethod(this.mAppActivity, "JniIsTranssion", "()Z");
          GameDataMgr_1.default.GetInstance().setData("IsTranssion", true != isTranss);
        } else GameDataMgr_1.default.GetInstance().setData("IsTranssion", true);
      };
      PlatformMgr.prototype.GetChannel = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          var name = jsb.reflection.callStaticMethod(this.mJniPath, "GetChannel", "()Ljava/lang/String;");
          return name;
        }
        return "";
      };
      PlatformMgr.prototype.GetNetwork = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          var name = jsb.reflection.callStaticMethod(this.mJniPath, "GetNetwork", "()Ljava/lang/String;");
          return name;
        }
        return "";
      };
      PlatformMgr.GetFBcData = function() {
        if (cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative) {
          var data = PlatformMgr.GetInstance().mFBCData;
          if (Object.keys(data).length <= 0) {
            var name = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "FBCData", "()Ljava/lang/String;");
            this.NotifyABTest(name);
          }
          return PlatformMgr.GetInstance().mFBCData;
        }
        if (cc.sys.OS_WINDOWS === cc.sys.os) {
          var obj = {};
          obj.ABTest_311_speed_long = {};
          obj.ABTest_311_speed_long.mValue = "1";
          obj.try_card_record_time_sp = {};
          obj.try_card_record_time_sp.mValue = 180;
          obj.bid_Offset_long = {};
          obj.bid_Offset_long.mValue = 0;
          obj.try_card_record_time_cy = {};
          obj.try_card_record_time_cy.mValue = 0;
          return obj;
        }
        return {};
      };
      PlatformMgr.NotifyABTest = function(val) {
        NF_1.default.Debug.Log("callbreak NotifyABTest>>>>" + val);
        if ("" != val) {
          var data = JSON.parse(val);
          var arr = data["mValue"];
          var FBCData = {};
          for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            FBCData[element.mKey] = element;
          }
          PlatformMgr.GetInstance().mFBCData = FBCData;
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.ABTest_Event);
        }
      };
      PlatformMgr.SetNet = function(val) {
        NF_1.default.Debug.Log("callbreak SetNet>>>>" + val);
        PlayerMgr_1.default.Instance.EventNet();
      };
      PlatformMgr.prototype.hideNativeSplash = function() {
        cc.sys.OS_ANDROID === cc.sys.os && cc.sys.isNative && jsb.reflection.callStaticMethod(this.mJniPath, "hideSplash", "()V");
      };
      return PlatformMgr;
    }(NFBasePlatformMgr_1.default);
    exports.default = PlatformMgr;
    window["PlatformMgr"] = PlatformMgr;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Platform/NFBasePlatformMgr": "NFBasePlatformMgr",
    "./AdManger": "AdManger"
  } ],
  PlayerMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4740e5qC69Djr+ailn7Khyd", "PlayerMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../../NFramework/NF");
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var DealCardsMgr_1 = require("./DealCardsMgr");
    var SkinMgr_1 = require("./SkinMgr");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var PlayerMgr = function(_super) {
      __extends(PlayerMgr, _super);
      function PlayerMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mIsGameSingle = true;
        _this.mIsFristRound = true;
        _this.mBitPageNum = 1;
        _this.mSumScorePageNum = 1;
        _this.mOnlineBitPageNum = 1;
        _this.mOnlineSumScorePageNum = 1;
        _this.mFreeCoinsNum = 1;
        _this.mOnlineTime = 0;
        return _this;
      }
      Object.defineProperty(PlayerMgr.prototype, "PlayerData", {
        get: function() {
          this.mPlayerData || this.LoadPlayerData();
          return this.mPlayerData;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PlayerMgr.prototype, "MaxLv", {
        get: function() {
          this.mLvInfos || (this.mLvInfos = NF_1.default.DataTables.GetAllInfos("LevelInfo"));
          return this.mLvInfos.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(PlayerMgr, "Instance", {
        get: function() {
          null == this.mInstance && (this.mInstance = new PlayerMgr());
          return this.mInstance;
        },
        enumerable: false,
        configurable: true
      });
      PlayerMgr.prototype.Init = function() {
        this.LoadPlayerData();
        DealCardsMgr_1.default.GetInstance();
        SkinMgr_1.default.GetInstance().InitData();
        var lastTime = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.LoginTime);
        this.mLoginDate = new Date();
        this.mOnlineDate = this.mLoginDate;
        if (null == lastTime) cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.FirstLoginTime, this.mLoginDate.getTime().toString()); else if (this.IsNewDay()) {
          this.NewDayReset();
          NF_1.default.Storage.GetBool("ABTestIsOnEvent") && NF_1.default.Storage.SetBool("ABTestIsOnEvent", false);
        }
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.LoginTime, this.mLoginDate.getTime().toString());
        this.schedule(this.update, 0);
      };
      PlayerMgr.prototype.update = function(dt) {
        var curDate = new Date();
        if (curDate.getTime() - this.mOnlineDate.getTime() > 6e4) {
          this.mOnlineDate = curDate;
          this.CaclOnlineMinuteTimeOn24Hours();
          this.CaclOnlineMinuteTimeOn24HoursOnce();
          this.CaclOnlineMinuteTimeAll();
          this.Day24Hourse();
        }
        if (0 == curDate.getHours() && 0 == curDate.getMinutes() && 0 == curDate.getSeconds()) {
          this.NewDayReset();
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Inter_Day_Event);
        }
      };
      PlayerMgr.prototype.NewDayReset = function() {
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTime, "0");
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay, 0);
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay, 0);
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableMillis, 0);
        NF_1.default.Storage.SetBool(DefineConfig_1.LocalStorageKey.DayBtnClick, false);
        this.CalcLoginDays();
        DealCardsMgr_1.default.GetInstance().NewDayReset();
      };
      PlayerMgr.prototype.Day24Hourse = function() {
        var in24hours = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.Is24Hours, true);
        if (!in24hours) return;
        var day = NF_1.default.Storage.GetString("Day24Hourse", "");
        if (day.length > 0) {
          var curDate = new Date().getTime();
          NF_1.default.Debug.Log(">>> callbreak Day24Hourse " + curDate);
          if (curDate - Number(day) > 864e5) {
            cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.ShowInterstitialTimes, "10");
            cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.ShowVideoRewardTimes, "10");
            cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTime24Hours, "60");
            NF_1.default.Storage.SetBool(DefineConfig_1.LocalStorageKey.Is24Hours, false);
          }
        }
      };
      PlayerMgr.prototype.CalcLoginDays = function() {
        var firstLoginTime = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.FirstLoginTime);
        var lastDate = new Date(Number(firstLoginTime));
        var lastYearDay = this.GetDayYear(lastDate);
        var curDate = new Date();
        var curYearDay = this.GetDayYear(curDate);
        var diffDay = curYearDay - lastYearDay;
        NF_1.default.Debug.Log("CalcLoginDays - " + diffDay);
        switch (diffDay) {
         case 2:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Retention_d2);
          break;

         case 5:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Retention_d5);
          break;

         case 7:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Retention_d7);
        }
      };
      PlayerMgr.prototype.CaclOnlineMinute = function() {
        var onlineMin = Number(cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.OnlineTime));
        onlineMin += 1;
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTime, onlineMin.toString());
        NF_1.default.Debug.Log("CaclOnlineMinute - " + onlineMin);
        switch (onlineMin) {
         case 10:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Min10);
          break;

         case 20:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Min20);
          break;

         case 30:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Min30);
        }
      };
      PlayerMgr.prototype.CaclOnlineMinuteTimeOn24Hours = function() {
        var onlineMin = Number(cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.OnlineTime24Hours));
        onlineMin += 1;
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTime24Hours, onlineMin.toString());
        NF_1.default.Debug.Log("CaclOnlineMinute  OnlineTime24Hours - " + onlineMin);
        switch (onlineMin) {
         case 10:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_10mins_24hours);
          break;

         case 15:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_15mins_24hours);
          break;

         case 20:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_20mins_24hours);
          break;

         case 25:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_25mins_24hours);
          break;

         case 30:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_30mins_24hours);
          break;

         case 35:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_35mins_24hours);
          break;

         case 40:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_40mins_24hours);
        }
      };
      PlayerMgr.prototype.CaclOnlineMinuteTimeOn24HoursOnce = function() {
        var in24hours = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.Is24Hours, true);
        if (!in24hours) return;
        var onlineMin = Number(cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.OnlineTime24HoursOnce));
        this.mOnlineTime += 1;
        if (this.mOnlineTime > onlineMin) {
          cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTime24HoursOnce, this.mOnlineTime.toString());
          NF_1.default.Debug.Log("CaclOnlineMinute  OnlineTime24HoursOnce - " + this.mOnlineTime);
          switch (onlineMin) {
           case 5:
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_5mins_24hours_once);
            break;

           case 10:
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_10mins_24hours_once);
            break;

           case 13:
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_13mins_24hours_once);
            break;

           case 16:
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_16mins_24hours_once);
            break;

           case 20:
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_20mins_24hours_once);
          }
        }
      };
      PlayerMgr.prototype.CaclOnlineMinuteTimeAll = function() {
        var onlineMin = Number(cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.OnlineTimeAllTime));
        onlineMin += 1;
        cc.sys.localStorage.setItem(DefineConfig_1.LocalStorageKey.OnlineTimeAllTime, onlineMin.toString());
        NF_1.default.Debug.Log("CaclOnlineMinute  OnlineTimeAllTime - " + onlineMin);
        switch (onlineMin) {
         case 10:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_10mins_alltime);
          break;

         case 15:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_15mins_alltime);
          break;

         case 20:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_20mins_alltime);
          break;

         case 30:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_30mins_alltime);
          break;

         case 40:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_40mins_alltime);
          break;

         case 50:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_50mins_alltime);
          break;

         case 60:
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_60mins_alltime);
        }
      };
      PlayerMgr.prototype.CalcShowInterstitialTimes = function() {};
      PlayerMgr.prototype.CalcShowVideoRewardTimes = function() {};
      PlayerMgr.prototype.CalcGameEndTimes = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount("level_end", "");
      };
      PlayerMgr.prototype.IsNewDay = function() {
        var millisecond = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.LoginTime);
        var lastDate = new Date(Number(millisecond));
        var curDate = new Date();
        if (curDate.getFullYear() != lastDate.getFullYear() || curDate.getMonth() != lastDate.getMonth() || curDate.getDay() != lastDate.getDay()) return true;
        return false;
      };
      PlayerMgr.prototype.GetDayYear = function(date) {
        var year = date.getFullYear();
        var firstTimestamp = new Date(year + "-1-1 00:00:00").getTime();
        var currentTimestamp = date.getTime();
        var hasTimestamp = currentTimestamp - firstTimestamp;
        var time = 864e5;
        var hasDays = Math.ceil(hasTimestamp / time);
        return hasDays;
      };
      PlayerMgr.prototype.LoadPlayerData = function() {
        this.mPlayerData = NF_1.default.Storage.GetData("LocalPlayerData");
        this.mPlayerData ? this.mPlayerData.mIsNewGame = false : this.mPlayerData = {
          mGameCount: 0,
          mLv: 0,
          mExp: 0,
          mGold: 4e4,
          mNewDate: NF_1.default.Time.GetCurrentTimeMillis(),
          mIsNewGame: true
        };
        this.SavePlayerData();
      };
      PlayerMgr.prototype.SavePlayerData = function() {
        NF_1.default.Storage.SetData("LocalPlayerData", this.mPlayerData);
      };
      PlayerMgr.prototype.AddGold = function(num, save) {
        void 0 === save && (save = true);
        this.mPlayerData.mGold += num;
        save && this.SavePlayerData();
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
      };
      PlayerMgr.prototype.SetLv = function(num, save) {
        void 0 === save && (save = true);
        this.mPlayerData.mLv += num;
        save && this.SavePlayerData();
      };
      PlayerMgr.prototype.SetExp = function(num, save) {
        void 0 === save && (save = true);
        if (this.PlayerData.mLv >= this.MaxLv) return;
        this.mPlayerData.mExp += num;
        var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", this.PlayerData.mLv);
        var restExp = this.mPlayerData.mExp - lvInfo.mExp;
        if (restExp >= 0) {
          this.mPlayerData.mExp = 0;
          this.SetLv(1);
          restExp && this.SetExp(restExp);
          return;
        }
        save && this.SavePlayerData();
      };
      PlayerMgr.prototype.setGameCount = function() {
        this.mPlayerData.mGameCount += 1;
        this.SavePlayerData();
      };
      PlayerMgr.prototype.EventNet = function() {
        var isNet = NF_1.default.Storage.GetBool("GameIsOpenNet", true);
        if (!isNet) {
          var net = PlatformMgr_1.default.GetInstance().GetNetwork();
          if ("none" != net) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Online);
            NF_1.default.Storage.SetBool("GameIsOpenNet", true);
          }
        }
      };
      return PlayerMgr;
    }(cc.Component);
    exports.default = PlayerMgr;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/NF": "NF",
    "../../Platform/PlatformMgr": "PlatformMgr",
    "./DealCardsMgr": "DealCardsMgr",
    "./SkinMgr": "SkinMgr"
  } ],
  RandomCardLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5a983OO+ahHIaM7bR7FUKYh", "RandomCardLogic");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Bids = exports.HandCards = exports.CardType = void 0;
    var DealCardsMgr_1 = require("./Common/Mgr/DealCardsMgr");
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var BaseInstance_1 = require("./NFramework/Base/BaseInstance");
    var NF_1 = require("./NFramework/NF");
    var CardType;
    (function(CardType) {
      CardType[CardType["Diamonds"] = 0] = "Diamonds";
      CardType[CardType["Clubs"] = 1] = "Clubs";
      CardType[CardType["Hearts"] = 2] = "Hearts";
      CardType[CardType["Spades"] = 3] = "Spades";
      CardType[CardType["King"] = 4] = "King";
    })(CardType = exports.CardType || (exports.CardType = {}));
    var RandomCardLogic = function(_super) {
      __extends(RandomCardLogic, _super);
      function RandomCardLogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.compare = function(cardA, cardB) {
          var _a = this.getCardZoom(cardA), tA = _a[0], vA = _a[1];
          var _b = this.getCardZoom(cardB), tB = _b[0], vB = _b[1];
          if (tA == CardType.Spades && tB != CardType.Spades) return true;
          if (tA != CardType.Spades && tB == CardType.Spades) return false;
          if (1 == vB) return false;
          if (1 == vA) return true;
          if (vA > vB) return true;
          return false;
        };
        _this.compareV = function(cardA, cardB) {
          var vA = this.getCardValue(cardA);
          var vB = this.getCardValue(cardB);
          if (1 == vA) return true;
          if (1 == vB) return false;
          if (vA > vB) return true;
          return false;
        };
        _this.findDiscard = function(tabCards, handCards) {
          var _this = this;
          if (0 == tabCards.length) return [];
          var _a = this.getCardZoom(tabCards[0]), t = _a[0], v = _a[1];
          var avaCards = [];
          var sp = false;
          for (var i = 0; i < tabCards.length; i++) this.getCardType(tabCards[i]) == CardType.Spades && (sp = true);
          if (handCards.cards[t].length > 0 && t != CardType.Spades) {
            var big_1 = this.findBigCard(tabCards, t);
            handCards.cards[t].forEach(function(card) {
              _this.compareV(card, big_1) && avaCards.push(card);
            });
            (0 == avaCards.length || sp) && (avaCards = handCards.cards[t]);
          } else if (handCards.cards[CardType.Spades].length > 0) {
            var big_2 = this.findBigCard(tabCards, CardType.Spades);
            handCards.cards[CardType.Spades].forEach(function(card) {
              _this.compareV(card, big_2) && avaCards.push(card);
            });
            0 == avaCards.length && t == CardType.Spades && (avaCards = handCards.cards[CardType.Spades]);
          }
          return avaCards;
        };
        _this.findWinner = function(tabCards) {
          var big = tabCards[0];
          var bt = this.getCardType(big);
          for (var i = 1; i < tabCards.length; i++) {
            var card = tabCards[i];
            var t = this.getCardType(card);
            t != CardType.Spades && bt != t || this.compare(card, big) && (big = card);
          }
          return big;
        };
        return _this;
      }
      RandomCardLogic.prototype.getCardType = function(card) {
        return card >> 4;
      };
      RandomCardLogic.prototype.getCardValue = function(card) {
        return 15 & card;
      };
      RandomCardLogic.prototype.getCardZoom = function(card) {
        return [ card >> 4, 15 & card ];
      };
      RandomCardLogic.prototype.printfCardType = function(card) {
        switch (card) {
         case CardType.Diamonds:
          return "\u2666\ufe0f";

         case CardType.Clubs:
          return "\u2663\ufe0f";

         case CardType.Hearts:
          return "\u2665\ufe0f";

         case CardType.Spades:
          return "\u2660\ufe0f";

         case CardType.King:
          return "\u2605";
        }
        return "@";
      };
      RandomCardLogic.prototype.printfCardTag = function(card) {
        switch (card) {
         case CardType.Diamonds:
          return "D";

         case CardType.Clubs:
          return "C";

         case CardType.Hearts:
          return "H";

         case CardType.Spades:
          return "S";

         case CardType.King:
          return "K";
        }
        return "A";
      };
      RandomCardLogic.prototype.printfCardValue = function(card) {
        switch (card) {
         case 1:
          return "A";

         case 2:
          return "2";

         case 3:
          return "3";

         case 4:
          return "4";

         case 5:
          return "5";

         case 6:
          return "6";

         case 7:
          return "7";

         case 8:
          return "8";

         case 9:
          return "9";

         case 10:
          return "10";

         case 11:
          return "J";

         case 12:
          return "Q";

         case 13:
          return "K";

         case 14:
          return "-";

         case 15:
          return "+";

         case 0:
          return "";
        }
        return "#";
      };
      RandomCardLogic.prototype.printfCard = function(card) {
        var _a = this.getCardZoom(card), t = _a[0], v = _a[1];
        return "[" + this.printfCardType(t) + this.printfCardValue(v) + "]";
      };
      RandomCardLogic.prototype.printfCardsArr = function(cards) {
        var _this = this;
        var txt = "{";
        cards.forEach(function(card) {
          txt += _this.printfCard(card);
        });
        txt += "}";
        return txt;
      };
      RandomCardLogic.prototype.printfCardToTag = function(card) {
        var _a = this.getCardZoom(card), t = _a[0], v = _a[1];
        return "" + this.printfCardTag(t) + this.printfCardValue(v);
      };
      RandomCardLogic.prototype.random = function(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
      };
      RandomCardLogic.prototype.sortEasy = function(cards) {
        for (var i = 0; i < cards.length - 1; i++) for (var j = 0; j < cards.length - i - 1; j++) if (!this.compare(cards[j], cards[j + 1])) {
          var temp = cards[j];
          cards[j] = cards[j + 1];
          cards[j + 1] = temp;
        }
        return cards;
      };
      RandomCardLogic.prototype.a2a = function(cards) {
        var ret = [];
        cards.forEach(function(card) {
          ret.push(ret);
        });
        return ret;
      };
      RandomCardLogic.prototype.deepcopyArr = function(cards) {
        var outarr = [];
        var len = cards.length;
        for (var i = 0; i < len; i++) {
          outarr[i] = new Array();
          for (var j = 0; j < cards[i].length; j++) outarr[i][j] = cards[i][j];
        }
        return outarr;
      };
      RandomCardLogic.prototype.deepClone = function(obj) {
        if ("object" !== typeof obj) return obj;
        if (!obj) return obj;
        if (obj instanceof RegExp) return new RegExp(obj);
        if (obj instanceof Function) return obj;
        var newObj;
        if (obj instanceof Array) {
          newObj = [];
          for (var i = 0, len = obj.length; i < len; i++) newObj.push(this.deepClone(obj[i]));
          return newObj;
        }
        newObj = {};
        for (var key in obj) obj.hasOwnProperty(key) && ("object" !== typeof obj[key] ? newObj[key] = obj[key] : newObj[key] = this.deepClone(obj[key]));
        return newObj;
      };
      RandomCardLogic.prototype.findBigCard = function(cards, m) {
        var _this = this;
        var big = 0;
        cards.forEach(function(card) {
          var _a = _this.getCardZoom(card), t = _a[0], _ = _a[1];
          t == m && _this.compareV(card, big) && (big = card);
        });
        return big;
      };
      RandomCardLogic.prototype.shuffle = function() {
        var heap = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61 ];
        this.mix(heap);
        this.weightDisturbance(heap);
        return heap;
      };
      RandomCardLogic.prototype.mix = function(heap) {
        var len = heap.length;
        for (var i = 0; i < len; i++) {
          var lastIndex = len - 1 - i;
          var index = this.random(0, len);
          var c = heap[index];
          heap[index] = heap[lastIndex];
          heap[lastIndex] = c;
        }
      };
      RandomCardLogic.prototype.weightDisturbance = function(heap) {
        var name = DealCardsMgr_1.default.GetInstance().GetGrop();
        if ("mWeightA" == name) return;
        if (GameDataMgr_1.default.GetInstance().getData("RecordFailCount", 0) >= 2 || 1 == GameDataMgr_1.default.GetInstance().getData("PlayerGoodCard", 1)) {
          GameDataMgr_1.default.GetInstance().setData("PlayerGoodCard", 0);
          this.start_weight_rand(name, heap);
        } else GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && this.start_weight_rand(name, heap);
      };
      RandomCardLogic.prototype.start_weight_rand = function(name, heap) {
        var mCardInfos = NF_1.default.DataTables.GetAllInfos("CardInfo");
        var mTempList = [];
        for (var i = 0; i < 13; ) {
          var info = this.weight_rand(mCardInfos, name);
          var b = true;
          for (var k = 0; k < mTempList.length; k++) if (mTempList[k].mId == info.mId) {
            b = false;
            break;
          }
          if (b) {
            mTempList.push(info);
            i++;
          }
        }
        mTempList.sort(function(a1, a2) {
          return a1.mId > a2.mId ? 1 : -1;
        });
        for (var i = 0; i < mTempList.length; i++) {
          var Card = mTempList[i];
          var Card1 = heap[4 * i];
          var idx = 0;
          for (var j = 0; j < heap.length; j++) if (Card.mCard == heap[j]) {
            idx = j;
            break;
          }
          heap[4 * i] = Card.mCard;
          heap[idx] = Card1;
        }
      };
      RandomCardLogic.prototype.weight_rand = function(arr, grop) {
        var per;
        var maxNum = 0;
        var perMode = false;
        Math.gcd = function(a, b) {
          var min = Math.min(a, b);
          var max = Math.max(a, b);
          var result = 1;
          if (0 === a || 0 === b) return max;
          for (var i = min; i >= 1; i--) if (min % i === 0 && max % i === 0) {
            result = i;
            break;
          }
          return result;
        };
        var weight_arr = new Array();
        for (var i = 0; i < arr.length; i++) {
          if ("undefined" != typeof arr[i][grop]) if (-1 !== arr[i][grop].toString().indexOf("%")) {
            per = Math.floor(arr[i][grop].toString().replace("%", ""));
            perMode = true;
          } else per = Math.floor(100 * arr[i][grop]); else per = 0;
          weight_arr[i] = per;
          maxNum = Math.gcd(maxNum, per);
        }
        var index = new Array();
        var total = 0;
        var len = 0;
        if (perMode) {
          for (var i = 0; i < arr.length; i++) {
            len = weight_arr[i];
            for (var j = 0; j < len; j++) {
              if (total >= 100) break;
              index.push(i);
              total++;
            }
          }
          while (total < 100) {
            index.push(arr.length - 1);
            total++;
          }
        } else for (var i = 0; i < arr.length; i++) {
          len = weight_arr[i] / maxNum;
          for (var j = 0; j < len; j++) index.push(i);
          total += len;
        }
        var rand = Math.floor(Math.random() * total);
        return arr[index[rand]];
      };
      return RandomCardLogic;
    }(BaseInstance_1.default);
    exports.default = RandomCardLogic;
    var HandCards = function() {
      function HandCards(c) {
        var cards = RandomCardLogic.GetInstance().sortEasy(c);
        this.cards = [];
        this.cards[CardType.Diamonds] = [];
        this.cards[CardType.Clubs] = [];
        this.cards[CardType.Hearts] = [];
        this.cards[CardType.Spades] = [];
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var t = RandomCardLogic.GetInstance().getCardType(card);
          switch (t) {
           case CardType.Diamonds:
            this.cards[CardType.Diamonds].push(card);
            break;

           case CardType.Clubs:
            this.cards[CardType.Clubs].push(card);
            break;

           case CardType.Hearts:
            this.cards[CardType.Hearts].push(card);
            break;

           case CardType.Spades:
            this.cards[CardType.Spades].push(card);
            break;

           default:
            cc.log("Bad Card: ", card);
            this.cards = null;
            return;
          }
        }
      }
      HandCards.prototype.getHandCardsArr = function() {
        return [].concat(this.cards[CardType.Spades], this.cards[CardType.Hearts], this.cards[CardType.Clubs], this.cards[CardType.Diamonds]);
      };
      HandCards.prototype.discard = function(card) {
        var _a = RandomCardLogic.GetInstance().getCardZoom(card), t = _a[0], _ = _a[1];
        for (var i = 0; i < this.cards[t].length; i++) if (this.cards[t][i] == card) {
          this.cards[t] = [].concat(this.cards[t].slice(0, i), this.cards[t].slice(i + 1, this.cards[t].length));
          return true;
        }
        return false;
      };
      HandCards.prototype.checkCard = function(card) {
        var _a = RandomCardLogic.GetInstance().getCardZoom(card), t = _a[0], _ = _a[1];
        for (var i = 0; i < this.cards[t].length; i++) if (this.cards[t][i] == card) return true;
        return false;
      };
      HandCards.prototype.dump = function() {
        cc.log(RandomCardLogic.GetInstance().printfCardsArr(this.getHandCardsArr()));
      };
      return HandCards;
    }();
    exports.HandCards = HandCards;
    var Bids = function() {
      function Bids(max) {
        void 0 === max && (max = 4);
        this.bids = [];
        this.scores = [];
        this.results = [];
        this.currents = [];
        for (var i = 0; i < max; i++) {
          this.bids.push(0);
          this.scores.push(0);
          this.currents.push(0);
        }
      }
      Bids.prototype.setBid = function(chairID, bid) {
        if (chairID >= this.bids.length) return;
        this.bids[chairID] = bid;
      };
      Bids.prototype.addScore = function(chairID, score) {
        chairID < this.scores.length && (this.scores[chairID] += score);
        return this.scores[chairID];
      };
      Bids.prototype.getScore = function(chairID) {
        return this.scores[chairID];
      };
      Bids.prototype.getBids = function(chairID) {
        return this.bids[chairID];
      };
      Bids.prototype.calculate = function() {
        var results = [];
        var big = 0;
        var winner = 0;
        for (var i = 0; i < this.bids.length; i++) {
          var bid = this.bids[i];
          var score = this.scores[i];
          var result = score - bid;
          result = result < 0 ? -bid : .1 * result + bid;
          if (result > big) {
            big = result;
            winner = i;
          }
          results.push(result);
          this.currents[i] += result;
        }
        this.results.push(results);
        for (var i = 0; i < this.bids.length; i++) {
          this.bids[i] = 0;
          this.scores[i] = 0;
        }
        return winner;
      };
      Bids.prototype.checkEnd = function() {
        if (this.results.length == GameMgr_1.default.GetInstance().RoundMax) return true;
        return false;
      };
      Bids.prototype.result = function(c) {
        var a = [ 0, 0, 0, 0 ];
        for (var i = 0; i < c; i++) {
          var result = this.results[i];
          result.forEach(function(score, index) {
            a[index] += score;
          });
        }
        return a;
      };
      Bids.prototype.getBidsCount = function() {
        var c = 0;
        this.bids.forEach(function(bid) {
          0 != bid && c++;
        });
        return c;
      };
      return Bids;
    }();
    exports.Bids = Bids;
    cc._RF.pop();
  }, {
    "./Common/Mgr/DealCardsMgr": "DealCardsMgr",
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./NFramework/Base/BaseInstance": "BaseInstance",
    "./NFramework/NF": "NF"
  } ],
  RedCircle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9cd4djY22pF457ogl7vqC1F", "RedCircle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RedCircle = function(_super) {
      __extends(RedCircle, _super);
      function RedCircle() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      RedCircle.prototype.start = function() {
        var ctx = this.getComponent(cc.Graphics);
        ctx.clear();
        ctx.lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.ellipse(0, 0, 32, 16);
        ctx.stroke();
      };
      RedCircle = __decorate([ ccclass ], RedCircle);
      return RedCircle;
    }(cc.Component);
    exports.default = RedCircle;
    cc._RF.pop();
  }, {} ],
  RewardForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76f13b+wUdFoouIG7MLalMe", "RewardForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var NF_1 = require("../../NFramework/NF");
    var NFNotifyMgr_1 = require("../../NFramework/Notification/NFNotifyMgr");
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("../Mgr/GameEntry");
    var EnumMacros_1 = require("../../NFramework/Definition/EnumMacros");
    var AdManger_1 = require("../../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RewardForm = function(_super) {
      __extends(RewardForm, _super);
      function RewardForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mNodeGold = null;
        _this.mNodeExp = null;
        _this.mLabGold = null;
        _this.mLabExp = null;
        _this.mCoinSp = [];
        _this.mexpSp = [];
        _this.mGoldSp = null;
        _this.mBtnSp = null;
        _this.mBtnTF = null;
        _this.mSpriteTitleBg = null;
        _this.mexpSprite = null;
        _this.mLabTitle = null;
        _this.mtitlebgArr = [];
        return _this;
      }
      RewardForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.mGoldPos = this.mNodeGold.position;
        this.mExpPos = this.mNodeExp.position;
      };
      RewardForm.prototype.onDisable = function() {
        this.node.stopAllActions();
        if (this.mRewardData.mFormid) {
          if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopForm) || GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.TurntableForm)) {
            AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
            AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          }
        } else {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        }
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      RewardForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        NF_1.default.Audio.Play(11);
        var data = param;
        this.mRewardData = data;
        this.mLabGold.string = data.mGold.toString();
        this.mLabExp.string = data.mExp.toString();
        this.mNodeGold.active = data.mGold > 0;
        this.mNodeExp.active = data.mExp > 0;
        if (data.mGold > 0 && data.mExp > 0) {
          this.mNodeExp.position = this.mExpPos;
          this.ShowScale(this.mNodeExp);
          this.mNodeGold.position = this.mGoldPos;
          this.ShowScale(this.mNodeGold, true);
        } else if (data.mGold > 0) {
          this.mNodeGold.x = 0;
          this.ShowScale(this.mNodeGold);
        } else if (data.mExp > 0) {
          this.mNodeExp.x = 0;
          this.ShowScale(this.mNodeExp);
        }
        this.mGoldSp.node.scale = 1;
        switch (data.mFormid) {
         case GameEnum_1.UIFormId.TurntableForm:
          var info = NF_1.default.DataTables.GetAllInfos("RouletteInfo");
          var id = void 0;
          for (var i = 0; i < info.length; i++) {
            var element = info[i];
            if (element.mReward == data.mGold) {
              id = element.mId;
              break;
            }
          }
          id <= 4 ? this.scaleGold(1) : id >= 5 && id <= 8 ? this.scaleGold(2) : id >= 9 && id <= 11 ? this.scaleGold(3) : id >= 12 && id <= 14 ? this.scaleGold(4) : this.scaleGold(5);
          break;

         case GameEnum_1.UIFormId.FreeCoinsForm:
          var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay);
          this.scaleGold(freeTimes);
          break;

         default:
          this.scaleGold(0);
        }
        this.AbTestShow();
        this.ShowExp();
      };
      RewardForm.prototype.scaleGold = function(idx) {
        this.mGoldSp.spriteFrame = this.mCoinSp[idx];
        switch (idx) {
         case 0:
         case 1:
         case 2:
          this.mGoldSp.node.scale = .75;
          break;

         case 3:
         case 4:
         case 5:
          this.mGoldSp.node.scale = .75;
        }
      };
      RewardForm.prototype.ShowExp = function() {
        if (this.mRewardData) {
          var s = this.mRewardData.mScore;
          if (!s) return;
          if (s <= 0) {
            this.scaleGold(1);
            this.mexpSprite.spriteFrame = this.mexpSp[0];
          } else if (s >= 1 && s < 9) {
            this.scaleGold(2);
            this.mexpSprite.spriteFrame = this.mexpSp[1];
          } else if (s >= 9 && s < 17) {
            this.scaleGold(3);
            this.mexpSprite.spriteFrame = this.mexpSp[2];
          } else if (s >= 17 && s < 25) {
            this.scaleGold(4);
            this.mexpSprite.spriteFrame = this.mexpSp[3];
          } else {
            this.scaleGold(5);
            this.mexpSprite.spriteFrame = this.mexpSp[4];
          }
        }
      };
      RewardForm.prototype.AbTestShow = function() {
        this.mBtnTF.fontSize = 42;
        this.mBtnTF.enableBold = true;
        this.mBtnSp.color = cc.color(19, 173, 23, 255);
        this.mSpriteTitleBg.spriteFrame = this.mtitlebgArr[1];
        this.mSpriteTitleBg.node.width = 362.2;
        this.mSpriteTitleBg.node.height = 76.8;
        this.mLabTitle.node.y = 6.17;
        this.mRewardData.mFormid == GameEnum_1.UIFormId.TurntableForm && (this.mLabTitle.string = "You\u2019ve Won");
      };
      RewardForm.prototype.onEnable = function() {};
      RewardForm.prototype.ShowScale = function(node, delay) {
        void 0 === delay && (delay = false);
        node.scale = 0;
        delay ? cc.tween(node).delay(.1).to(.2, {
          scale: 1
        }).start() : cc.tween(node).to(.2, {
          scale: 1
        }).start();
      };
      RewardForm.prototype.OnBtnClose = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.mRewardData.mFunc && this.mRewardData.mFunc();
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Node) ], RewardForm.prototype, "mNodeGold", void 0);
      __decorate([ property(cc.Node) ], RewardForm.prototype, "mNodeExp", void 0);
      __decorate([ property(cc.Label) ], RewardForm.prototype, "mLabGold", void 0);
      __decorate([ property(cc.Label) ], RewardForm.prototype, "mLabExp", void 0);
      __decorate([ property(cc.SpriteFrame) ], RewardForm.prototype, "mCoinSp", void 0);
      __decorate([ property(cc.SpriteFrame) ], RewardForm.prototype, "mexpSp", void 0);
      __decorate([ property(cc.Sprite) ], RewardForm.prototype, "mGoldSp", void 0);
      __decorate([ property(cc.Node) ], RewardForm.prototype, "mBtnSp", void 0);
      __decorate([ property(cc.Label) ], RewardForm.prototype, "mBtnTF", void 0);
      __decorate([ property(cc.Sprite) ], RewardForm.prototype, "mSpriteTitleBg", void 0);
      __decorate([ property(cc.Sprite) ], RewardForm.prototype, "mexpSprite", void 0);
      __decorate([ property(cc.Label) ], RewardForm.prototype, "mLabTitle", void 0);
      __decorate([ property(cc.SpriteFrame) ], RewardForm.prototype, "mtitlebgArr", void 0);
      RewardForm = __decorate([ ccclass ], RewardForm);
      return RewardForm;
    }(UIFormLogic_1.default);
    exports.default = RewardForm;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/Definition/EnumMacros": "EnumMacros",
    "../../NFramework/NF": "NF",
    "../../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../../Platform/AdManger": "AdManger",
    "../Mgr/GameEntry": "GameEntry"
  } ],
  ScoreBoardForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f81bcskGwVLFLhlnjT3W53K", "ScoreBoardForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var NF_1 = require("./NFramework/NF");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var NFNotifyMgr_1 = require("./NFramework/Notification/NFNotifyMgr");
    var DealCardsMgr_1 = require("./Common/Mgr/DealCardsMgr");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScoreBoardForm = function(_super) {
      __extends(ScoreBoardForm, _super);
      function ScoreBoardForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lines = [];
        _this.ndNames = null;
        _this.ndCurrent = null;
        _this.ndEnd = null;
        _this.ndResults = null;
        _this.grapMainLine = null;
        _this.grapSubLine = null;
        _this.grapEndLine = null;
        _this.pRedCircle = null;
        _this.ndRounds = null;
        _this.mbtnPlayAgain = null;
        _this.mbtnHome = null;
        _this.mContent = null;
        _this.mvideoImg = null;
        _this.redCircles = [];
        _this.button = 0;
        _this.chairMap = [ 0, 0, 0, 0 ];
        _this.gameData = null;
        _this.iseffectEnd = false;
        _this.isShowAd = false;
        return _this;
      }
      ScoreBoardForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      ScoreBoardForm.prototype.OnOpen = function(param) {
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_RefreshScore, this.refresh, this);
        if (this.gameData) {
          var lab = this.ndNames.getChildByName("Name0").getComponent(cc.Label);
          var name = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.MyName);
          lab.string = name ? name + "(me)" : "(me)";
        } else {
          var gameData = cc.find("GameData").getComponent("GameData");
          this.gameData = gameData;
          this.drwaLine(this.grapMainLine, 4);
          this.drwaLine(this.grapSubLine, 3.5);
          this.drwaLine(this.grapEndLine, 4);
          this.setButton(gameData.fakeNames);
        }
        this.ndRounds.string = GameMgr_1.default.GetInstance().RoundMax + " rounds";
        this.mContent.y = 768;
        this.refresh(param);
        this.show();
      };
      ScoreBoardForm.prototype.drwaLine = function(ctx, w) {
        ctx.clear();
        ctx.lineWidth = w;
        ctx.moveTo(0, 0);
        ctx.lineTo(550, 0);
        ctx.stroke();
      };
      ScoreBoardForm.prototype.setButton = function(names) {
        void 0 === names && (names = []);
        for (var i = 0; i < 4; i++) {
          var lab = this.ndNames.getChildByName("Name" + i).getComponent(cc.Label);
          if (0 != i) {
            lab.string = "Bot-" + i;
            0 != names.length && (lab.string = names[i]);
          } else {
            var name = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.MyName);
            lab.string = name ? name + "(me)" : "(me)";
          }
          this.chairMap[i] = i;
        }
      };
      ScoreBoardForm.prototype.changeName2Bot = function(name) {
        var nds = this.ndNames.children;
        for (var i = 0; i < 4; i++) {
          var lab = nds[i].getComponent(cc.Label);
          lab.string == name && (lab.string = lab.string + "(bot)");
        }
      };
      ScoreBoardForm.prototype.refresh = function(bids) {
        this.mvideoImg.active = false;
        this.redCircles.forEach(function(c) {
          c.removeFromParent();
        });
        var results = bids.results;
        this.results = bids;
        for (var i = 0; i < results.length; i++) this.setLineNumber(this.lines[i], results[i]);
        for (var i = results.length; i < this.lines.length; i++) this.lines[i].active = false;
        var ok = false;
        bids.bids.forEach(function(bid) {
          0 != bid && (ok = true);
        });
        results.length < GameMgr_1.default.GetInstance().RoundMax && ok && this.setLineNumberInt(this.lines[results.length], bids.bids);
        if (results.length > 1) this.grapSubLine.node.active = true; else {
          this.ndCurrent.active = false;
          this.grapSubLine.node.active = false;
        }
        if (results.length > 1 && results.length != GameMgr_1.default.GetInstance().RoundMax) this.setLineNumber(this.ndCurrent, bids.currents, false); else if (results.length == GameMgr_1.default.GetInstance().RoundMax) {
          var num = GameMgr_1.default.GetInstance().RoundMax - 1;
          this.setLineNumber(this.ndCurrent, bids.result(num), false);
        }
        var isLast = results.length == GameMgr_1.default.GetInstance().RoundMax;
        if (isLast) {
          this.setLineNumber(this.ndEnd, bids.currents, false);
          this.setResult(bids.currents);
          this.grapEndLine.node.active = true;
          switch (GameMgr_1.default.GetInstance().CuttGameModel) {
           case DefineConfig_1.GameModel.Battle8Bid:
            this.mvideoImg.active = true;
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_Settlement);
          }
        } else {
          this.ndEnd.active = false;
          this.ndResults.active = false;
          this.grapEndLine.node.active = false;
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
        this.mbtnHome.active = isLast;
        this.mbtnPlayAgain.active = isLast && GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online;
        if (isLast && GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online) {
          var gameNum = GameDataMgr_1.default.GetInstance().getData("GameLastNum", 0);
          gameNum++;
          GameDataMgr_1.default.GetInstance().setData("GameLastNum", gameNum);
        }
        this.isShowAd = AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_006");
        this.isShowAd || NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Licensing);
        cc.sys.OS_WINDOWS === cc.sys.os && NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.Game_Licensing);
      };
      ScoreBoardForm.prototype.setLineNumber = function(target, list, red) {
        var _this = this;
        void 0 === red && (red = true);
        target.active = true;
        list.forEach(function(score, index) {
          var nd = target.getChildByName("Score" + _this.chairMap[index]);
          nd.getComponent(cc.Label).string = score.toFixed(1);
          red && score < 0 && _this.addCircle(target, nd.getPosition());
        });
      };
      ScoreBoardForm.prototype.setLineNumberInt = function(target, list) {
        var _this = this;
        target.active = true;
        list.forEach(function(score, index) {
          var nd = target.getChildByName("Score" + _this.chairMap[index]);
          nd.getComponent(cc.Label).string = score.toString();
        });
      };
      ScoreBoardForm.prototype.setResult = function(list) {
        var s = [];
        list.forEach(function(score, i) {
          s.push({
            score: score,
            chairID: i
          });
        });
        s.sort(function(a, b) {
          return a.score > b.score ? -1 : a.score == b.score ? 0 : 1;
        });
        this.ndResults.active = true;
        var label1 = this.ndResults.getChildByName("Score" + this.chairMap[s[0].chairID]).getComponent(cc.Label);
        var label2 = this.ndResults.getChildByName("Score" + this.chairMap[s[1].chairID]).getComponent(cc.Label);
        var label3 = this.ndResults.getChildByName("Score" + this.chairMap[s[2].chairID]).getComponent(cc.Label);
        var label4 = this.ndResults.getChildByName("Score" + this.chairMap[s[3].chairID]).getComponent(cc.Label);
        label1.string = "Winner";
        label1.node.getComponent(cc.LabelOutline).color = label1.node.color = cc.color(255, 115, 54, 255);
        label2.string = "2nd";
        label2.node.getComponent(cc.LabelOutline).color = label2.node.color = cc.color(0, 0, 0, 255);
        label3.string = "3rd";
        label3.node.getComponent(cc.LabelOutline).color = label3.node.color = cc.color(0, 0, 0, 255);
        label4.string = "4th";
        label4.node.getComponent(cc.LabelOutline).color = label4.node.color = cc.color(0, 0, 0, 255);
        var rank = 0;
        var score = 0;
        for (var i = 0; i < s.length; i++) if (s[i].chairID == DefineConfig_1.ChairID.Down) {
          rank = i + 1;
          score = s[i].score;
          0 == i ? this.gameData.sendEvent(DefineConfig_1.EventName.RankFirst) : 1 == i ? this.gameData.sendEvent(DefineConfig_1.EventName.RankSecond) : 2 == i ? this.gameData.sendEvent(DefineConfig_1.EventName.RankThird) : 3 == i && this.gameData.sendEvent(DefineConfig_1.EventName.RankFourth);
          i >= 2 ? DealCardsMgr_1.default.GetInstance().SetSustainTwoInnings(true) : DealCardsMgr_1.default.GetInstance().SetSustainTwoInnings(false);
        }
        GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online ? this.ShowReward(score) : this.ShowReward(score, rank);
        if (rank >= 2) {
          var mCount = GameDataMgr_1.default.GetInstance().getData("RecordFailCount", 0);
          mCount++;
          GameDataMgr_1.default.GetInstance().setData("RecordFailCount", mCount);
        } else {
          GameDataMgr_1.default.GetInstance().setData("RecordFailCount", 0);
          NF_1.default.Storage.SetBool("GiveScoreEndWin", true);
        }
        switch (rank) {
         case 1:
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Bid_Settlement_1);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Ordinary && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_1);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Settlement_1);
          break;

         case 2:
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Bid_Settlement_2);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Ordinary && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_2);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Settlement_2);
          break;

         case 3:
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Bid_Settlement_3);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Ordinary && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_3);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Settlement_3);
          break;

         case 4:
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Bid_Settlement_4);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Ordinary && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_4);
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Online && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Settlement_4);
        }
      };
      ScoreBoardForm.prototype.ShowReward = function(score, rank) {
        void 0 === rank && (rank = 0);
        var info = GameMgr_1.default.GetInstance().OnlineCurRoomInfo;
        var gold = 0;
        var exp = 0;
        if (GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online) if (score > 0) {
          gold = Math.ceil(300 * score + 500);
          exp = Math.ceil(1.5 * score + 20);
        } else {
          gold = 500;
          exp = 20;
        } else {
          info || (info = NF_1.default.DataTables.GetInfoById("RoomInfo", 1));
          var goldarr = info.mGoldRatio.split("|");
          var goldval = Number(goldarr[rank - 1]);
          if (score > 0) {
            gold = Math.ceil(goldval * score + info.mGoldAdded);
            exp = Math.ceil(info.mExpRation * score + info.mExpAdded);
          } else {
            gold = info.mGoldAdded;
            exp = info.mExpAdded;
          }
        }
        var lastLv = PlayerMgr_1.default.Instance.PlayerData.mLv;
        PlayerMgr_1.default.Instance.SetExp(exp);
        PlayerMgr_1.default.Instance.AddGold(gold);
        var curLv = PlayerMgr_1.default.Instance.PlayerData.mLv;
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, {
          mGold: gold,
          mExp: exp,
          mScore: score,
          mFunc: function() {
            curLv > lastLv && GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.LevelUpForm, {
              mLastLv: lastLv,
              mCurLv: curLv
            });
          },
          mFormid: null
        });
      };
      ScoreBoardForm.prototype.goback = function() {
        var _this = this;
        cc.tween(this.mContent).to(.3, {
          position: cc.v3(0, this.mContent.y + 530)
        }, {
          easing: "sineInOut"
        }).call(function() {
          if (GameMgr_1.default.GetInstance().CuttGameModel != DefineConfig_1.GameModel.Online && _this.isShowAd && GameMgr_1.default.GetInstance().GameState != DefineConfig_1.GameState.Paly) {
            5 == GameMgr_1.default.GetInstance().RoundMax && (2 == _this.results.results.length ? AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_006") : 4 == _this.results.results.length && AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_006"));
            3 == GameMgr_1.default.GetInstance().RoundMax && 2 == _this.results.results.length && AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_006");
          }
          _this.Close();
        }).start();
      };
      ScoreBoardForm.prototype.show = function() {
        var _this = this;
        cc.tween(this.mContent).to(.3, {
          position: cc.v3(0, this.mContent.y - 530)
        }, {
          easing: "sineInOut"
        }).call(function() {
          _this.mbtnHome.active && (PlayerMgr_1.default.Instance.mIsGameSingle ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement) : PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Online_Settlement));
        }).start();
      };
      ScoreBoardForm.prototype.addCircle = function(target, pos) {
        var circle = cc.instantiate(this.pRedCircle);
        circle.setPosition(pos);
        target.addChild(circle);
        this.redCircles.push(circle);
      };
      ScoreBoardForm.prototype.btnOk = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.ndResults.active ? this.returnHome() : this.goback();
      };
      ScoreBoardForm.prototype.btnHome = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (this.ndResults.active) {
          GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_SettlementQuit);
          this.mbtnHome.active && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_GoHome);
          this.returnHome();
        }
      };
      ScoreBoardForm.prototype.btnPlayAgain = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        GameMgr_1.default.GetInstance().CuttGameModel == DefineConfig_1.GameModel.Battle8Bid ? AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_012", function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_8Bid_SettlementRestart);
            cc.director.loadScene("SingleGame");
            _this.Close();
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        }) : this.RestartGame();
      };
      ScoreBoardForm.prototype.RestartGame = function() {
        DealCardsMgr_1.default.GetInstance().SetHalfwayExit(false);
        DealCardsMgr_1.default.GetInstance().SetSustainTwoReopen(false);
        this.mbtnHome.active && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Settlement_Playagain);
        var gameNum = GameDataMgr_1.default.GetInstance().getData("GameLastNum", 0);
        if (5 == GameMgr_1.default.GetInstance().RoundMax && 2 == gameNum) {
          GameDataMgr_1.default.GetInstance().setData("GameLastNum", 0);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_007");
        } else if (3 == GameMgr_1.default.GetInstance().RoundMax && 3 == gameNum) {
          GameDataMgr_1.default.GetInstance().setData("GameLastNum", 0);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_007");
        }
        cc.director.loadScene("SingleGame");
        this.Close();
      };
      ScoreBoardForm.prototype.returnHome = function() {
        DealCardsMgr_1.default.GetInstance().SetSustainTwoReopen(false);
        var data = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.FreeTrialData, null);
        if (data && (data.skinId > 0 || data.mIsPay)) {
          data.skinId = 0;
          data.skinType = -1;
          data.mIsPay = false;
          NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.FreeTrialData, data);
        }
        GameDataMgr_1.default.GetInstance().setData("CanCheckFreeTrial", true);
        cc.director.loadScene("MainScene");
        PlayerMgr_1.default.Instance.mIsGameSingle ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game2HomePage) : PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Ol2HomePage);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Interstitial, "cp_004");
        this.Close();
      };
      __decorate([ property([ cc.Node ]) ], ScoreBoardForm.prototype, "lines", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "ndNames", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "ndCurrent", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "ndEnd", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "ndResults", void 0);
      __decorate([ property(cc.Graphics) ], ScoreBoardForm.prototype, "grapMainLine", void 0);
      __decorate([ property(cc.Graphics) ], ScoreBoardForm.prototype, "grapSubLine", void 0);
      __decorate([ property(cc.Graphics) ], ScoreBoardForm.prototype, "grapEndLine", void 0);
      __decorate([ property(cc.Prefab) ], ScoreBoardForm.prototype, "pRedCircle", void 0);
      __decorate([ property(cc.Label) ], ScoreBoardForm.prototype, "ndRounds", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "mbtnPlayAgain", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "mbtnHome", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "mContent", void 0);
      __decorate([ property(cc.Node) ], ScoreBoardForm.prototype, "mvideoImg", void 0);
      ScoreBoardForm = __decorate([ ccclass ], ScoreBoardForm);
      return ScoreBoardForm;
    }(UIFormLogic_1.default);
    exports.default = ScoreBoardForm;
    cc._RF.pop();
  }, {
    "./Common/Mgr/DealCardsMgr": "DealCardsMgr",
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "./NFramework/UI/UIFormLogic": "UIFormLogic",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr"
  } ],
  ScrollItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0490eAA/DdG3LGZf/3//0dH", "ScrollItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var ScrollItem = function(_super) {
      __extends(ScrollItem, _super);
      function ScrollItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.data = null;
        _this.itemIndex = 0;
        _this.mRenderCallBack = null;
        _this.mClickCallbreak = null;
        return _this;
      }
      ScrollItem.prototype.dataChanged = function() {
        this.mRenderCallBack && this.mRenderCallBack(this.node, this.itemIndex);
      };
      ScrollItem.prototype.onClick = function() {
        this.mClickCallbreak && this.mClickCallbreak(this.node, this.itemIndex);
      };
      ScrollItem.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      ScrollItem = __decorate([ ccclass, menu("NFramework/ScrollItem") ], ScrollItem);
      return ScrollItem;
    }(cc.Component);
    exports.default = ScrollItem;
    cc._RF.pop();
  }, {} ],
  ScrollList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f97aT5Z9dJ1aO9l+X3d8lA", "ScrollList");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StartAxisType = exports.ListType = void 0;
    var ScrollItem_1 = require("./ScrollItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var ListType;
    (function(ListType) {
      ListType[ListType["Horizontal"] = 1] = "Horizontal";
      ListType[ListType["Vertical"] = 2] = "Vertical";
      ListType[ListType["Grid"] = 3] = "Grid";
    })(ListType = exports.ListType || (exports.ListType = {}));
    var StartAxisType;
    (function(StartAxisType) {
      StartAxisType[StartAxisType["Horizontal"] = 1] = "Horizontal";
      StartAxisType[StartAxisType["Vertical"] = 2] = "Vertical";
    })(StartAxisType = exports.StartAxisType || (exports.StartAxisType = {}));
    var ScorllList = function(_super) {
      __extends(ScorllList, _super);
      function ScorllList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemRender = null;
        _this.type = ListType.Vertical;
        _this.startAxis = StartAxisType.Horizontal;
        _this.spaceX = 0;
        _this.spaceY = 0;
        _this.padding_top = 0;
        _this.padding_buttom = 0;
        _this.padding_left = 0;
        _this._padding = 0;
        _this.padding_right = 0;
        _this.scrollView = null;
        _this.content = null;
        _this.itemDataList = [];
        _this.spawnCount = 0;
        _this.itemList = [];
        _this.itemHeight = 0;
        _this.itemWidth = 0;
        _this.itemPool = [];
        _this.mRenderCallBack = null;
        _this.mClickCallbreak = null;
        _this.halfScrollView = 0;
        _this.lastContentPosX = 0;
        _this.lastContentPosY = 0;
        _this.gridRow = 0;
        _this.gridCol = 0;
        _this.updateTimer = 0;
        _this.updateInterval = .1;
        _this.bScrolling = false;
        _this.updateFun = function() {};
        return _this;
      }
      Object.defineProperty(ScorllList.prototype, "ItemDataList", {
        get: function() {
          return this.itemDataList;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ScorllList.prototype, "ItemList", {
        get: function() {
          return this.itemList;
        },
        enumerable: false,
        configurable: true
      });
      ScorllList.prototype.SetRenderCallback = function(callback) {
        this.mRenderCallBack = callback;
      };
      ScorllList.prototype.SetClickCallback = function(callback) {
        this.mClickCallbreak = callback;
      };
      ScorllList.prototype.onLoad = function() {
        this.itemHeight = this.itemRender.height;
        this.itemWidth = this.itemRender.width;
        this.scrollView = this.node.getComponent(cc.ScrollView);
        this.content = this.scrollView.content;
        this.content.anchorX = 0;
        this.content.anchorY = 1;
        this.content.removeAllChildren();
        this.scrollView.node.on("scrolling", this.onScrolling, this);
      };
      ScorllList.prototype.setData = function(itemDataList) {
        this.itemDataList = itemDataList.slice();
        this.updateContent();
      };
      ScorllList.prototype.countListParam = function() {
        var dataLen = this.itemDataList.length;
        if (this.type == ListType.Vertical) {
          this.scrollView.horizontal = false;
          this.scrollView.vertical = true;
          this.content.width = this.content.parent.width;
          this.content.height = dataLen * this.itemHeight + (dataLen - 1) * this.spaceY + this.padding_top + this.padding_buttom;
          this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) + 2;
          this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
          this.updateFun = this.updateV;
        } else if (this.type == ListType.Horizontal) {
          this.scrollView.horizontal = true;
          this.scrollView.vertical = false;
          this.content.width = dataLen * this.itemWidth + (dataLen - 1) * this.spaceX + this.padding_left + this.padding_right;
          this.content.height = this.content.parent.height;
          this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) + 2;
          this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX;
          this.updateFun = this.udpateH;
        } else if (this.type == ListType.Grid) if (this.startAxis == StartAxisType.Vertical) {
          this.scrollView.horizontal = false;
          this.scrollView.vertical = true;
          this.content.width = this.content.parent.width;
          if (this.padding_left + this.padding_right + this.itemWidth + this.spaceX > this.content.width) {
            this.padding_left = 0;
            this.padding_right = 0;
            console.error("padding_left\u6216padding_right\u8fc7\u5927");
          }
          this.gridCol = Math.floor((this.content.width - this.padding_left - this.padding_right + this.spaceX) / (this.itemWidth + this.spaceX));
          this.gridRow = Math.ceil(dataLen / this.gridCol);
          this.content.height = this.gridRow * this.itemHeight + (this.gridRow - 1) * this.spaceY + this.padding_top + this.padding_buttom;
          this.spawnCount = Math.round(this.scrollView.node.height / (this.itemHeight + this.spaceY)) * this.gridCol + 2 * this.gridCol;
          this.halfScrollView = this.scrollView.node.height / 2 + this.itemHeight / 2 + this.spaceY;
          this.updateFun = this.updateGrid_V;
        } else if (this.startAxis == StartAxisType.Horizontal) {
          this.scrollView.horizontal = true;
          this.scrollView.vertical = false;
          this.content.height = this.content.parent.height;
          if (this.padding_top + this.padding_buttom + this.itemHeight + this.spaceY > this.content.height) {
            this.padding_top = 0;
            this.padding_buttom = 0;
            console.error("padding_top\u6216padding_buttom\u8fc7\u5927");
          }
          this.gridRow = Math.floor((this.content.height - this.padding_top - this.padding_buttom + this.spaceY) / (this.itemHeight + this.spaceY));
          this.gridCol = Math.ceil(dataLen / this.gridRow);
          this.content.width = this.gridCol * this.itemWidth + (this.gridCol - 1) * this.spaceX + this.padding_left + this.padding_right;
          this.spawnCount = Math.round(this.scrollView.node.width / (this.itemWidth + this.spaceX)) * this.gridRow + 2 * this.gridRow;
          this.halfScrollView = this.scrollView.node.width / 2 + this.itemWidth / 2 + this.spaceX;
          this.updateFun = this.updateGrid_H;
        }
      };
      ScorllList.prototype.createList = function(startIndex, offset) {
        if (this.itemDataList.length > this.spawnCount && startIndex + this.spawnCount - 1 >= this.itemDataList.length) {
          startIndex = this.itemDataList.length - this.spawnCount;
          offset = this.scrollView.getMaxScrollOffset();
        } else this.itemDataList.length <= this.spawnCount && (startIndex = 0);
        for (var i = 0; i < this.spawnCount; i++) {
          var item = void 0;
          if (!(i + startIndex < this.itemDataList.length)) {
            if (this.itemList.length > this.itemDataList.length - startIndex) {
              item = this.itemList.pop();
              item.removeFromParent(false);
              this.itemPool.push(item);
            }
            continue;
          }
          if (null == this.itemList[i]) {
            item = this.getItem();
            this.itemList.push(item);
            item.parent = this.content;
          } else item = this.itemList[i];
          var itemRender = item.getComponent(ScrollItem_1.default);
          itemRender.itemIndex = i + startIndex;
          itemRender.data = this.itemDataList[i + startIndex];
          itemRender.mRenderCallBack = this.mRenderCallBack;
          itemRender.mClickCallbreak = this.mClickCallbreak;
          itemRender.dataChanged();
          if (this.type == ListType.Vertical) item.setPosition(this.content.width / 2, -item.height * (.5 + i + startIndex) - this.spaceY * (i + startIndex) - this.padding_top); else if (this.type == ListType.Horizontal) item.setPosition(item.width * (.5 + i + startIndex) + this.spaceX * (i + startIndex) + this.padding_left, -this.content.height / 2); else if (this.type == ListType.Grid) if (this.startAxis == StartAxisType.Vertical) {
            var row = Math.floor((i + startIndex) / this.gridCol);
            var col = (i + startIndex) % this.gridCol;
            item.setPosition(item.width * (.5 + col) + this.spaceX * col + this.padding_left, -item.height * (.5 + row) - this.spaceY * row - this.padding_top);
            item.active = true;
          } else if (this.startAxis == StartAxisType.Horizontal) {
            var row = (i + startIndex) % this.gridRow;
            var col = Math.floor((i + startIndex) / this.gridRow);
            item.setPosition(item.width * (.5 + col) + this.spaceX * col + this.padding_left, -item.height * (.5 + row) - this.spaceY * row - this.padding_top);
            item.active = true;
          }
        }
        this.scrollView.scrollToOffset(offset);
      };
      ScorllList.prototype.getItem = function() {
        return 0 == this.itemPool.length ? cc.instantiate(this.itemRender) : this.itemPool.pop();
      };
      ScorllList.prototype.update = function(dt) {
        if (false == this.bScrolling) return;
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        this.bScrolling = false;
        this.updateFun();
      };
      ScorllList.prototype.onScrolling = function() {
        this.bScrolling = true;
      };
      ScorllList.prototype.updateV = function() {
        var items = this.itemList;
        var item;
        var bufferZone = this.halfScrollView;
        var isUp = this.scrollView.content.y > this.lastContentPosY;
        var offset = (this.itemHeight + this.spaceY) * items.length;
        for (var i = 0; i < items.length; i++) {
          item = items[i];
          var viewPos = this.getPositionInView(item);
          if (isUp) {
            if (viewPos.y > bufferZone && item.y - offset - this.padding_buttom > -this.content.height) {
              var itemRender = item.getComponent(ScrollItem_1.default);
              var itemIndex = itemRender.itemIndex + items.length;
              itemRender.itemIndex = itemIndex;
              itemRender.data = this.itemDataList[itemIndex];
              itemRender.dataChanged();
              item.y = item.y - offset;
            }
          } else if (viewPos.y < -bufferZone && item.y + offset + this.padding_top < 0) {
            var itemRender = item.getComponent(ScrollItem_1.default);
            var itemIndex = itemRender.itemIndex - items.length;
            itemRender.itemIndex = itemIndex;
            itemRender.data = this.itemDataList[itemIndex];
            itemRender.dataChanged();
            item.y = item.y + offset;
          }
        }
        this.lastContentPosY = this.scrollView.content.y;
      };
      ScorllList.prototype.udpateH = function() {
        var items = this.itemList;
        var item;
        var bufferZone = this.halfScrollView;
        var isRight = this.scrollView.content.x > this.lastContentPosX;
        var offset = (this.itemWidth + this.spaceX) * items.length;
        for (var i = 0; i < items.length; i++) {
          item = items[i];
          var viewPos = this.getPositionInView(item);
          if (isRight) {
            if (viewPos.x > bufferZone && item.x - offset - this.padding_left > 0) {
              var itemRender = item.getComponent(ScrollItem_1.default);
              var itemIndex = itemRender.itemIndex - items.length;
              itemRender.itemIndex = itemIndex;
              itemRender.data = this.itemDataList[itemIndex];
              itemRender.dataChanged();
              item.x = item.x - offset;
            }
          } else if (viewPos.x < -bufferZone && item.x + offset + this.padding_right < this.content.width) {
            var itemRender = item.getComponent(ScrollItem_1.default);
            var itemIndex = itemRender.itemIndex + items.length;
            itemRender.itemIndex = itemIndex;
            itemRender.data = this.itemDataList[itemIndex];
            itemRender.dataChanged();
            item.x = item.x + offset;
          }
        }
        this.lastContentPosX = this.scrollView.content.x;
      };
      ScorllList.prototype.updateGrid_V = function() {
        var items = this.itemList;
        var item;
        var bufferZone = this.halfScrollView;
        var isUp = this.scrollView.content.y > this.lastContentPosY;
        var offset = (this.itemHeight + this.spaceY) * (this.spawnCount / this.gridCol);
        for (var i = 0; i < items.length; i++) {
          item = items[i];
          var viewPos = this.getPositionInView(item);
          if (isUp) {
            if (viewPos.y > bufferZone && item.y - offset - this.padding_buttom > -this.content.height) {
              var itemRender = item.getComponent(ScrollItem_1.default);
              var itemIndex = itemRender.itemIndex + this.spawnCount / this.gridCol * this.gridCol;
              if (null != this.itemDataList[itemIndex]) {
                item.y = item.y - offset;
                itemRender.itemIndex = itemIndex;
                itemRender.data = this.itemDataList[itemIndex];
                itemRender.dataChanged();
                item.active = true;
              } else {
                item.y = item.y - offset;
                itemRender.itemIndex = itemIndex;
                item.active = false;
              }
            }
          } else if (viewPos.y < -bufferZone && item.y + offset + this.padding_top < 0) {
            var itemRender = item.getComponent(ScrollItem_1.default);
            var itemIndex = itemRender.itemIndex - this.spawnCount / this.gridCol * this.gridCol;
            if (null != this.itemDataList[itemIndex]) {
              item.y = item.y + offset;
              itemRender.itemIndex = itemIndex;
              itemRender.data = this.itemDataList[itemIndex];
              itemRender.dataChanged();
              item.active = true;
            } else {
              item.y = item.y + offset;
              itemRender.itemIndex = itemIndex;
              item.active = false;
            }
          }
        }
        this.lastContentPosY = this.scrollView.content.y;
      };
      ScorllList.prototype.updateGrid_H = function() {
        var items = this.itemList;
        var item;
        var bufferZone = this.halfScrollView;
        var isRight = this.scrollView.content.x > this.lastContentPosX;
        var offset = (this.itemWidth + this.spaceX) * (this.spawnCount / this.gridRow);
        for (var i = 0; i < items.length; i++) {
          item = items[i];
          var viewPos = this.getPositionInView(item);
          if (isRight) {
            if (viewPos.x > bufferZone && item.x - offset - this.padding_left > 0) {
              var itemRender = item.getComponent(ScrollItem_1.default);
              var itemIndex = itemRender.itemIndex - this.spawnCount / this.gridRow * this.gridRow;
              if (null != this.itemDataList[itemIndex]) {
                item.x = item.x - offset;
                itemRender.itemIndex = itemIndex;
                itemRender.data = this.itemDataList[itemIndex];
                itemRender.dataChanged();
                item.active = true;
              } else {
                item.x = item.x - offset;
                itemRender.itemIndex = itemIndex;
                item.active = false;
              }
            }
          } else if (viewPos.x < -bufferZone && item.x + offset + this.padding_right < this.content.width) {
            var itemRender = item.getComponent(ScrollItem_1.default);
            var itemIndex = itemRender.itemIndex + this.spawnCount / this.gridRow * this.gridRow;
            if (null != this.itemDataList[itemIndex]) {
              item.x = item.x + offset;
              itemRender.itemIndex = itemIndex;
              itemRender.data = this.itemDataList[itemIndex];
              itemRender.dataChanged();
              item.active = true;
            } else {
              item.x = item.x + offset;
              itemRender.itemIndex = itemIndex;
              item.active = false;
            }
          }
        }
        this.lastContentPosX = this.scrollView.content.x;
      };
      ScorllList.prototype.getPositionInView = function(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      };
      ScorllList.prototype.getListData = function() {
        return this.itemDataList;
      };
      ScorllList.prototype.addItem = function(data) {
        this.itemDataList.push(data);
        this.updateContent();
      };
      ScorllList.prototype.addItemAt = function(index, data) {
        if (null != this.itemDataList[index] || this.itemDataList.length == index) {
          this.itemDataList.splice(index, 1, data);
          this.updateContent();
        }
      };
      ScorllList.prototype.deleteItem = function(index) {
        if (null != this.itemDataList[index]) {
          this.itemDataList.splice(index, 1);
          this.updateContent();
        }
      };
      ScorllList.prototype.changeItem = function(index, data) {
        if (null != this.itemDataList[index]) {
          this.itemDataList[index] = data;
          this.updateContent();
        }
      };
      ScorllList.prototype.updateContent = function() {
        if (0 == this.itemList.length) {
          this.countListParam();
          this.createList(0, new cc.Vec2(0, 0));
        } else {
          if (this.type == ListType.Vertical) this.itemList.sort(function(a, b) {
            return b.y - a.y;
          }); else if (this.type == ListType.Horizontal) this.itemList.sort(function(a, b) {
            return a.x - b.x;
          }); else if (this.type == ListType.Grid) if (this.startAxis == StartAxisType.Vertical) {
            this.itemList.sort(function(a, b) {
              return a.x - b.x;
            });
            this.itemList.sort(function(a, b) {
              return b.y - a.y;
            });
          } else if (this.startAxis == StartAxisType.Horizontal) {
            this.itemList.sort(function(a, b) {
              return b.y - a.y;
            });
            this.itemList.sort(function(a, b) {
              return a.x - b.x;
            });
          }
          this.countListParam();
          var startIndex = this.itemList[0].getComponent(ScrollItem_1.default).itemIndex;
          this.type == ListType.Grid && this.startAxis == StartAxisType.Vertical ? startIndex += (startIndex + this.spawnCount) % this.gridCol : this.type == ListType.Grid && this.startAxis == StartAxisType.Horizontal && (startIndex += (startIndex + this.spawnCount) % this.gridRow);
          var offset = this.scrollView.getScrollOffset();
          offset.x = -offset.x;
          this.createList(startIndex, offset);
        }
      };
      ScorllList.prototype.onDestroy = function() {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) cc.isValid(this.itemList[i], true) && this.itemList[i].destroy();
        this.itemList.length = 0;
        len = this.itemPool.length;
        for (var i = 0; i < len; i++) cc.isValid(this.itemPool[i], true) && this.itemPool[i].destroy();
        this.itemPool.length = 0;
        this.itemDataList.length = 0;
      };
      ScorllList.prototype.SetScrollOffset = function(offset) {
        this.scrollView.scrollToOffset(offset);
        this.onScrolling();
      };
      __decorate([ property({
        type: cc.Node,
        tooltip: "\u5217\u8868\u9879"
      }) ], ScorllList.prototype, "itemRender", void 0);
      __decorate([ property({
        type: cc.Enum(ListType),
        tooltip: "\u6392\u5217\u65b9\u5f0f"
      }) ], ScorllList.prototype, "type", void 0);
      __decorate([ property({
        type: cc.Enum(StartAxisType),
        tooltip: "\u7f51\u683c\u5e03\u5c40\u4e2d\u7684\u65b9\u5411",
        visible: function() {
          return this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "startAxis", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u5217\u8868\u9879X\u95f4\u9694",
        visible: function() {
          return this.type == ListType.Horizontal || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "spaceX", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u5217\u8868\u9879Y\u95f4\u9694",
        visible: function() {
          return this.type == ListType.Vertical || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "spaceY", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u4e0a\u95f4\u8ddd",
        visible: function() {
          return this.type == ListType.Vertical || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "padding_top", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u4e0b\u95f4\u8ddd",
        visible: function() {
          return this.type == ListType.Vertical || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "padding_buttom", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u5de6\u95f4\u8ddd",
        visible: function() {
          return this.type == ListType.Horizontal || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "padding_left", void 0);
      __decorate([ property(cc.Integer) ], ScorllList.prototype, "_padding", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u53f3\u95f4\u8ddd",
        visible: function() {
          return this.type == ListType.Horizontal || this.type == ListType.Grid;
        }
      }) ], ScorllList.prototype, "padding_right", void 0);
      ScorllList = __decorate([ ccclass, menu("NFramework/ScorllList") ], ScorllList);
      return ScorllList;
    }(cc.Component);
    exports.default = ScorllList;
    cc._RF.pop();
  }, {
    "./ScrollItem": "ScrollItem"
  } ],
  ScrollViewPlusItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f730bjk4cRLvJBE1X7YRww6", "ScrollViewPlusItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var ScrollViewPlusItem = function(_super) {
      __extends(ScrollViewPlusItem, _super);
      function ScrollViewPlusItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.isShowing = true;
        return _this;
      }
      ScrollViewPlusItem.prototype.publishOnEnterScrollView = function() {
        this.onEnterSrcollView();
      };
      ScrollViewPlusItem.prototype.publishOnExitScrollView = function() {
        this.onExitScrollView();
      };
      ScrollViewPlusItem.prototype.publishOnPositionChange = function(xOffsetPercent, yOffsetPercent) {};
      ScrollViewPlusItem.prototype.onEnterSrcollView = function() {
        this.node.opacity = 255;
      };
      ScrollViewPlusItem.prototype.onExitScrollView = function() {
        this.node.opacity = 0;
      };
      ScrollViewPlusItem = __decorate([ ccclass, menu("NFramework/ScrollViewPlusItem") ], ScrollViewPlusItem);
      return ScrollViewPlusItem;
    }(cc.Component);
    exports.default = ScrollViewPlusItem;
    cc._RF.pop();
  }, {} ],
  ScrollViewPlus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6746aMbIVRJS4met/DkWKei", "ScrollViewPlus");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ScrollViewPlusItem_1 = require("./ScrollViewPlusItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var ScrollViewPlus = function(_super) {
      __extends(ScrollViewPlus, _super);
      function ScrollViewPlus() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.caculatePosition = false;
        return _this;
      }
      ScrollViewPlus.prototype.onEnable = function() {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this.node.on("scrolling", this._onScrollingDrawCallOpt, this);
        this.scheduleOnce(function() {
          _this._onScrollingDrawCallOpt();
        }, .02);
      };
      ScrollViewPlus.prototype.onDisable = function() {
        _super.prototype.onDisable.call(this);
        this.node.off("scrolling", this._onScrollingDrawCallOpt, this);
      };
      ScrollViewPlus.prototype._onScrollingDrawCallOpt = function() {
        if (0 == this.content.childrenCount) return;
        this.optDc();
      };
      ScrollViewPlus.prototype.optDc = function() {
        this.optDcHan(this, this.caculatePosition);
      };
      ScrollViewPlus.prototype.optDcHan = function(scrollView, caculatePosition, arrNode) {
        void 0 === arrNode && (arrNode = []);
        var svLeftBottomPoint = scrollView.node.parent.convertToWorldSpaceAR(cc.v2(scrollView.node.x - scrollView.node.anchorX * scrollView.node.width, scrollView.node.y - scrollView.node.anchorY * scrollView.node.height));
        var svBBoxRect = cc.rect(svLeftBottomPoint.x, svLeftBottomPoint.y, scrollView.node.width, scrollView.node.height);
        this.NodeHan(svBBoxRect, caculatePosition, scrollView.content.children);
        arrNode.length > 0 && this.NodeHan(svBBoxRect, caculatePosition, arrNode);
      };
      ScrollViewPlus.prototype.NodeHan = function(svBBoxRect, caculatePosition, arrNode) {
        void 0 === arrNode && (arrNode = []);
        arrNode.forEach(function(childNode) {
          var itemComponent = childNode.getComponent(ScrollViewPlusItem_1.default);
          if (null == itemComponent) return;
          var childNodeBBox = childNode.getBoundingBoxToWorld();
          var b = childNodeBBox.intersects(svBBoxRect);
          if (b) {
            if (!itemComponent.isShowing) {
              itemComponent.isShowing = true;
              itemComponent.publishOnEnterScrollView();
            }
            caculatePosition && itemComponent.isShowing && itemComponent.publishOnPositionChange((childNodeBBox.x - (svBBoxRect.x - childNodeBBox.width / 2)) / (childNodeBBox.width + svBBoxRect.width), (childNodeBBox.y - (svBBoxRect.y - childNodeBBox.height / 2)) / (childNodeBBox.height + svBBoxRect.height));
          } else if (itemComponent.isShowing) {
            itemComponent.isShowing = false;
            itemComponent.publishOnExitScrollView();
          }
        });
      };
      __decorate([ property({
        tooltip: "\u662f\u5426\u8ba1\u7b97\u5728\u53ef\u89c6\u533a\u57df\u4e2dItem\u7684\u76f8\u5bf9\u4f4d\u7f6e\uff08\u53ef\u80fd\u4f1a\u76f8\u5bf9\u8017\u6027\u80fd\uff09"
      }) ], ScrollViewPlus.prototype, "caculatePosition", void 0);
      ScrollViewPlus = __decorate([ ccclass, menu("NFramework/ScrollViewPlus") ], ScrollViewPlus);
      return ScrollViewPlus;
    }(cc.ScrollView);
    exports.default = ScrollViewPlus;
    cc._RF.pop();
  }, {
    "./ScrollViewPlusItem": "ScrollViewPlusItem"
  } ],
  SeeCardAdForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab0e9V6DPdOk4ddWKeQDH0G", "SeeCardAdForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../../NFramework/Definition/EnumMacros");
    var NF_1 = require("../../NFramework/NF");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../../Platform/AdManger");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var GameDataMgr_1 = require("../Mgr/GameDataMgr");
    var GameEntry_1 = require("../Mgr/GameEntry");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SeeCardAdForm = function(_super) {
      __extends(SeeCardAdForm, _super);
      function SeeCardAdForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mInterval = 5;
        _this.mTimer = -1;
        _this.mTxtTIme = null;
        _this.mDesc = null;
        _this.mVideoDesc = null;
        _this.mLabTimes = null;
        return _this;
      }
      SeeCardAdForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      SeeCardAdForm.prototype.onEnable = function() {
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.ABTest_Event, this.AbTestShow, this);
      };
      SeeCardAdForm.prototype.OnClose = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        clearInterval(this.mTimer);
        _super.prototype.OnClose.call(this);
      };
      SeeCardAdForm.prototype.AbTestShow = function() {
        this.mDesc.node.color = this.mDesc.getComponent(cc.LabelOutline).color = cc.color(28, 48, 105);
        this.mVideoDesc.enableBold = true;
      };
      SeeCardAdForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        var self = this;
        this.mInterval = 5;
        this.mTimer >= 0 && clearInterval(this.mTimer);
        this.mTimer = setInterval(function() {
          self.mInterval--;
          self.mTxtTIme.string = self.mInterval.toString();
          if (0 == self.mInterval) {
            self.stopInterval();
            self.showAd(true);
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AutoAD_Play);
          }
        }, 1e3);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AutoAD_Show, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        this.AbTestShow();
        var data = PlatformMgr_1.default.GetFBcData();
        Object.keys(data).length > 0 ? this.mTimes = Number(data.try_card_record_time_cy.mValue) / 60 : this.mTimes = 30;
        this.mLabTimes.string = "Watch Video to See \nwhich cards have been \nused and which are left. \nThe effect lasts " + this.mTimes + " minutes";
      };
      SeeCardAdForm.prototype.onDisable = function() {
        this.node.stopAllActions();
        NF_1.default.Notify.UnListenByObj(this);
      };
      SeeCardAdForm.prototype.OnBtnClose = function() {
        _super.prototype.Close.call(this);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.stopInterval();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AutoAD_Skip);
      };
      SeeCardAdForm.prototype.onBtnAd = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.stopInterval();
        this.showAd(true);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AD_Click);
        _super.prototype.Close.call(this);
      };
      SeeCardAdForm.prototype.showAd = function(auto) {
        var _this = this;
        _super.prototype.Close.call(this);
        var callfunc = function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            auto ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AutoAD_Success) : PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AD_Success);
            var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
            var endTime = new Date().getTime() + 60 * _this.mTimes * 1e3;
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.SkuTime + info.mPayId, endTime);
            GameDataMgr_1.default.GetInstance().setData("SkuEffective" + info.mPayId, 1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Game_UpdateNoteCardTime);
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        };
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Int_RewardVideo, "sp_004", callfunc);
      };
      SeeCardAdForm.prototype.stopInterval = function() {
        if (this.mTimer >= 0) {
          clearInterval(this.mTimer);
          this.mTimer = -1;
        }
      };
      __decorate([ property(cc.Label) ], SeeCardAdForm.prototype, "mTxtTIme", void 0);
      __decorate([ property(cc.Label) ], SeeCardAdForm.prototype, "mDesc", void 0);
      __decorate([ property(cc.Label) ], SeeCardAdForm.prototype, "mVideoDesc", void 0);
      __decorate([ property(cc.Label) ], SeeCardAdForm.prototype, "mLabTimes", void 0);
      SeeCardAdForm = __decorate([ ccclass ], SeeCardAdForm);
      return SeeCardAdForm;
    }(UIFormLogic_1.default);
    exports.default = SeeCardAdForm;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/Definition/EnumMacros": "EnumMacros",
    "../../NFramework/NF": "NF",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../../Platform/AdManger": "AdManger",
    "../../Platform/PlatformMgr": "PlatformMgr",
    "../Mgr/GameDataMgr": "GameDataMgr",
    "../Mgr/GameEntry": "GameEntry"
  } ],
  SeeCardBuyForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8de2rI9HtFKLcgOVnnBE/x", "SeeCardBuyForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../../NFramework/Definition/EnumMacros");
    var NF_1 = require("../../NFramework/NF");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../../Platform/AdManger");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var GameDataMgr_1 = require("../Mgr/GameDataMgr");
    var GameEntry_1 = require("../Mgr/GameEntry");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SeeCardBuyForm = function(_super) {
      __extends(SeeCardBuyForm, _super);
      function SeeCardBuyForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mInterval = 5;
        _this.mTimer = -1;
        _this.mShopData = null;
        _this.mbuyBg = null;
        _this.mVideoBg = null;
        _this.mSubsribeBox = null;
        _this.mBtnVideo = null;
        _this.mLabTimes = null;
        _this.mLabTimes2 = null;
        _this.txtPrice = null;
        return _this;
      }
      SeeCardBuyForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      SeeCardBuyForm.prototype.onEnable = function() {
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.ABTest_Event, this.AbTestShow, this);
      };
      SeeCardBuyForm.prototype.AbTestShow = function() {
        this.mbuyBg.color = cc.color(24, 162, 19);
        this.mVideoBg.color = cc.color(241, 207, 26);
      };
      SeeCardBuyForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        this.mSubsribeBox.active = show;
        this.mLabTimes2.node.active = false;
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        this.mShopData = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_Buy_Open);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Return_ShopPayCallBack, this.OnPayCallBack, this);
        this.AbTestShow();
        var data = PlatformMgr_1.default.GetFBcData();
        Object.keys(data).length > 0 ? this.mTimer = Number(data.try_card_record_time_sp.mValue) / 60 : this.mTimer = 30;
        this.mLabTimes.string = this.mTimer + " min";
        if (!show) {
          this.mBtnVideo.y = -35;
          this.mLabTimes2.node.active = true;
          this.mLabTimes2.string = "Watch Video to See \nwhich cards have been \nused and which are left. \nThe effect lasts " + this.mTimer + " minutes";
        }
        var shopinfo = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
        var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + shopinfo.mPayId, 0);
        var endTime = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.SkuTime + shopinfo.mPayId);
        var skuData = GameDataMgr_1.default.GetInstance().getData("Sku" + shopinfo.mPayId, null);
        if (1 == effective) {
          var day = NF_1.default.Date.LeftTimeFormat(endTime, "ddD hhH");
          this.txtPrice.string = "Left in " + day;
        } else this.txtPrice.string = (skuData ? skuData.price : "$" + (shopinfo.mPriceB / 100).toFixed(2)) + "/mon";
      };
      SeeCardBuyForm.prototype.onDisable = function() {
        this.node.stopAllActions();
        NF_1.default.Notify.UnListenByObj(this);
      };
      SeeCardBuyForm.prototype.OnBtnClose = function() {
        _super.prototype.Close.call(this);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
      };
      SeeCardBuyForm.prototype.OnClose = function() {
        _super.prototype.OnClose.call(this);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      SeeCardBuyForm.prototype.onBtnAd = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AD_Click, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_001", function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_AD_Success);
            var endTime = new Date().getTime() + 60 * _this.mTimer * 1e3;
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.SkuTime + _this.mShopData.mPayId, endTime);
            GameDataMgr_1.default.GetInstance().setData("SkuEffective" + _this.mShopData.mPayId, 1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Game_UpdateNoteCardTime);
            _super.prototype.Close.call(_this);
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        });
      };
      SeeCardBuyForm.prototype.onBtnBuy = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_subscribe_Click);
        PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
        if (NF_1.default.Config.GMShopDebug) {
          NF_1.default.Storage.SetString(DefineConfig_1.LocalStorageKey.SkuTime + this.mShopData.mPayId, (new Date().getTime() + 2592e6).toString());
          GameDataMgr_1.default.GetInstance().setData("SkuEffective" + this.mShopData.mPayId, 1);
          this.OnPayCallBack(1);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        }
        return;
      };
      SeeCardBuyForm.prototype.OnPayCallBack = function(state) {
        if (1 == state || 2 == state) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SeeCards_subscribe_Success);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Game_UpdateNoteCardTime);
          _super.prototype.Close.call(this);
        } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Pay failed, Please try again later!");
      };
      __decorate([ property(cc.Node) ], SeeCardBuyForm.prototype, "mbuyBg", void 0);
      __decorate([ property(cc.Node) ], SeeCardBuyForm.prototype, "mVideoBg", void 0);
      __decorate([ property(cc.Node) ], SeeCardBuyForm.prototype, "mSubsribeBox", void 0);
      __decorate([ property(cc.Node) ], SeeCardBuyForm.prototype, "mBtnVideo", void 0);
      __decorate([ property(cc.Label) ], SeeCardBuyForm.prototype, "mLabTimes", void 0);
      __decorate([ property(cc.Label) ], SeeCardBuyForm.prototype, "mLabTimes2", void 0);
      __decorate([ property(cc.Label) ], SeeCardBuyForm.prototype, "txtPrice", void 0);
      SeeCardBuyForm = __decorate([ ccclass ], SeeCardBuyForm);
      return SeeCardBuyForm;
    }(UIFormLogic_1.default);
    exports.default = SeeCardBuyForm;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/Definition/EnumMacros": "EnumMacros",
    "../../NFramework/NF": "NF",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../../Platform/AdManger": "AdManger",
    "../../Platform/PlatformMgr": "PlatformMgr",
    "../Mgr/GameDataMgr": "GameDataMgr",
    "../Mgr/GameEntry": "GameEntry"
  } ],
  SelectRoomForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f3deBCrvtOuKXsrpxS/F7l", "SelectRoomForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../NFramework/NF");
    var SelectRoomItem_1 = require("./SelectRoomItem");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectRoomForm = function(_super) {
      __extends(SelectRoomForm, _super);
      function SelectRoomForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mNodeContent = null;
        _this.mLabGold = null;
        _this.mBtnShopCoin = null;
        _this.mItemArr = [];
        return _this;
      }
      SelectRoomForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.mRoomInfo = NF_1.default.DataTables.GetAllInfos("RoomInfo");
        var childs = this.mNodeContent.children;
        for (var index = 0; index < childs.length; index++) {
          var element = childs[index];
          var script = element.getComponent(SelectRoomItem_1.default);
          this.mItemArr.push(script);
        }
      };
      SelectRoomForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.RoomPage);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Gold, this.RefreshGold, this);
        this.mFunc = param;
        var self = this;
        for (var index = 0; index < this.mItemArr.length; index++) {
          var script = this.mItemArr[index];
          var info = this.mRoomInfo[index + 1];
          script.SetView(info);
        }
        NF_1.default.Audio.Play(2);
        this.RefreshGold();
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        this.mBtnShopCoin.active = show;
      };
      SelectRoomForm.prototype.RefreshGold = function() {
        this.mLabGold.string = NF_1.default.String.ToBigNumberString(PlayerMgr_1.default.Instance.PlayerData.mGold);
      };
      SelectRoomForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
      };
      SelectRoomForm.prototype.OnBtnShopGold = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopClick);
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 3);
      };
      SelectRoomForm.prototype.OnPlayCallback = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.RoomPlay);
        this.OnBtnClose();
      };
      SelectRoomForm.prototype.OnBtnClose = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        _super.prototype.Close.call(this);
      };
      SelectRoomForm.prototype.OnClose = function() {
        _super.prototype.OnClose.call(this);
        NF_1.default.Notify.UnListen(GameEnum_1.EnumNotify.EN_Refresh_Gold, this);
      };
      __decorate([ property(cc.Node) ], SelectRoomForm.prototype, "mNodeContent", void 0);
      __decorate([ property(cc.Label) ], SelectRoomForm.prototype, "mLabGold", void 0);
      __decorate([ property(cc.Node) ], SelectRoomForm.prototype, "mBtnShopCoin", void 0);
      SelectRoomForm = __decorate([ ccclass ], SelectRoomForm);
      return SelectRoomForm;
    }(UIFormLogic_1.default);
    exports.default = SelectRoomForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr",
    "./SelectRoomItem": "SelectRoomItem"
  } ],
  SelectRoomItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f1d74jqCRPKKiQ1MJXmxhO", "SelectRoomItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var GameMgr_1 = require("../Common/Mgr/GameMgr");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NF_1 = require("../NFramework/NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SelectRoomItem = function(_super) {
      __extends(SelectRoomItem, _super);
      function SelectRoomItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mBnode = null;
        _this.mLabCostNum2 = null;
        _this.mBtnPlay2 = null;
        _this.mNodeUnlock2 = null;
        _this.mLabUnlock2 = null;
        _this.mLabDesc = null;
        _this.mEffect = null;
        return _this;
      }
      SelectRoomItem.prototype.AbTestShow = function() {
        this.mBnode.active = true;
      };
      SelectRoomItem.prototype.SetView = function(info) {
        this.mInfo = info;
        this.mLabCostNum2.string = NF_1.default.String.ToBigNumberString(info.mPrice);
        var unlock = PlayerMgr_1.default.Instance.PlayerData.mLv >= info.mUnlock;
        this.mBtnPlay2.node.active = unlock;
        this.mNodeUnlock2.active = !unlock;
        this.mEffect.active = unlock;
        this.mLabUnlock2.string = "Lv" + info.mUnlock + " unlock";
        this.mLabDesc.string = info.mName;
        this.AbTestShow();
      };
      SelectRoomItem.prototype.OnBtnPlay = function(event, data) {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        var gold = PlayerMgr_1.default.Instance.PlayerData.mGold;
        if (gold < this.mInfo.mPrice) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Insufficient coins!");
          return;
        }
        GameMgr_1.default.GetInstance().OnlineCurRoomInfo = this.mInfo;
        GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.SelectRoomForm);
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.FakeGameForm);
      };
      __decorate([ property(cc.Node) ], SelectRoomItem.prototype, "mBnode", void 0);
      __decorate([ property(cc.Label) ], SelectRoomItem.prototype, "mLabCostNum2", void 0);
      __decorate([ property(cc.Button) ], SelectRoomItem.prototype, "mBtnPlay2", void 0);
      __decorate([ property(cc.Node) ], SelectRoomItem.prototype, "mNodeUnlock2", void 0);
      __decorate([ property(cc.Label) ], SelectRoomItem.prototype, "mLabUnlock2", void 0);
      __decorate([ property(cc.Label) ], SelectRoomItem.prototype, "mLabDesc", void 0);
      __decorate([ property(cc.Node) ], SelectRoomItem.prototype, "mEffect", void 0);
      SelectRoomItem = __decorate([ ccclass ], SelectRoomItem);
      return SelectRoomItem;
    }(cc.Component);
    exports.default = SelectRoomItem;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/GameMgr": "GameMgr",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/NF": "NF"
  } ],
  SettingForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6554bJKQ3lPWaPhqfWaOnLU", "SettingForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var NF_1 = require("../NFramework/NF");
    var NFBasePlatformMgr_1 = require("../NFramework/Platform/NFBasePlatformMgr");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SettingForm = function(_super) {
      __extends(SettingForm, _super);
      function SettingForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mImgSound = null;
        _this.mImgEffect = null;
        _this.mSoundOn = true;
        _this.mEffectOn = true;
        _this.mTitle = null;
        _this.mCancel = null;
        _this.mQuitTF = null;
        _this.mPrivacyPolicyTF = null;
        _this.mCancelTF = null;
        _this.mPrivacyPolicy = null;
        return _this;
      }
      SettingForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      SettingForm.prototype.onDisable = function() {
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      SettingForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        this.mPrivacyPolicy.active = show;
        this.SetView();
        NF_1.default.Audio.Play(2);
        this.AbTestShow();
      };
      SettingForm.prototype.AbTestShow = function() {
        this.mTitle.fontSize = 42;
        this.mTitle.enableBold = true;
        this.mCancel.node.color = cc.color(19, 173, 23, 255);
        this.mPrivacyPolicyTF.fontSize = this.mCancelTF.fontSize = this.mQuitTF.fontSize = 32;
        this.mPrivacyPolicyTF.enableBold = this.mCancelTF.enableBold = this.mQuitTF.enableBold = true;
      };
      SettingForm.prototype.SetView = function() {
        this.mSoundOn = NF_1.default.Audio.MusicMute;
        this.mEffectOn = NF_1.default.Audio.EffectMute;
        this.mImgSound.node.active = this.mSoundOn;
        this.mImgEffect.node.active = this.mEffectOn;
      };
      SettingForm.prototype.OnBtnSound = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.mSoundOn = !this.mSoundOn;
        NF_1.default.Audio.SetMusicMute(this.mSoundOn);
        this.mImgSound.node.active = this.mSoundOn;
        PlatformMgr_1.default.GetInstance().OnEventCount(this.mSoundOn ? DefineConfig_1.EventName.Set_Music_On : DefineConfig_1.EventName.Set_Music_Off);
        this.mSoundOn || NF_1.default.Audio.Play(10001);
      };
      SettingForm.prototype.OnBtnEffect = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.mEffectOn = !this.mEffectOn;
        NF_1.default.Audio.SetEffectMute(this.mEffectOn);
        this.mImgEffect.node.active = this.mEffectOn;
        PlatformMgr_1.default.GetInstance().OnEventCount(this.mEffectOn ? DefineConfig_1.EventName.Set_EX_On : DefineConfig_1.EventName.Set_EX_Off);
      };
      SettingForm.prototype.OnBtnExitGame = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Set_ExitGame_Click);
        cc.game.end();
      };
      SettingForm.prototype.OnBtnPrivacyPolicy = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        NFBasePlatformMgr_1.default.GetInstance().PrivacyPolicy();
      };
      SettingForm.prototype.OnBtnClose = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Set_ExitGame_Cancel);
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Sprite) ], SettingForm.prototype, "mImgSound", void 0);
      __decorate([ property(cc.Sprite) ], SettingForm.prototype, "mImgEffect", void 0);
      __decorate([ property(cc.Label) ], SettingForm.prototype, "mTitle", void 0);
      __decorate([ property(cc.Sprite) ], SettingForm.prototype, "mCancel", void 0);
      __decorate([ property(cc.Label) ], SettingForm.prototype, "mQuitTF", void 0);
      __decorate([ property(cc.Label) ], SettingForm.prototype, "mPrivacyPolicyTF", void 0);
      __decorate([ property(cc.Label) ], SettingForm.prototype, "mCancelTF", void 0);
      __decorate([ property(cc.Node) ], SettingForm.prototype, "mPrivacyPolicy", void 0);
      SettingForm = __decorate([ ccclass ], SettingForm);
      return SettingForm;
    }(UIFormLogic_1.default);
    exports.default = SettingForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../NFramework/Platform/NFBasePlatformMgr": "NFBasePlatformMgr",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopConfirmForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2aa1aFrjypJ37kUrIMBnaTC", "ShopConfirmForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NF_1 = require("../NFramework/NF");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopConfirmForm = function(_super) {
      __extends(ShopConfirmForm, _super);
      function ShopConfirmForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mBtnBuy = null;
        _this.mTxtPrice = null;
        _this.mTxtNumber = null;
        _this.mImgGoldIcon = null;
        _this.mImgNumberBg = null;
        _this.mImgIcon = null;
        _this.mBtnBg = null;
        _this.mShopData = null;
        _this.mCanClick = true;
        return _this;
      }
      ShopConfirmForm.prototype.start = function() {};
      ShopConfirmForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      ShopConfirmForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        NF_1.default.Audio.Play(2);
        this.mCanClick = true;
        if (param) {
          this.mShopData = param;
          var skuData = GameDataMgr_1.default.GetInstance().getData("Sku" + param.mPayId, null);
          if (this.mShopData.mNumber > 1) {
            this.mImgNumberBg.node.active = true;
            this.mTxtNumber.string = NF_1.default.String.ToBigNumberString(this.mShopData.mNumber);
          } else {
            this.mImgNumberBg.node.active = false;
            this.mTxtNumber.string = "";
          }
          var self_1 = this;
          cc.loader.loadRes(this.mShopData.mTexture, cc.SpriteFrame, function(err, frame) {
            if (err) {
              NF_1.default.Debug.Error("Load SpriteFrame error: " + err);
              return;
            }
            self_1.mImgIcon.spriteFrame = frame;
          });
          this.mImgGoldIcon.node.active = 3 == this.mShopData.mType;
          3 == this.mShopData.mType ? this.mTxtPrice.string = NF_1.default.String.ToBigNumberString(this.mShopData.mPrice) : 1 == this.mShopData.mType ? this.mTxtPrice.string = (skuData ? skuData.price : "$" + (this.mShopData.mPrice / 100).toFixed(2)) + "/mon" : 2 == this.mShopData.mType && (this.mTxtPrice.string = skuData ? skuData.price : "$" + (this.mShopData.mPrice / 100).toFixed(2));
        }
        this.AbTestShow();
      };
      ShopConfirmForm.prototype.onEnable = function() {
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Return_ShopPayCallBack, this.OnPayCallBack, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.ABTest_Event, this.AbTestShow, this);
      };
      ShopConfirmForm.prototype.onDisable = function() {
        NF_1.default.Notify.UnListenByObj(this);
      };
      ShopConfirmForm.prototype.AbTestShow = function() {
        this.mBtnBg.color = cc.color(24, 162, 19, 255);
        this.mTxtPrice.enableBold = true;
      };
      ShopConfirmForm.prototype.onBtnBuy = function() {
        var _this = this;
        if (false == this.mCanClick) return;
        this.mCanClick = false;
        setTimeout(function() {
          _this.mCanClick = true;
        }, 2e3);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopConfirm + this.mShopData.mId, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        if (3 == this.mShopData.mType) {
          2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
          PlayerMgr_1.default.Instance.AddGold(-this.mShopData.mPrice);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
          this.OnBtnClose();
          return;
        }
        if (1 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          if (NF_1.default.Config.GMShopDebug) {
            NF_1.default.Storage.SetString(DefineConfig_1.LocalStorageKey.SkuTime + this.mShopData.mPayId, (new Date().getTime() + 2592e6).toString());
            GameDataMgr_1.default.GetInstance().setData("SkuEffective" + this.mShopData.mPayId, 1);
            this.OnPayCallBack(1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
          }
          return;
        }
        if (2 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          if (NF_1.default.Config.GMShopDebug) {
            var gold = this.mShopData.mNumber;
            PlayerMgr_1.default.Instance.AddGold(gold);
            2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
            this.OnPayCallBack(1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
          }
          return;
        }
      };
      ShopConfirmForm.prototype.OnPayCallBack = function(state) {
        if (1 == state || 2 == state) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
          this.OnBtnClose();
        } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Pay failed, Please try again later!");
      };
      ShopConfirmForm.prototype.OnBtnClose = function() {
        NF_1.default.BtnUtils.IsTouchEnd(0);
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Button) ], ShopConfirmForm.prototype, "mBtnBuy", void 0);
      __decorate([ property(cc.Label) ], ShopConfirmForm.prototype, "mTxtPrice", void 0);
      __decorate([ property(cc.Label) ], ShopConfirmForm.prototype, "mTxtNumber", void 0);
      __decorate([ property(cc.Sprite) ], ShopConfirmForm.prototype, "mImgGoldIcon", void 0);
      __decorate([ property(cc.Sprite) ], ShopConfirmForm.prototype, "mImgNumberBg", void 0);
      __decorate([ property(cc.Sprite) ], ShopConfirmForm.prototype, "mImgIcon", void 0);
      __decorate([ property(cc.Node) ], ShopConfirmForm.prototype, "mBtnBg", void 0);
      ShopConfirmForm = __decorate([ ccclass ], ShopConfirmForm);
      return ShopConfirmForm;
    }(UIFormLogic_1.default);
    exports.default = ShopConfirmForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopDiscountForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e33c1Nt18xFCZMUo0bLx3bH", "ShopDiscountForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../Platform/AdManger");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopDiscountForm = function(_super) {
      __extends(ShopDiscountForm, _super);
      function ShopDiscountForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mlabelLab = null;
        _this.mTimesLab = null;
        _this.mIcon = null;
        _this.monBuyBg = null;
        _this.icon_shipin = null;
        _this.icon_jinbi = null;
        _this.txtPrice1 = null;
        _this.txtPrice = null;
        _this.txtPrice2 = null;
        _this.gameData = null;
        return _this;
      }
      ShopDiscountForm.prototype.onDisable = function() {
        NF_1.default.Notify.UnListenByObj(this);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_TimeLimit_Close);
        this.unschedule(this.ShowDiscountTimes);
      };
      ShopDiscountForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_TimeLimit_Appear);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Shop, this.SetView, this);
        this.SetView();
      };
      ShopDiscountForm.prototype.SetView = function() {
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        this.mDiscountData = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (this.mDiscountData) {
          this.mSkinInfo = this.mDiscountData.SkinInfo;
          if (3 == this.mSkinInfo.mType) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TimeLimit_Coin_Appear);
            this.monBuyBg.color = cc.color(19, 173, 23, 255);
            this.mlabelLab.string = "-20%";
            this.icon_shipin.active = false;
            this.icon_jinbi.active = true;
            this.txtPrice1.string = "";
            this.txtPrice.string = NF_1.default.String.ToBigNumberString(.8 * this.mSkinInfo.mPriceB);
            this.txtPrice2.string = NF_1.default.String.ToBigNumberString(this.mSkinInfo.mPriceB);
          } else if (7 == this.mSkinInfo.mType) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TimeLimit_AD_Appear);
            this.monBuyBg.color = cc.color(241, 207, 26, 255);
            this.mlabelLab.string = "AD-1";
            this.icon_shipin.active = true;
            this.icon_jinbi.active = false;
            var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mSkinInfo.mId, 0);
            this.txtPrice1.string = count.toString();
            this.txtPrice.string = 0 == this.mSkinInfo.mPriceB ? "Free" : "/ " + (this.mSkinInfo.mPriceB - 1);
            this.txtPrice2.string = this.mSkinInfo.mPriceB.toString();
          }
          this.mSkinInfo && this.loadResTexture(this.mSkinInfo.mTexture);
          this.ShowDiscountTimes();
          this.schedule(this.ShowDiscountTimes, 1);
        }
      };
      ShopDiscountForm.prototype.loadResTexture = function(url) {
        var self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, frame) {
          if (err) {
            NF_1.default.Debug.Error("Load SpriteFrame error: " + err);
            return;
          }
          self.mIcon.spriteFrame = frame;
        });
      };
      ShopDiscountForm.prototype.ShowDiscountTimes = function() {
        var millis = this.mDiscountData.DiscountEndTimes - NF_1.default.Time.GetCurrentTimeMillis();
        millis /= 1e3;
        if (millis < 0) {
          this.unschedule(this.ShowDiscountTimes);
          return;
        }
        this.mTimesLab.string = NF_1.default.Date.GetHourAndMinAndSec(millis);
      };
      ShopDiscountForm.prototype.onBuy = function() {
        var _this = this;
        if (this.mSkinInfo) switch (this.mSkinInfo.mType) {
         case 3:
          var mGold = PlayerMgr_1.default.Instance.PlayerData.mGold;
          var Price = .8 * this.mSkinInfo.mPriceB;
          if (Price > mGold) {
            SkinMgr_1.default.GetInstance().SetWeight(this.mSkinInfo.mId);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "You need more coins!");
            setTimeout(function() {
              var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
              if (freeTimes > DefineConfig_1.Constant.MaxFreeCoinsPerDay) {
                var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
                times < DefineConfig_1.Constant.MaxTurntableTimesPerDay && GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TurntableForm);
              } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.FreeCoinsForm);
            }, 500);
          } else {
            2 != this.mSkinInfo.mTag2 && 1 != this.mSkinInfo.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mSkinInfo);
            PlayerMgr_1.default.Instance.AddGold(-Price);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mSkinInfo);
            this.Close();
          }
          break;

         case 7:
          var placeid = "sp_005";
          303 == this.mSkinInfo.mId ? placeid = "sp_006" : 305 == this.mSkinInfo.mId ? placeid = "sp_007" : 307 == this.mSkinInfo.mId ? placeid = "sp_008" : 403 == this.mSkinInfo.mId ? placeid = "sp_009" : 405 == this.mSkinInfo.mId ? placeid = "sp_0010" : 407 == this.mSkinInfo.mId && (placeid = "sp_0011");
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, placeid, function(status) {
            if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopAdSuccess + _this.mSkinInfo.mId);
              _this.AdCallbreak();
            } else {
              SkinMgr_1.default.GetInstance().SetWeight(_this.mSkinInfo.mId);
              GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
            }
          });
        }
      };
      ShopDiscountForm.prototype.AdCallbreak = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TimeLimit_AD_Watch);
        var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mSkinInfo.mId, 0);
        count++;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mSkinInfo.mId, count);
        var Price = this.mSkinInfo.mPriceB - 1;
        if (count >= Price) {
          2 != this.mSkinInfo.mTag2 && 1 != this.mSkinInfo.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mSkinInfo);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mSkinInfo);
          this.Close();
        } else {
          SkinMgr_1.default.GetInstance().SetWeight(this.mSkinInfo.mId);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        }
      };
      __decorate([ property(cc.Label) ], ShopDiscountForm.prototype, "mlabelLab", void 0);
      __decorate([ property(cc.Label) ], ShopDiscountForm.prototype, "mTimesLab", void 0);
      __decorate([ property(cc.Sprite) ], ShopDiscountForm.prototype, "mIcon", void 0);
      __decorate([ property(cc.Node) ], ShopDiscountForm.prototype, "monBuyBg", void 0);
      __decorate([ property(cc.Node) ], ShopDiscountForm.prototype, "icon_shipin", void 0);
      __decorate([ property(cc.Node) ], ShopDiscountForm.prototype, "icon_jinbi", void 0);
      __decorate([ property(cc.Label) ], ShopDiscountForm.prototype, "txtPrice1", void 0);
      __decorate([ property(cc.Label) ], ShopDiscountForm.prototype, "txtPrice", void 0);
      __decorate([ property(cc.Label) ], ShopDiscountForm.prototype, "txtPrice2", void 0);
      ShopDiscountForm = __decorate([ ccclass ], ShopDiscountForm);
      return ShopDiscountForm;
    }(UIFormLogic_1.default);
    exports.default = ShopDiscountForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0369cyXsuhKC6KBFi06S2T5", "ShopForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dc = require("../Definition/Constant/DefineConfig");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NF_1 = require("../NFramework/NF");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopForm = function(_super) {
      __extends(ShopForm, _super);
      function ShopForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mScrollView = null;
        _this.mScrollMask = null;
        _this.mScrollViewContent = null;
        _this.mShopItem = null;
        _this.mBtnBG = [];
        _this.mBtnLabel = [];
        _this.mLabGold = null;
        _this.mbtnSub = null;
        _this.mqiege = null;
        _this.mshop2 = null;
        _this.mbtnCardSkin = null;
        _this.mRedPiont = null;
        _this.mTag = 0;
        return _this;
      }
      ShopForm.prototype.start = function() {};
      ShopForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.mItemNodeArr = [];
      };
      ShopForm.prototype.OnOpen = function(param) {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopPopups);
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        this.mbtnSub.active = show;
        this.mqiege.active = show;
        if (!show) {
          this.mbtnCardSkin.spriteFrame = this.mshop2;
          this.mbtnCardSkin.node.scaleX = -1;
        }
        NF_1.default.Audio.Play(2);
        _super.prototype.OnOpen.call(this, param);
        3 == param ? this.onBtnClickSubTag() : 1 == param ? this.onBtnClickTableSkinTag() : this.onBtnClickCardSkinTag();
        this.RefreshGold();
        this.RefreshShopRedPoint();
        this.RefreshScroll();
      };
      ShopForm.prototype.onEnable = function() {
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Shop, this.RefreshItem, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_HomeFreeCoins, this.RefreshItem, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.Inter_Day_Event, this.RefreshItem, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Gold, this.RefreshGold, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint, this.RefreshShopRedPoint, this);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.AD_Status, this.RefreshScroll, this);
        if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.SelectRoomForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        }
      };
      ShopForm.prototype.onDisable = function() {
        NF_1.default.Notify.UnListenByObj(this);
        if ("SingleGame" == cc.director.getScene().name) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        }
        this.OpenShopFreeTrial();
      };
      ShopForm.prototype.RefreshGold = function() {
        this.mLabGold.string = NF_1.default.String.ToBigNumberString(PlayerMgr_1.default.Instance.PlayerData.mGold);
      };
      ShopForm.prototype.RefreshItem = function() {
        var children = this.mScrollViewContent.children;
        children && children.length > 0 && children.forEach(function(node) {
          var dele = node.getComponent("ShopItem");
          dele.RefreshItem();
        });
      };
      ShopForm.prototype.RefreshShopRedPoint = function() {
        var DayBtnClick = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick);
        this.mRedPiont.active = !DayBtnClick;
      };
      ShopForm.prototype.onBtnClickSubTag = function() {
        NF_1.default.Debug.Log(">>>onBtnClickSubTag ");
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Shop_Subscription_Click);
        this.ShowBtnEnbaleByTag(3);
        this.InitScrollViewByTag(3);
      };
      ShopForm.prototype.onBtnClickCardSkinTag = function() {
        NF_1.default.Debug.Log(">>>onBtnClickCardSkinTag ");
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Shop_Cards_Click);
        this.ShowBtnEnbaleByTag(2);
        this.InitScrollViewByTag(2);
      };
      ShopForm.prototype.onBtnClickTableSkinTag = function() {
        NF_1.default.Debug.Log(">>>onBtnClickTableSkinTag ");
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Shop_Background_Click);
        this.ShowBtnEnbaleByTag(1);
        this.InitScrollViewByTag(1);
      };
      ShopForm.prototype.ShowBtnEnbaleByTag = function(tag) {
        this.mTag = tag;
        for (var i = 0; i < 3; i++) {
          var element = this.mBtnBG[i];
          element.active = tag == i + 1;
          this.mBtnLabel[i].color = tag == i + 1 ? cc.color(109, 42, 16, 255) : cc.color(255, 255, 255, 255);
        }
        NF_1.default.BtnUtils.IsTouchEnd();
      };
      ShopForm.prototype.InitScrollViewByTag = function(tag) {
        var data = [];
        var infos = SkinMgr_1.default.GetInstance().AllShopInfo;
        for (var index = 0; index < infos.length; index++) {
          var element = infos[index];
          if (element && element.mTag2 == tag) {
            var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
            if (show) {
              if (309 == element.mId || 409 == element.mId) continue;
            } else if (2 == element.mType) continue;
            data.push(element);
          }
        }
        this.mScrollViewContent.removeAllChildren();
        this.mScrollView.stopAutoScroll();
        this.mScrollView.scrollToTop();
        this.mItemNodeArr.forEach(function(item) {
          item.active = false;
        });
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item && -1 == SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(item.SkinId) && (2 == tag || 1 == tag)) {
          var info = void 0;
          for (var index = 0; index < data.length; index++) {
            var element = data[index];
            if (element.mId == item.SkinId) {
              info = element;
              data.splice(index, 1);
              data.splice(0, 0, info);
              break;
            }
          }
        }
        var count = data.length - this.mItemNodeArr.length;
        if (count > 0) for (var i = 0; i < count; i++) {
          var node = cc.instantiate(this.mShopItem);
          node.active = false;
          this.mItemNodeArr.push(node);
        }
        var offsetx = 96;
        var lines = Math.floor((data.length - 1) / 4) + 1;
        var itemidx = 0;
        NF_1.default.Debug.Log(">>> lines ", lines);
        for (var i = 1; i <= lines; i++) for (var j = 0; j < 4; j++) {
          var index = 4 * (i - 1) + j;
          var itemData = data[index];
          if (itemData) {
            var node = this.mItemNodeArr[itemidx];
            node.setPosition(cc.v2(196 * j + offsetx + 20 * j, 85 * -i + 90 * (1 - i)));
            var dele = node.getComponent("ShopItem");
            dele.InitItem(itemData);
            node.active = true;
            null == node.parent && this.mScrollViewContent.addChild(node);
            itemidx += 1;
          }
        }
        this.mScrollViewContent.height = 180 * lines;
      };
      ShopForm.prototype.RefreshScroll = function(type) {
        void 0 === type && (type = -1);
        AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom, "") || AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Banner_Bottom, "") ? this.mScrollMask.height = 325 : this.mScrollMask.height = 405;
      };
      ShopForm.prototype.OnBtnClose = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        _super.prototype.Close.call(this);
      };
      ShopForm.prototype.OpenShopFreeTrial = function() {
        if ("SingleGame" == cc.director.getScene().name) return;
        if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.SelectRoomForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
        var time = new Date();
        var data = NF_1.default.Storage.GetData(dc.LocalStorageKey.FreeTrialData, null);
        if (!data) {
          data = {};
          data.skinId = 0;
          data.skinType = -1;
          data.mIsPay = false;
        }
        if (data.mIsPay) return;
        if (data.skinId <= 0) {
          var array = [];
          var allInfos = SkinMgr_1.default.GetInstance().AllShopInfo;
          for (var i = 0; i < allInfos.length; i++) {
            var info = allInfos[i];
            if (3 == info.mTag || 4 == info.mTag) {
              var unlock = -1 == SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(info.mId);
              unlock && array.push(info);
            }
          }
          if (array.length > 0) {
            var min = 0;
            var max = array.length;
            var index = Math.floor(Math.random() * (max - min)) + min;
            var info = array[index];
            info && AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Int_RewardVideo, "sp_004") && GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopFreeTrialForm, info);
          }
        }
        NF_1.default.Storage.SetData(dc.LocalStorageKey.FreeTrialData, data);
      };
      __decorate([ property(cc.ScrollView) ], ShopForm.prototype, "mScrollView", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mScrollMask", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mScrollViewContent", void 0);
      __decorate([ property(cc.Prefab) ], ShopForm.prototype, "mShopItem", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mBtnBG", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mBtnLabel", void 0);
      __decorate([ property(cc.Label) ], ShopForm.prototype, "mLabGold", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mbtnSub", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mqiege", void 0);
      __decorate([ property(cc.SpriteFrame) ], ShopForm.prototype, "mshop2", void 0);
      __decorate([ property(cc.Sprite) ], ShopForm.prototype, "mbtnCardSkin", void 0);
      __decorate([ property(cc.Node) ], ShopForm.prototype, "mRedPiont", void 0);
      ShopForm = __decorate([ ccclass ], ShopForm);
      return ShopForm;
    }(UIFormLogic_1.default);
    exports.default = ShopForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopFreeTrialForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9dbd1B3L11FRrV+ahwtIiAo", "ShopFreeTrialForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../Platform/AdManger");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopFreeTrialForm = function(_super) {
      __extends(ShopFreeTrialForm, _super);
      function ShopFreeTrialForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mTxtTitle = null;
        _this.mImgIcon = null;
        _this.mTxtTIme = null;
        _this.meffBG = null;
        _this.mShopData = null;
        _this.mInterval = 5;
        _this.mTimer = -1;
        return _this;
      }
      ShopFreeTrialForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      ShopFreeTrialForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        NF_1.default.Audio.Play(2);
        if (param) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.FreeTryPopups);
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TrySkin_AutoAD_Show);
          this.mShopData = param;
          var self_1 = this;
          cc.loader.loadRes(this.mShopData.mTexture, cc.SpriteFrame, function(err, frame) {
            if (err) {
              NF_1.default.Debug.Error("Load SpriteFrame error: " + err);
              return;
            }
            self_1.mImgIcon.spriteFrame = frame;
            self_1.mImgIcon.node.scale = 2 == self_1.mShopData.mTag2 ? 1 : 1.5;
          });
          this.mInterval = 5;
          this.mTxtTIme.string = self_1.mInterval.toString();
          this.mTimer >= 0 && clearInterval(this.mTimer);
          this.mTimer = setInterval(function() {
            self_1.mInterval--;
            self_1.mTxtTIme.string = self_1.mInterval.toString();
            if (0 == self_1.mInterval) {
              self_1.stopInterval();
              self_1.showAd(true);
            }
          }, 1e3);
          cc.tween(this.meffBG).by(.5, {
            angle: -5
          }).repeatForever().start();
        }
      };
      ShopFreeTrialForm.prototype.onDisable = function() {
        cc.Tween.stopAllByTarget(this.meffBG);
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
        this.stopInterval();
        if (!GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.SelectRoomForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.SelectRoomForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        }
      };
      ShopFreeTrialForm.prototype.AdCallbreak = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.FreeTryOut, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        var data = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.FreeTrialData, null);
        data.skinId = this.mShopData.mId;
        data.skinType = this.mShopData.mTag;
        PlatformMgr_1.default.GetInstance().OnEventCount(NF_1.default.String.Splicing(DefineConfig_1.EventName.TrySkin_AutoADX_Success, data.skinId));
        NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.FreeTrialData, data);
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_WearSkin);
      };
      ShopFreeTrialForm.prototype.OnBtnSkip = function() {
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TrySkin_AutoAD_Skip);
        NF_1.default.BtnUtils.IsTouchEnd();
        _super.prototype.Close.call(this);
      };
      ShopFreeTrialForm.prototype.onBtnAd = function() {
        NF_1.default.BtnUtils.IsTouchEnd();
        this.stopInterval();
        this.showAd(true);
      };
      ShopFreeTrialForm.prototype.stopInterval = function() {
        if (this.mTimer >= 0) {
          clearInterval(this.mTimer);
          this.mTimer = -1;
        }
      };
      ShopFreeTrialForm.prototype.showAd = function(auto) {
        var _this = this;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TrySkin_AutoAD_Play);
        SkinMgr_1.default.GetInstance().SetWeight(this.mShopData.mId);
        var callfunc = function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TrySkin_AutoAD_Success);
            _this.AdCallbreak();
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
          _super.prototype.Close.call(_this);
        };
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Int_RewardVideo, "sp_004", callfunc);
      };
      __decorate([ property(cc.Label) ], ShopFreeTrialForm.prototype, "mTxtTitle", void 0);
      __decorate([ property(cc.Sprite) ], ShopFreeTrialForm.prototype, "mImgIcon", void 0);
      __decorate([ property(cc.Label) ], ShopFreeTrialForm.prototype, "mTxtTIme", void 0);
      __decorate([ property(cc.Node) ], ShopFreeTrialForm.prototype, "meffBG", void 0);
      ShopFreeTrialForm = __decorate([ ccclass ], ShopFreeTrialForm);
      return ShopFreeTrialForm;
    }(UIFormLogic_1.default);
    exports.default = ShopFreeTrialForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f76eBU3etHqbTCc5bUR7np", "ShopItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var AdManger_1 = require("../Platform/AdManger");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopItem = function(_super) {
      __extends(ShopItem, _super);
      function ShopItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mBtnBuy = null;
        _this.mBtnSelectSkin = null;
        _this.mImgIcon = null;
        _this.mSeeIcon = null;
        _this.mImgGoldcon = null;
        _this.mImgVideoIcon = null;
        _this.txtTitle = null;
        _this.txtPrice = null;
        _this.txtPrice1 = null;
        _this.txtPrice2 = null;
        _this.txtNumber = null;
        _this.txtTime = null;
        _this.mSelected = null;
        _this.mTitleBg = null;
        _this.mDiscountLab = null;
        _this.mtimesBg = null;
        _this.mtimesLab = null;
        _this.mRedPoint = null;
        _this.mShopData = null;
        _this.isOpen = true;
        return _this;
      }
      ShopItem.prototype.start = function() {};
      ShopItem.prototype.onEnable = function() {};
      ShopItem.prototype.onDisable = function() {
        cc.Tween.stopAllByTarget(this.mDiscountLab);
        this.mSetInterval && clearInterval(this.mSetInterval);
        this.mSetInterval && clearInterval(this.mSetInterval2);
      };
      ShopItem.prototype.RefreshItem = function() {
        this.InitItem(this.mShopData);
      };
      ShopItem.prototype.InitItem = function(data) {
        var _this = this;
        if (!data || 0 == Object.keys(data).length) return;
        this.mSetInterval2 && clearInterval(this.mSetInterval2);
        this.mShopData = data;
        this.mDiscountLab.active = false;
        this.txtPrice2.node.active = false;
        var skuData = GameDataMgr_1.default.GetInstance().getData("Sku" + data.mPayId, null);
        this.txtTitle.string = data.mName;
        this.txtPrice.node.color = cc.color(0, 0, 0);
        this.txtTime.string = "";
        this.mBtnBuy.node.active = true;
        this.mBtnSelectSkin.node.active = false;
        this.mImgVideoIcon.node.active = false;
        this.mImgGoldcon.node.active = false;
        this.txtPrice1.node.active = false;
        data.mNumber > 1 ? this.txtNumber.string = NF_1.default.String.ToBigNumberString(data.mNumber) : this.txtNumber.string = "";
        5 != data.mType && this.loadResTexture(data.mTexture2);
        var Price = data.mPriceB;
        var isClick = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick, false);
        this.mRedPoint.active = false;
        if (1 == data.mType) {
          var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + data.mPayId, 0);
          var endTime = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.SkuTime + data.mPayId);
          var day = NF_1.default.Date.SurplusDay(endTime);
          if (1 == effective) {
            var day_1 = NF_1.default.Date.LeftTimeFormat(endTime, "ddD hhH");
            this.txtTime.string = "Left in " + day_1;
            this.txtPrice.string = "";
          } else this.txtPrice.string = (skuData ? skuData.price : "$" + (Price / 100).toFixed(2)) + "/mon";
        } else if (2 == data.mType) this.txtPrice.string = skuData ? skuData.price : "$" + (Price / 100).toFixed(2); else if (3 == data.mType) {
          this.txtPrice.string = NF_1.default.String.ToBigNumberString(Price);
          this.mImgGoldcon.node.active = true;
        } else if (4 == data.mType || 7 == data.mType) {
          var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, 0);
          this.txtPrice1.node.active = !(0 == Price);
          this.txtPrice1.string = count.toString();
          this.txtPrice.string = 0 == Price ? "Free" : "/ " + Price;
          this.mImgVideoIcon.node.active = true;
        } else if (5 == data.mType) {
          this.txtPrice1.node.active = !(0 == Price);
          this.mRedPoint.active = !NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick, false);
          this.mImgVideoIcon.node.active = false;
          this.loadResTexture(isClick ? data.mTexture2 : data.mTexture);
          if (isClick) {
            this.mBtnBuy.node.active = false;
            var endtimes_1 = new Date(new Date().toLocaleDateString()).getTime() + 864e5;
            this.txtPrice.string = NF_1.default.Date.LeftTimeFormat(endtimes_1, "hh:mm:ss");
            this.mSetInterval2 = setInterval(function() {
              var str = NF_1.default.Date.LeftTimeFormat(endtimes_1, "hh:mm:ss");
              _this.txtPrice.string = str;
            }, 1e3);
          } else {
            clearInterval(this.mSetInterval2);
            this.txtPrice.string = 0 == Price ? "Break Gullak" : "/ " + Price;
          }
        }
        this.mImgIcon.node.y = 12;
        this.mImgIcon.node.scale = 1;
        this.txtTitle.node.y = 55.2;
        this.mTitleBg.active = false;
        this.mtimesBg.active = false;
        switch (data.mTag2) {
         case 1:
          this.mtimesBg.y = 45;
          this.mtimesBg.x = 0;
          this.mTitleBg.active = true;
          this.txtTitle.node.y = 14.57;
          this.mImgIcon.node.y = 0;
          this.mImgIcon.node.scale = .75;
          break;

         case 2:
          this.mtimesBg.y = -18;
          this.mtimesBg.x = -50;
          this.mImgIcon.node.scale = .4;
          this.mImgIcon.node.y = 9.5;
          break;

         case 3:
          this.mImgIcon.node.scale = .5;
          2 == this.mShopData.mType ? this.mImgIcon.node.scale = .38 : 5 == data.mType && (this.mImgIcon.node.scale = .75);
          this.mSeeIcon.active = false;
          if (!data.mPayId && 5 != data.mType) {
            var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay);
            var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", PlayerMgr_1.default.Instance.PlayerData.mLv);
            var num = lvInfo["mBonus" + (freeTimes + 1)];
            if (num) {
              this.loadResTexture("UI/Sprite/Common/jinbi_" + (freeTimes + 1));
              this.mSetInterval && clearInterval(this.mSetInterval);
              this.txtPrice.string = "Free";
              this.mBtnBuy.node.active = true;
              this.txtNumber.string = NF_1.default.String.ToBigNumberString(num);
            } else {
              this.txtNumber.string = "";
              this.mBtnBuy.node.active = false;
              this.loadResTexture("UI/Sprite/Common/jinbi_" + freeTimes);
              var endtimes_2 = new Date(new Date().toLocaleDateString()).getTime() + 864e5;
              this.txtPrice.string = NF_1.default.Date.LeftTimeFormat(endtimes_2, "hh:mm:ss");
              this.mSetInterval = setInterval(function() {
                var str = NF_1.default.Date.LeftTimeFormat(endtimes_2, "hh:mm:ss");
                _this.txtPrice.string = str;
              }, 1e3);
            }
            switch (freeTimes) {
             case 0:
             case 1:
              this.mImgIcon.node.scale = .6;
              break;

             case 2:
             case 3:
              this.mImgIcon.node.scale = .4;
              break;

             case 4:
             case 5:
              this.mImgIcon.node.scale = .35;
            }
          }
        }
        this.mSelected.active = false;
        1 != data.mTag2 && 2 != data.mTag2 || this.CheckSkin(data);
        this.mBtnBuy.node.active || (this.mImgGoldcon.node.active = this.mImgVideoIcon.node.active = false);
        this.mImgVideoIcon.node.active ? this.mBtnBuy.node.color = cc.color(241, 207, 26, 255) : this.mBtnBuy.node.color = cc.color(19, 173, 23, 255);
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item && item.SkinId == this.mShopData.mId) if (-1 == SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(this.mShopData.mId)) {
          this.mDiscountLab.active = true;
          this.txtPrice2.node.active = true;
          this.mtimesBg.active = true;
          if (3 == data.mType) {
            this.txtPrice.string = NF_1.default.String.ToBigNumberString(.8 * Price);
            this.txtPrice2.string = NF_1.default.String.ToBigNumberString(Price);
          } else if (4 == data.mType || 7 == data.mType) {
            this.txtPrice.string = "/ " + (Price - 1);
            this.txtPrice2.string = Price.toString();
          } else this.txtPrice2.node.active = false;
          this.ShowDiscountTimes();
          this.schedule(this.ShowDiscountTimes, 1);
          if (this.isOpen) {
            this.mDiscountLab.scale = .5;
            this.isOpen = false;
            cc.tween(this.mDiscountLab).to(.3, {
              scale: .75
            }).union().start();
          } else this.mDiscountLab.scale = .75;
        } else {
          this.unschedule(this.ShowDiscountTimes);
          this.mtimesBg.active = false;
          this.mDiscountLab.active = false;
        }
      };
      ShopItem.prototype.ShowDiscountTimes = function() {
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item) {
          var millis = item.DiscountEndTimes - NF_1.default.Time.GetCurrentTimeMillis();
          millis /= 1e3;
          if (millis < 0) {
            this.unschedule(this.ShowDiscountTimes);
            return;
          }
          this.mtimesLab.string = NF_1.default.Date.GetHourAndMinAndSec(millis);
        }
      };
      ShopItem.prototype.loadResTexture = function(url) {
        var self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function(err, frame) {
          if (err) {
            NF_1.default.Debug.Error("Load SpriteFrame error: " + err);
            return;
          }
          self.mImgIcon.spriteFrame = frame;
        });
      };
      ShopItem.prototype.CheckSkin = function(data) {
        var skinCard = SkinMgr_1.default.GetInstance().SkinData.CardWear;
        var skinTable = SkinMgr_1.default.GetInstance().SkinData.BgWear;
        if (2 == data.mTag2 && skinCard == data.mId || 1 == data.mTag2 && skinTable == data.mId) {
          this.mBtnBuy.node.active = false;
          this.mBtnSelectSkin.node.active = false;
          this.txtPrice1.string = "";
          this.txtPrice.string = "";
          this.txtPrice.node.color = cc.color(0, 0, 0);
          this.mSeeIcon.active = false;
          this.mSelected.active = true;
        } else {
          var unlock = !(-1 == SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(data.mId));
          var Price = data.mPriceB;
          0 == Price && (unlock = true);
          this.mBtnBuy.node.active = !unlock;
          this.mSeeIcon.active = !unlock;
          this.mBtnSelectSkin.node.active = unlock;
          this.txtPrice1.string = unlock ? "" : this.txtPrice1.string;
          this.txtPrice.string = unlock ? "Equip" : this.txtPrice.string;
        }
      };
      ShopItem.prototype.OnClickBuy = function() {
        var _this = this;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (!this.mShopData || 0 == Object.keys(this.mShopData).length) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopAction + this.mShopData.mId, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        if (4 == this.mShopData.mType) {
          var freeTimes_1 = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
          if (freeTimes_1 > DefineConfig_1.Constant.MaxFreeCoinsPerDay) {
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Come back tomorrow!");
            return;
          }
          PlatformMgr_1.default.GetInstance().OnEventCount(NF_1.default.String.Splicing(DefineConfig_1.EventName.freeClick, freeTimes_1), "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_001", function(status) {
            if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
              var lvInfo = NF_1.default.DataTables.GetInfoById("LevelInfo", PlayerMgr_1.default.Instance.PlayerData.mLv);
              var num = lvInfo["mBonus" + freeTimes_1];
              PlayerMgr_1.default.Instance.AddGold(num);
              var data = {
                mGold: num,
                mExp: 0,
                mFunc: null,
                mFormid: GameEnum_1.UIFormId.FreeCoinsForm
              };
              if (PlayerMgr_1.default.Instance.mFreeCoinsNum <= 5) {
                PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["FreeCoin" + PlayerMgr_1.default.Instance.mFreeCoinsNum]);
                PlayerMgr_1.default.Instance.mFreeCoinsNum++;
              }
              NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay, freeTimes_1);
              NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_HomeFreeCoins);
              GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, data);
            } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
          });
          return;
        }
        if (7 == this.mShopData.mType) {
          var placeid = "sp_005";
          303 == this.mShopData.mId ? placeid = "sp_006" : 305 == this.mShopData.mId ? placeid = "sp_007" : 307 == this.mShopData.mId ? placeid = "sp_008" : 403 == this.mShopData.mId ? placeid = "sp_009" : 405 == this.mShopData.mId ? placeid = "sp_0010" : 407 == this.mShopData.mId && (placeid = "sp_0011");
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, placeid, function(status) {
            if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopAdSuccess + _this.mShopData.mId);
              _this.AdCallbreak();
            } else {
              SkinMgr_1.default.GetInstance().SetWeight(_this.mShopData.mId);
              GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
            }
          });
          NF_1.default.Config.GMShopDebug && this.AdCallbreak();
          return;
        }
        if (3 == this.mShopData.mType) {
          var mGold = PlayerMgr_1.default.Instance.PlayerData.mGold;
          var Price = this.mShopData.mPriceB;
          var item = SkinMgr_1.default.GetInstance().GetDiscountData();
          item && item.SkinId == this.mShopData.mId && (Price = .8 * this.mShopData.mPriceB);
          if (Price > mGold) {
            SkinMgr_1.default.GetInstance().SetWeight(this.mShopData.mId);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "You need more coins!");
            setTimeout(function() {
              var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
              if (freeTimes > DefineConfig_1.Constant.MaxFreeCoinsPerDay) {
                var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
                times < DefineConfig_1.Constant.MaxTurntableTimesPerDay && GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TurntableForm);
              } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.FreeCoinsForm);
            }, 500);
          } else {
            2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
            PlayerMgr_1.default.Instance.AddGold(-Price);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
          }
          return;
        }
        if (1 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          return;
        }
        if (2 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          return;
        }
        if (5 == this.mShopData.mType) {
          var isClick = NF_1.default.Storage.GetBool(DefineConfig_1.LocalStorageKey.DayBtnClick, false);
          isClick || this.SendNet();
        }
      };
      ShopItem.prototype.OnPayCallBack = function() {
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
      };
      ShopItem.prototype.OnSelectSkin = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        2 == this.mShopData.mTag2 ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.use_card + this.mShopData.mId) : 1 == this.mShopData.mTag2 && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.use_bg + this.mShopData.mId);
        2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetWearSkin(this.mShopData);
      };
      ShopItem.prototype.AdCallbreak = function() {
        var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, 0);
        count++;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, count);
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        var Price = this.mShopData.mPriceB;
        item && item.SkinId == this.mShopData.mId && (Price = this.mShopData.mPriceB - 1);
        if (count >= Price) {
          2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
        } else {
          SkinMgr_1.default.GetInstance().SetWeight(this.mShopData.mId);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        }
      };
      ShopItem.prototype.SeeClick = function() {
        var unlock = !(-1 == SkinMgr_1.default.GetInstance().SkinData.UnlockSkinArr.indexOf(this.mShopData.mId));
        if ((2 == this.mShopData.mTag2 || 1 == this.mShopData.mTag2) && !unlock) {
          if (0 == this.mShopData.mPriceB || 0 == this.mShopData.mPriceB) return;
          if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopPreviewForm, this.mShopData);
        }
      };
      ShopItem.prototype.SendNet = function() {
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, true);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_Onlinecoin_Click, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
            clearTimeout(timesout);
            GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.TipsForm);
            NF_1.default.Storage.SetBool(DefineConfig_1.LocalStorageKey.DayBtnClick, true);
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_Onlinecoin_Success, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
            var data = {
              mGold: 1e3,
              mExp: 0,
              mFunc: null,
              mFormid: GameEnum_1.UIFormId.HomeForm
            };
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, data);
            self.InitItem(self.mShopData);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint);
          }
        };
        var url = "https://www.google.com";
        xhr.timeout = 5e3;
        xhr.open("GET", url, true);
        xhr.send();
        var timesout = setTimeout(function() {
          xhr.abort();
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, false);
        }, 5e3);
      };
      __decorate([ property(cc.Sprite) ], ShopItem.prototype, "mBtnBuy", void 0);
      __decorate([ property(cc.Sprite) ], ShopItem.prototype, "mBtnSelectSkin", void 0);
      __decorate([ property(cc.Sprite) ], ShopItem.prototype, "mImgIcon", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mSeeIcon", void 0);
      __decorate([ property(cc.Sprite) ], ShopItem.prototype, "mImgGoldcon", void 0);
      __decorate([ property(cc.Sprite) ], ShopItem.prototype, "mImgVideoIcon", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtTitle", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtPrice", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtPrice1", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtPrice2", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtNumber", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "txtTime", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mSelected", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mTitleBg", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mDiscountLab", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mtimesBg", void 0);
      __decorate([ property(cc.Label) ], ShopItem.prototype, "mtimesLab", void 0);
      __decorate([ property(cc.Node) ], ShopItem.prototype, "mRedPoint", void 0);
      ShopItem = __decorate([ ccclass ], ShopItem);
      return ShopItem;
    }(cc.Component);
    exports.default = ShopItem;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopPreviewForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a442TwteNL3blkqi4Pq7oK", "ShopPreviewForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataMgr_1 = require("../Common/Mgr/GameDataMgr");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var SkinMgr_1 = require("../Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var NF_1 = require("../NFramework/NF");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var AdManger_1 = require("../Platform/AdManger");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    function getRotationRCard(c) {
      var max = 12;
      var arr = [];
      for (var i = 0; i < max; i++) arr.push(3 * c + 8 * i);
      return arr;
    }
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopPreviewForm = function(_super) {
      __extends(ShopPreviewForm, _super);
      function ShopPreviewForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mCard = null;
        _this.mCarBox = null;
        _this.mUpBox = null;
        _this.mLeftBox = null;
        _this.mRightBox = null;
        _this.mCarArr = [];
        _this.mBtnBg = null;
        _this.mBtnVideo = null;
        _this.mBtnGold = null;
        _this.mtxtPrice1 = null;
        _this.mtxtPrice = null;
        _this.mCurrBg = null;
        _this.mCardEffect = [];
        _this.mtimesLab = null;
        _this.txtPrice2 = null;
        _this.mShopData = null;
        _this.gameData = null;
        _this.mUpArr = null;
        _this.mLeftArr = null;
        _this.mRightArr = null;
        _this.mCanClick = true;
        return _this;
      }
      ShopPreviewForm.prototype.OnClose = function() {
        if (null != this.mRightArr) for (var index = 0; index < 12; index++) {
          this.mRightArr[index].node.angle = this.mLeftArr[index].node.angle = this.mUpArr[index].node.angle = 0;
          this.mRightArr[index].node.position = this.mLeftArr[index].node.position = this.mUpArr[index].node.position = cc.v3(0, 0);
        }
        for (var i = 0; i < this.mCarArr.length; i++) {
          var element = this.mCarArr[i];
          cc.Tween.stopAllByTarget(element);
        }
        for (var i = 0; i < this.mCardEffect.length; i++) {
          var element = this.mCardEffect[i];
          cc.Tween.stopAllByTarget(element);
        }
        clearTimeout(this.mTimes);
        this.mCardEffect[0].position = cc.v3(39, 67.075);
        this.mCardEffect[1].position = cc.v3(0, 105.354);
        this.mCardEffect[2].position = cc.v3(-39, 67.075);
        this.mCardEffect[3].position = cc.v3(-274.2, -60.821);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        this.unschedule(this.ShowDiscountTimes);
        NF_1.default.Notify.UnListenByObj(this);
      };
      ShopPreviewForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        NF_1.default.Notify.Listen(GameEnum_1.EnumNotify.EN_Return_ShopPayCallBack, this.OnPayCallBack, this);
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        this.mShopData = param;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Shoppreview_X + this.mShopData.mId);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        this.SetView();
        SkinMgr_1.default.GetInstance().SetWeight(this.mShopData.mId);
      };
      ShopPreviewForm.prototype.SetView = function() {
        var _this = this;
        if (2 == this.mShopData.mTag2) {
          var skin = SkinMgr_1.default.GetInstance().SkinData.BgWear;
          if (0 != skin) {
            var info = NF_1.default.DataTables.GetInfoById("ShopInfo", skin);
            if (info) {
              var frame = this.gameData.mBg[info.mBgIndex];
              frame && (this.mCurrBg.spriteFrame = frame);
            }
          } else this.mCurrBg.spriteFrame = this.gameData.mBg[0];
          this.mCarBox.active = true;
          this.mCard.spriteFrame = this.gameData.mCard[this.mShopData.mBgIndex];
          if (null == this.mUpArr) {
            this.mUpArr = [];
            this.mUpBox.children.forEach(function(item) {
              _this.mUpArr.push(item.getComponent(cc.Sprite));
            });
          }
          if (null == this.mLeftArr) {
            this.mLeftArr = [];
            this.mLeftBox.children.forEach(function(item) {
              _this.mLeftArr.push(item.getComponent(cc.Sprite));
            });
          }
          if (null == this.mRightArr) {
            this.mRightArr = [];
            this.mRightBox.children.forEach(function(item) {
              _this.mRightArr.push(item.getComponent(cc.Sprite));
            });
          }
          this.mRightBox.children.forEach(function(item) {
            item.getComponent(cc.Sprite).spriteFrame = _this.gameData.mCard[_this.mShopData.mBgIndex];
          });
          for (var index = 0; index < 12; index++) {
            this.mRightArr[index].spriteFrame = this.mLeftArr[index].spriteFrame = this.mUpArr[index].spriteFrame = this.gameData.mCard[this.mShopData.mBgIndex];
            this.createHandCards(0, this.mUpArr[index].node, index);
            this.createHandCards(1, this.mLeftArr[index].node, index);
            this.createHandCards(2, this.mRightArr[index].node, index);
          }
          this.initCardPos();
          this.mTimes = setTimeout(function() {
            _this.PlayCard(3, true);
          }, 1e3);
        } else {
          this.mCarBox.active = false;
          var frame = this.gameData.mBg[this.mShopData.mBgIndex];
          this.mCurrBg.spriteFrame = frame;
        }
        this.ShowPrice();
      };
      ShopPreviewForm.prototype.ShowDiscountTimes = function() {
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item) {
          var millis = item.DiscountEndTimes - NF_1.default.Time.GetCurrentTimeMillis();
          millis /= 1e3;
          if (millis < 0) {
            this.unschedule(this.ShowDiscountTimes);
            return;
          }
          this.mtimesLab.string = NF_1.default.Date.GetHourAndMinAndSec(millis);
        }
      };
      ShopPreviewForm.prototype.initCardPos = function() {
        for (var i = 0; i < this.mCarArr.length; i++) {
          var element = this.mCarArr[i];
          element.x = 0;
          element.y = -60.821;
          var posX = 45.7 * i - 274.2;
          this.OpenCard(element, posX);
        }
      };
      ShopPreviewForm.prototype.ShowPrice = function() {
        var Price = this.mShopData.mPriceB;
        this.mtxtPrice1.node.active = false;
        this.mBtnBg.color = cc.color(24, 162, 19, 255);
        if (7 == this.mShopData.mType) {
          this.mBtnBg.color = cc.color(241, 207, 26, 255);
          var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, 0);
          this.mtxtPrice1.node.active = !(0 == Price);
          this.mtxtPrice1.string = count.toString();
          this.mtxtPrice.string = 0 == Price ? "Free" : "/ " + Price;
          this.mBtnVideo.active = true;
          this.mBtnGold.active = false;
        } else if (3 == this.mShopData.mType) {
          this.mBtnVideo.active = false;
          this.mBtnGold.active = true;
          this.mtxtPrice.string = NF_1.default.String.ToBigNumberString(Price);
        } else {
          this.mBtnVideo.active = false;
          this.mBtnGold.active = false;
          var skuData = GameDataMgr_1.default.GetInstance().getData("Sku" + this.mShopData.mPayId, null);
          this.mtxtPrice.string = skuData ? skuData.price : "$" + (Price / 100).toFixed(2);
        }
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item && item.SkinId == this.mShopData.mId) {
          this.txtPrice2.node.active = true;
          if (3 == this.mShopData.mType) {
            this.mtxtPrice.string = NF_1.default.String.ToBigNumberString(.8 * Price);
            this.txtPrice2.string = NF_1.default.String.ToBigNumberString(Price);
          } else if (4 == this.mShopData.mType || 7 == this.mShopData.mType) {
            this.mtxtPrice.string = "/ " + (Price - 1);
            this.txtPrice2.string = Price.toString();
          } else this.txtPrice2.node.active = false;
          this.ShowDiscountTimes();
          this.schedule(this.ShowDiscountTimes, 1);
        } else {
          this.mtimesLab.string = "";
          this.txtPrice2.node.active = false;
        }
      };
      ShopPreviewForm.prototype.OpenCard = function(node, px) {
        cc.tween(node).to(.5, {
          x: px
        }).start();
      };
      ShopPreviewForm.prototype.createHandCards = function(chairID, node, i) {
        var rotations = getRotationRCard(0);
        var effectPos = cc.v3(13, -9);
        var n = node;
        var r = rotations[i];
        if (0 == chairID) {
          n.angle = 180;
          r += 128;
          effectPos = cc.v3(21 - 3.5 * i, n.y + -9 + 1.5 * i);
        } else if (1 == chairID) {
          n.angle = -90;
          r += 40;
          r = -r;
          effectPos = cc.v3(n.x + 9 - 1.5 * i, 3.5 * i - 21);
        } else if (2 == chairID) {
          n.angle = 90;
          r += 40;
          effectPos = cc.v3(n.x - 9 + 1.5 * i, 3.5 * i - 21);
        }
        this.rotateTo(n, r, effectPos);
      };
      ShopPreviewForm.prototype.rotateTo = function(node, val, effectPos) {
        cc.tween(node).to(.5, {
          angle: val,
          position: effectPos
        }).start();
      };
      ShopPreviewForm.prototype.PlayCard = function(cardIdx, isPlay) {
        var _this = this;
        if (isPlay) {
          var node = this.mCardEffect[cardIdx];
          if (0 == cardIdx || 2 == cardIdx) {
            var posx = 0 == cardIdx ? 39 : -39;
            cc.tween(node).to(.3, {
              x: posx
            }).delay(1).call(function() {
              _this.PlayCard(cardIdx + 1, isPlay);
            }).start();
          }
          if (1 == cardIdx || 3 == cardIdx) {
            var posy = 1 == cardIdx ? 105.354 : 29.402;
            if (3 == cardIdx) for (var i = 1; i <= 12; i++) {
              var element = this.mCarArr[i];
              var posX = 49.7 * (i - 1) - 273.35;
              this.OpenCard(element, posX);
            }
            cc.tween(node).to(.3, {
              x: 0,
              y: posy
            }).delay(1).call(function() {
              if (3 == cardIdx) for (var i = 0; i < _this.mCardEffect.length; i++) {
                var element = _this.mCardEffect[i];
                _this.RecoveryCard(element, i);
              } else _this.PlayCard(cardIdx + 1, isPlay);
            }).start();
          }
        } else {
          this.mCardEffect[0].position = cc.v3(350, 67.075);
          this.mCardEffect[1].position = cc.v3(0, 300);
          this.mCardEffect[2].position = cc.v3(-350, 67.075);
          this.mCardEffect[3].position = cc.v3(-274.2, -60.821);
          for (var i = 0; i < this.mCarArr.length; i++) {
            var element = this.mCarArr[i];
            var posX = 45.7 * i - 274.2;
            this.OpenCard(element, posX);
          }
          setTimeout(function() {
            _this.PlayCard(0, true);
          }, 1e3);
        }
      };
      ShopPreviewForm.prototype.RecoveryCard = function(node, i) {
        var _this = this;
        cc.tween(node).to(1, {
          y: -230
        }, {
          easing: "backIn"
        }).delay(2).call(function() {
          0 == i && _this.PlayCard(0, false);
        }).start();
      };
      ShopPreviewForm.prototype.onBtnBuy = function() {
        var _this = this;
        if (false == this.mCanClick) return;
        this.mCanClick = false;
        setTimeout(function() {
          _this.mCanClick = true;
        }, 2e3);
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopConfirm + this.mShopData.mId, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        if (7 == this.mShopData.mType) {
          var placeid = "sp_005";
          303 == this.mShopData.mId ? placeid = "sp_006" : 305 == this.mShopData.mId ? placeid = "sp_007" : 307 == this.mShopData.mId ? placeid = "sp_008" : 403 == this.mShopData.mId ? placeid = "sp_009" : 405 == this.mShopData.mId ? placeid = "sp_0010" : 407 == this.mShopData.mId && (placeid = "sp_0011");
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, placeid, function(status) {
            if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopAdSuccess + _this.mShopData.mId);
              _this.AdCallbreak();
            } else {
              SkinMgr_1.default.GetInstance().SetWeight(_this.mShopData.mId);
              GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
            }
          });
          NF_1.default.Config.GMShopDebug && this.AdCallbreak();
          return;
        }
        if (3 == this.mShopData.mType) {
          var mGold = PlayerMgr_1.default.Instance.PlayerData.mGold;
          var Price = this.mShopData.mPriceB;
          var item = SkinMgr_1.default.GetInstance().GetDiscountData();
          item && item.SkinId == this.mShopData.mId && (Price = .8 * this.mShopData.mPriceB);
          if (Price > mGold) {
            SkinMgr_1.default.GetInstance().SetWeight(this.mShopData.mId);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "You need more coins!");
            setTimeout(function() {
              var freeTimes = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.FreeCoinsTimesPerDay) + 1;
              if (freeTimes > DefineConfig_1.Constant.MaxFreeCoinsPerDay) {
                var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
                times < DefineConfig_1.Constant.MaxTurntableTimesPerDay && GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TurntableForm);
              } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.FreeCoinsForm);
            }, 500);
          } else {
            2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
            PlayerMgr_1.default.Instance.AddGold(-Price);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
            this.Close();
          }
          return;
        }
        if (1 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          if (NF_1.default.Config.GMShopDebug) {
            NF_1.default.Storage.SetString(DefineConfig_1.LocalStorageKey.SkuTime + this.mShopData.mPayId, (new Date().getTime() + 2592e6).toString());
            GameDataMgr_1.default.GetInstance().setData("SkuEffective" + this.mShopData.mPayId, 1);
            this.OnPayCallBack(1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
          }
          return;
        }
        if (2 == this.mShopData.mType) {
          PlatformMgr_1.default.GetInstance().Pay(this.mShopData.mTrimId, null);
          if (NF_1.default.Config.GMShopDebug) {
            var gold = this.mShopData.mNumber;
            PlayerMgr_1.default.Instance.AddGold(gold);
            2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
            this.OnPayCallBack(1);
            NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Gold);
          }
          return;
        }
      };
      ShopPreviewForm.prototype.OnPayCallBack = function(state) {
        if (1 == state || 2 == state) {
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
          this.Close();
        } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Pay failed, Please try again later!");
      };
      ShopPreviewForm.prototype.AdCallbreak = function() {
        var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, 0);
        count++;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.ADShop + this.mShopData.mId, count);
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        var Price = this.mShopData.mPriceB;
        item && item.SkinId == this.mShopData.mId && (Price = this.mShopData.mPriceB - 1);
        if (count >= Price) {
          2 != this.mShopData.mTag2 && 1 != this.mShopData.mTag2 || SkinMgr_1.default.GetInstance().SetSkinUnlock(this.mShopData);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopResultForm, this.mShopData);
          this.Close();
        } else NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        this.ShowPrice();
      };
      __decorate([ property(cc.Sprite) ], ShopPreviewForm.prototype, "mCard", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mCarBox", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mUpBox", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mLeftBox", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mRightBox", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mCarArr", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mBtnBg", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mBtnVideo", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mBtnGold", void 0);
      __decorate([ property(cc.Label) ], ShopPreviewForm.prototype, "mtxtPrice1", void 0);
      __decorate([ property(cc.Label) ], ShopPreviewForm.prototype, "mtxtPrice", void 0);
      __decorate([ property(cc.Sprite) ], ShopPreviewForm.prototype, "mCurrBg", void 0);
      __decorate([ property(cc.Node) ], ShopPreviewForm.prototype, "mCardEffect", void 0);
      __decorate([ property(cc.Label) ], ShopPreviewForm.prototype, "mtimesLab", void 0);
      __decorate([ property(cc.Label) ], ShopPreviewForm.prototype, "txtPrice2", void 0);
      ShopPreviewForm = __decorate([ ccclass ], ShopPreviewForm);
      return ShopPreviewForm;
    }(UIFormLogic_1.default);
    exports.default = ShopPreviewForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameDataMgr": "GameDataMgr",
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Common/Mgr/SkinMgr": "SkinMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  ShopResultForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8a9de17LIxJYpbOs1tP7yrM", "ShopResultForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dc = require("../Definition/Constant/DefineConfig");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NF_1 = require("../NFramework/NF");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopResultForm = function(_super) {
      __extends(ShopResultForm, _super);
      function ShopResultForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mANode = null;
        _this.mBNode = null;
        _this.mTxtName = null;
        _this.mTxtNumber = null;
        _this.mImgIcon = null;
        _this.mTxtName2 = null;
        _this.mTxtNumber2 = null;
        _this.mImgIcon2 = null;
        _this.mShopData = null;
        return _this;
      }
      ShopResultForm.prototype.start = function() {};
      ShopResultForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
      };
      ShopResultForm.prototype.OnClose = function() {
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
      };
      ShopResultForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        var data = NF_1.default.Storage.GetData(dc.LocalStorageKey.FreeTrialData, null);
        if (!data) {
          data = {};
          data.skinId = 0;
          data.skinType = -1;
        }
        data.mIsPay = true;
        NF_1.default.Storage.SetData(dc.LocalStorageKey.FreeTrialData, data);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.ABTest_Event, this.AbTestShow, this);
        AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        NF_1.default.Audio.Play(2);
        if (param) {
          this.mShopData = param;
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopResult + this.mShopData.mId);
          this.mTxtName2.string = this.mTxtName.string = this.mShopData.mName;
          NF_1.default.Debug.Log(">>>> number ", this.mShopData.mNumber);
          this.mShopData.mNumber > 1 ? this.mTxtNumber.string = NF_1.default.String.ToBigNumberString(this.mShopData.mNumber) : this.mTxtNumber.string = "";
          var self_1 = this;
          cc.loader.loadRes(this.mShopData.mTexture, cc.SpriteFrame, function(err, frame) {
            if (err) {
              NF_1.default.Debug.Error("Load SpriteFrame error: " + err);
              return;
            }
            self_1.mImgIcon2.spriteFrame = self_1.mImgIcon.spriteFrame = frame;
          });
        }
        this.AbTestShow();
      };
      ShopResultForm.prototype.AbTestShow = function() {
        this.mANode.active = false;
        this.mBNode.active = true;
      };
      ShopResultForm.prototype.onEnable = function() {};
      ShopResultForm.prototype.OnBtnClose = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        _super.prototype.Close.call(this);
      };
      __decorate([ property(cc.Node) ], ShopResultForm.prototype, "mANode", void 0);
      __decorate([ property(cc.Node) ], ShopResultForm.prototype, "mBNode", void 0);
      __decorate([ property(cc.Label) ], ShopResultForm.prototype, "mTxtName", void 0);
      __decorate([ property(cc.Label) ], ShopResultForm.prototype, "mTxtNumber", void 0);
      __decorate([ property(cc.Sprite) ], ShopResultForm.prototype, "mImgIcon", void 0);
      __decorate([ property(cc.Label) ], ShopResultForm.prototype, "mTxtName2", void 0);
      __decorate([ property(cc.Label) ], ShopResultForm.prototype, "mTxtNumber2", void 0);
      __decorate([ property(cc.Sprite) ], ShopResultForm.prototype, "mImgIcon2", void 0);
      ShopResultForm = __decorate([ ccclass ], ShopResultForm);
      return ShopResultForm;
    }(UIFormLogic_1.default);
    exports.default = ShopResultForm;
    cc._RF.pop();
  }, {
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  SingleGameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46fc9SPZZhKoqD/K3VwCmbO", "SingleGameController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Deal_1 = require("./Deal");
    var TableCards_1 = require("./TableCards");
    var Bot_1 = require("./Bot");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var NF_1 = require("./NFramework/NF");
    var GameDataMgr_1 = require("./Common/Mgr/GameDataMgr");
    var NFNotifyMgr_1 = require("./NFramework/Notification/NFNotifyMgr");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var EnumMacros_1 = require("./NFramework/Definition/EnumMacros");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var GameHeadItem_1 = require("./GameHeadItem");
    var GameEntry_1 = require("./Common/Mgr/GameEntry");
    var DealCardsMgr_1 = require("./Common/Mgr/DealCardsMgr");
    var SkinMgr_1 = require("./Common/Mgr/SkinMgr");
    var CalculateScoreMgr_1 = require("./Common/Mgr/CalculateScoreMgr");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var AdManger_1 = require("./Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SingleGameController = function(_super) {
      __extends(SingleGameController, _super);
      function SingleGameController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.deal = null;
        _this.tableCards = null;
        _this.ndBidBoards = null;
        _this.pBidBoard = null;
        _this.names = [];
        _this.mGameHeadItemArr = [];
        _this.labYourTurn = null;
        _this.labVersion = null;
        _this.timers = [];
        _this.mCardsNote = null;
        _this.mBtnCardsNote = null;
        _this.mDepositBtn = null;
        _this.mDepositBtnBG = null;
        _this.mDepositSwitchBG = null;
        _this.mDepositSliderBG = null;
        _this.mAutoplay = null;
        _this.mDepositSprite = [];
        _this.mRankSprite = [];
        _this.mShopBtn = null;
        _this.mShopDiscountLab = null;
        _this.mShopDiscountTimeLab = null;
        _this.mbid8BG = null;
        _this.mbid8TF = null;
        _this.mbid8effect = null;
        _this.mBidPosNode = null;
        _this.mGoogleBtn = null;
        _this.isDeal = false;
        _this.handCards = [];
        _this.tabCards = [];
        _this.tabMap = {};
        _this.recordMap = {};
        _this.bidBoards = [];
        _this.bots = [];
        _this.defaultBot = null;
        _this.fakeNames = [];
        _this.fakeHead = [];
        _this.timeCountSec = 0;
        _this.timerKick = -1;
        _this.gameData = null;
        _this.botOnline = [ true, true, true, true ];
        _this.offlineInfo = null;
        _this.round = 0;
        _this.botPreOffline = [ false, false, false, false ];
        _this.mHisCards = [];
        _this.mCallback = null;
        _this.mIndex = 0;
        _this.mTxtLeftTime = null;
        _this.mBuyTime = -1;
        _this.mInterval = -1;
        _this.mShopClick = false;
        return _this;
      }
      SingleGameController.prototype.onLoad = function() {
        var _this = this;
        (cc.sys.isNative || cc.sys.isBrowser) && (this.mGoogleBtn.active = false);
        /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) && cc.sys.isBrowser && (this.mGoogleBtn.active = true);
        this.loadEvents();
        this.version();
        cc.loader.loadResDir("cards", function(err, pics) {
          err && cc.log(err);
        }.bind(this));
        this.defaultBot = new Bot_1.default();
        GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.None;
        this.updateCardNoteTime();
        NF_1.default.Audio.Play(10002);
        cc.tween(this.mAutoplay.node).delay(2).call(function() {
          _this.mAutoplay.setAnimation(0, "Autoplay", false);
        }).union().repeatForever().start();
      };
      SingleGameController.prototype.loadEvents = function() {
        var _this = this;
        this.node.on("DealFinished", function() {
          if (_this.isDeal) {
            _this.isDeal = false;
            _this.tableCards.loadHandCards(_this.handCards[DefineConfig_1.ChairID.Down].getHandCardsArr());
            _this.bidStart();
          }
        });
        this.node.on("MyCardSent", function(event) {
          var d = event.getUserData();
          _this.discard(DefineConfig_1.ChairID.Down, d.card);
          _this.labYourTurn.active = false;
        });
      };
      SingleGameController.prototype.onDestroy = function() {
        this.mCallback && this.unschedule(this.mCallback);
        if (this.mInterval >= 0) {
          clearInterval(this.mInterval);
          this.mInterval = -1;
        }
        cc.Tween.stopAllByTarget(this.node);
        cc.Tween.stopAllByTarget(this.mAutoplay.node);
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      SingleGameController.prototype.start = function() {
        var _this = this;
        PlayerMgr_1.default.Instance.setGameCount();
        PlayerMgr_1.default.Instance.mIsGameSingle && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.GamePage);
        this.mbid8TF.active = this.mbid8effect.active = this.mbid8BG.active = false;
        var gameData = cc.find("GameData").getComponent("GameData");
        this.gameData = gameData;
        this.fakeNames = gameData.fakeNames;
        this.fakeHead = gameData.fakeHead;
        this.isFakeMode = GameMgr_1.default.GetInstance().CuttGameModel;
        this.checkShowCardsNoteAd();
        if (this.isFakeMode != DefineConfig_1.GameModel.Online) {
          this.gameData.fakeHead[0] = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.PlayerHead, 7);
          this.gameData.fakeHead[1] = 8;
          this.gameData.fakeHead[2] = 8;
          this.gameData.fakeHead[3] = 8;
        }
        this.mGameHeadItemArr[0].SetHead(this.gameData.fakeHead[0]);
        this.mGameHeadItemArr[1].SetHead(this.gameData.fakeHead[1]);
        this.mGameHeadItemArr[2].SetHead(this.gameData.fakeHead[2]);
        this.mGameHeadItemArr[3].SetHead(this.gameData.fakeHead[3]);
        this.isFakeMode == DefineConfig_1.GameModel.Online ? this.gameData.sendEvent(DefineConfig_1.EventName.RandomGame) : this.gameData.sendEvent(DefineConfig_1.EventName.SingleGame);
        this.timerKick = -1;
        if (this.isFakeMode == DefineConfig_1.GameModel.Online) {
          this.mCallback = function() {
            _this.timeCountSec++;
            _this.setTime(_this.turn);
          };
          this.schedule(this.mCallback, 1);
        } else if (this.isFakeMode == DefineConfig_1.GameModel.Battle8Bid) {
          this.mbid8effect.opacity = 0;
          this.mbid8effect.scale = 0;
          this.mbid8TF.active = this.mbid8effect.active = this.mbid8BG.active = true;
        }
        this.offlineInfo = {};
        this.offlineInfo.X = RandomCardLogic_1.default.GetInstance().random(1, 14);
        this.offlineInfo.Y = RandomCardLogic_1.default.GetInstance().random(1, 6);
        this.offlineInfo.Z = RandomCardLogic_1.default.GetInstance().random(1, 6);
        this.botOnline = [ true, true, true, true ];
        this.botPreOffline = [ false, false, false, false ];
        this.round = 0;
        var seats = [ 0, 1, 2, 3 ];
        var index = NF_1.default.Math.RandomInt(0, 4);
        var button = seats[index];
        this.gameBegin(button);
        this.setBotNames(seats);
        this.offlieBotY();
        this.bids = new RandomCardLogic_1.Bids();
        this.dealCards();
        NF_1.default.Audio.Play(2);
        this.mShopClick = false;
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.EN_Game_Replay, this.replay, this);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.EN_Game_UpdateNoteCardTime, this.updateCardNoteTime, this);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_Licensing, this.dealCards, this);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_CompleteBid, this.GameCompleteBid, this);
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.Game_PrePare, this.GamePrePare, this);
        this.ShowBtnEffect(!this.mCardsNote.active);
      };
      SingleGameController.prototype.GamePrePare = function() {
        GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.PrePare;
        this.dealCards();
      };
      SingleGameController.prototype.GameCompleteBid = function(data) {
        var _this = this;
        if (this.turn != DefineConfig_1.ChairID.Down) return;
        if (this.isFakeMode == DefineConfig_1.GameModel.Battle8Bid) {
          var pos = this.mBidPosNode.parent.convertToWorldSpaceAR(this.mBidPosNode.getPosition());
          var pos2 = this.mbid8effect.parent.convertToNodeSpaceAR(pos);
          this.mbid8effect.scale = .5;
          cc.tween(this.mbid8effect).to(.8, {
            opacity: 255,
            scale: 1.2
          }, {
            easing: "quintIn"
          }).delay(.1).to(1, {
            position: pos2,
            scale: .15
          }, {
            easing: "quintIn"
          }).call(function() {
            var d = data.getUserData();
            _this.bids.setBid(DefineConfig_1.ChairID.Down, d.bid);
            _this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].SetBid(d.bid);
            _this.mbid8effect.active = false;
            _this.bidNext();
          }).start();
        } else {
          var d = data.getUserData();
          this.bids.setBid(DefineConfig_1.ChairID.Down, d.bid);
          this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].SetBid(d.bid);
          this.bidNext();
        }
      };
      SingleGameController.prototype.ShowBtnEffect = function(isShow) {
        if (isShow) cc.tween(this.mBtnCardsNote.node).to(.5, {
          scale: .9
        }).to(.5, {
          scale: .8
        }).to(.5, {
          scale: .9
        }).to(.5, {
          scale: .8
        }).delay(2).union().repeatForever().start(); else {
          cc.Tween.stopAllByTarget(this.mBtnCardsNote.node);
          this.mBtnCardsNote.node.scale = .8;
        }
      };
      SingleGameController.prototype.ShowAutpBtnEffect = function() {
        cc.tween(this.mDepositBtn.node).to(.3, {
          scale: 1
        }).start();
      };
      SingleGameController.prototype.replay = function() {
        var seats = [ 0, 1, 2, 3 ];
        var index = NF_1.default.Math.Random(0, 4);
        var button = seats[index];
        this.round = 0;
        this.gameBegin(button);
        this.setBotNames(seats);
        this.offlieBotY();
        this.bids = new RandomCardLogic_1.Bids();
        this.dealCards();
      };
      SingleGameController.prototype.Deposit = function() {
        if (GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Paly) {
          var b = GameMgr_1.default.GetInstance().getIsDeposit();
          GameMgr_1.default.GetInstance().setIsDeposit(!b);
          this.mAutoplay.node.active = !b;
          if (b) {
            this.mDepositSwitchBG.color = cc.color(226, 226, 226, 255);
            this.mDepositSliderBG.x = -(this.mDepositSwitchBG.width - this.mDepositSliderBG.width) / 2 + .5;
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.AutoPlay_Close);
          } else {
            this.mDepositSwitchBG.color = cc.color(35, 146, 53, 255);
            this.mDepositSliderBG.x = (this.mDepositSwitchBG.width - this.mDepositSliderBG.width) / 2 - .5;
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.AutoPlay_Open);
          }
          if (!b && this.turn == DefineConfig_1.ChairID.Down) {
            this.timers[DefineConfig_1.ChairID.Down].node.active = false;
            this.autoSendMyCard();
          }
          this.mDepositBtnBG.spriteFrame = b ? this.mDepositSprite[0] : this.mDepositSprite[1];
        }
      };
      SingleGameController.prototype.update = function(dt) {
        if (this.isFakeMode == DefineConfig_1.GameModel.Online && -1 != this.turn && this.timerKick == this.timeCountSec) {
          this.clearTimeKick();
          if (GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Bid) if (this.turn == DefineConfig_1.ChairID.Down) {
            var bid = GameDataMgr_1.default.GetInstance().getData("DefaultBot", 1);
            this.bids.setBid(DefineConfig_1.ChairID.Down, bid);
            this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].SetBid(bid);
            GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.BidForm);
            this.bidNext();
          } else this.botBidTurn(this.turn); else if (GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Paly) if (this.turn == DefineConfig_1.ChairID.Down) {
            if (GameMgr_1.default.GetInstance().getIsDeposit()) return;
            this.Deposit();
          } else {
            if (this.botPreOffline[this.turn]) {
              this.botOnline[this.turn] = false;
              this.botPreOffline[this.turn] = false;
              var name = this.names[this.turn].string;
              this.names[this.turn].string = name + "(bot)";
              this.mGameHeadItemArr[this.turn].SetName(name + "(bot)");
            }
            this.botTurn(this.turn);
          }
        }
      };
      SingleGameController.prototype.gameBegin = function(button) {
        this.mDepositSwitchBG.color = cc.color(226, 226, 226, 255);
        this.mDepositSliderBG.x = -(this.mDepositSwitchBG.width - this.mDepositSliderBG.width) / 2 + .5;
        this.mDepositBtn.node.scale = 1;
        this.mDepositBtn.node.active = false;
        this.mDepositBtn.node.active = this.isFakeMode == DefineConfig_1.GameModel.Online;
        cc.sys.OS_WINDOWS === cc.sys.os && (this.mDepositBtn.node.active = true);
        GameMgr_1.default.GetInstance().setIsDeposit(false);
        this.mDepositBtnBG.spriteFrame = this.mDepositSprite[0];
        this.mAutoplay.node.active = false;
        if (this.isFakeMode != DefineConfig_1.GameModel.Battle8Bid) GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.PrePare; else {
          var int = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.Battle8ModelIsGame, 0);
          int >= 1 && (GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.PrePare);
        }
        this.round++;
        this.button = button;
        this.turn = button;
        var cards = RandomCardLogic_1.default.GetInstance().shuffle();
        var chair = 0;
        var arr = [ [], [], [], [] ];
        this.recordMap = {};
        this.tableCards.GameResetting();
        GameMgr_1.default.GetInstance().setTurnCount(true);
        for (var i = 0; i < cards.length; i++) {
          chair > 3 && (chair = 0);
          arr[chair].push(cards[i]);
          chair++;
        }
        var arrs = [];
        for (var i = 0; i < 4; i++) {
          this.handCards[i] = new RandomCardLogic_1.HandCards(arr[i]);
          arrs[i] = new RandomCardLogic_1.HandCards(arr[i]);
        }
        this.bots = [];
        for (var i = 0; i < 4; i++) {
          var bot = new Bot_1.default();
          bot.build(this.handCards[i]);
          this.bots.push(bot);
        }
        var CalculateScore = new CalculateScoreMgr_1.default();
        CalculateScore.init(arrs);
        CalculateScore.GetScore(arrs, button);
        this.refreshBidBoard();
      };
      SingleGameController.prototype.bidStart = function() {
        GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.Bid;
        3 == this.button ? this.button = 0 : this.button++;
        this.turn = this.button;
        this.isFakeMode == DefineConfig_1.GameModel.Online && this.setBidTime();
        this.bidTurn();
        this.showCardsNote();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Round_Start, "round", this.round.toString());
      };
      SingleGameController.prototype.bidTurn = function() {
        var _this = this;
        if (this.turn == DefineConfig_1.ChairID.Down) {
          GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.ScoreBoardForm);
          GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.ExitForm);
          GameEntry_1.default.UI.CloseForm(GameEnum_1.UIFormId.SeeCardBuyForm);
          if (this.isFakeMode == DefineConfig_1.GameModel.Battle8Bid) {
            var event = new cc.Event.EventCustom("BidPicker", true);
            event.setUserData({
              bid: 8
            });
            NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_CompleteBid, event);
          } else {
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.BidForm);
            NF_1.default.Audio.Play(7);
            if (PlayerMgr_1.default.Instance.mIsGameSingle && PlayerMgr_1.default.Instance.mBitPageNum <= 5) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["BitPage" + PlayerMgr_1.default.Instance.mBitPageNum]);
              PlayerMgr_1.default.Instance.mBitPageNum++;
            }
            if (!PlayerMgr_1.default.Instance.mIsGameSingle && PlayerMgr_1.default.Instance.mOnlineBitPageNum <= 5) {
              PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["OlBit" + PlayerMgr_1.default.Instance.mOnlineBitPageNum]);
              PlayerMgr_1.default.Instance.mOnlineBitPageNum++;
            }
          }
          this.SetHeadTime();
        } else {
          var d = .5;
          this.isFakeMode == DefineConfig_1.GameModel.Online && this.botOnline[this.turn] && (d += this.gameData.getFakeModeBidDelay() + 1);
          var turn_1 = this.turn;
          cc.tween(this.node).delay(1 * d).call(function() {
            _this.botBidTurn(turn_1);
          }).start();
          this.SetHeadTime();
        }
      };
      SingleGameController.prototype.botBidTurn = function(turn) {
        if (this.turn != turn) return;
        if (this.defaultBot) {
          var bid = this.defaultBot.bid(this.handCards[turn]);
          this.bids.setBid(turn, bid);
          this.mGameHeadItemArr[turn].SetBid(bid);
          NF_1.default.Audio.Play(4);
          this.bidNext();
        }
      };
      SingleGameController.prototype.bidNext = function() {
        this.turn++;
        this.turn > 3 && (this.turn = 0);
        if (this.turn == this.button) return this.gameStart();
        this.isFakeMode == DefineConfig_1.GameModel.Online && this.setBidTime();
        this.bidTurn();
      };
      SingleGameController.prototype.setBidTime = function() {
        this.timerKick = this.timeCountSec + [ 15, 15, 15, 15 ][this.bids.getBidsCount()];
        this.setTime(this.turn);
      };
      SingleGameController.prototype.refreshBidBoard = function() {
        this.mGameHeadItemArr.forEach(function(element) {
          element.clear();
        });
      };
      SingleGameController.prototype.gameStart = function() {
        GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.Paly;
        if (this.isFakeMode != DefineConfig_1.GameModel.Online) {
          this.setTurnTime();
          this.setTime(this.turn);
        }
        this.nextTurn();
      };
      SingleGameController.prototype.nextTurn = function() {
        var ava = RandomCardLogic_1.default.GetInstance().findDiscard(this.tabCards, this.handCards[this.turn]);
        0 == ava.length && (ava = this.handCards[this.turn].getHandCardsArr());
        if (this.isFakeMode == DefineConfig_1.GameModel.Online) {
          var r = RandomCardLogic_1.default.GetInstance().random(0, 100);
          1 == r && this.botPreOffline[this.turn] && (this.botPreOffline[this.turn] = true);
          this.setTurnTime();
        }
        this.doTurn(ava);
        this.SetHeadTime();
      };
      SingleGameController.prototype.SetHeadTime = function() {
        if (this.isFakeMode == DefineConfig_1.GameModel.Online) {
          for (var i = 0; i < this.mGameHeadItemArr.length; i++) {
            var element = this.mGameHeadItemArr[i];
            i == this.turn ? this.mGameHeadItemArr[i].SetShow(i, true) : this.mGameHeadItemArr[i].SetShow(i, false);
          }
          this.turn != DefineConfig_1.ChairID.Down || GameMgr_1.default.GetInstance().getIsDeposit() ? this.labYourTurn.active = false : this.labYourTurn.active = true;
        } else if (this.turn == DefineConfig_1.ChairID.Down) {
          this.mGameHeadItemArr[this.turn].SetShow(this.turn, true);
          GameMgr_1.default.GetInstance().getIsDeposit() || (this.isFakeMode == DefineConfig_1.GameModel.Battle8Bid && GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Bid ? this.labYourTurn.active = false : this.labYourTurn.active = true);
        } else {
          this.mGameHeadItemArr[0].SetShow(0, false);
          this.labYourTurn.active = false;
        }
      };
      SingleGameController.prototype.doTurn = function(ava) {
        var _this = this;
        var turnCount = GameMgr_1.default.GetInstance().getTurnCount();
        if (this.turn == DefineConfig_1.ChairID.Down) 12 == turnCount ? this.autoSendMyCard() : GameMgr_1.default.GetInstance().getIsDeposit() ? cc.tween(this.node).delay(.2).call(function() {
          _this.autoSendMyCard();
        }).start() : this.tableCards.disableMyCards(ava); else {
          var d = .2;
          if (turnCount < 12 && this.isFakeMode == DefineConfig_1.GameModel.Online && this.botOnline[this.turn]) {
            var r = RandomCardLogic_1.default.GetInstance().random(0, 100);
            var arr = [ .5, 1 ];
            arr = r <= 30 ? GameMgr_1.default.GetInstance().mThinkUpper2 : GameMgr_1.default.GetInstance().mThinkUpper;
            d = Math.random() * (arr[1] - arr[0]) + arr[0];
          }
          if (this.isFakeMode == DefineConfig_1.GameModel.Online && this.botPreOffline[this.turn]) return;
          var val = Number(d.toFixed(1));
          var turn_2 = this.turn;
          cc.tween(this.node).delay(val).call(function() {
            _this.botTurn(turn_2);
          }).start();
        }
      };
      SingleGameController.prototype.botTurn = function(turn) {
        if (turn != this.turn) return;
        var ava = RandomCardLogic_1.default.GetInstance().findDiscard(this.tabCards, this.handCards[this.turn]);
        0 == ava.length && (ava = this.handCards[this.turn].getHandCardsArr());
        var card = ava[0];
        card = 0 == this.tabCards.length ? this.bots[this.turn].first(this.handCards[this.turn], this.recordMap) : this.bots[this.turn].second(this.handCards[this.turn], ava, this.tabCards);
        card = this.checkCard(card, this.turn, ava);
        this.discard(this.turn, card);
      };
      SingleGameController.prototype.discard = function(chairID, card) {
        if (chairID == this.turn && this.handCards[chairID].discard(card)) {
          var self_1 = this;
          var call = function() {
            self_1.tabCards.push(card);
            self_1.tabMap[card] = chairID;
            self_1.recordMap[card] = true;
            var t = RandomCardLogic_1.default.GetInstance().getCardType(card);
            t == RandomCardLogic_1.CardType.Spades && NF_1.default.Audio.Play(9);
            self_1.mHisCards.push(card);
            self_1.updateCardsNote();
            self_1.moveToNext();
          };
          if (chairID != DefineConfig_1.ChairID.Down) {
            this.tableCards.botCard(chairID, card, call);
            return;
          }
          call();
        }
      };
      SingleGameController.prototype.moveToNext = function() {
        var _this = this;
        if (4 == this.tabCards.length) {
          var big = RandomCardLogic_1.default.GetInstance().findWinner(this.tabCards);
          var winner_1 = this.tabMap[big];
          var CallBack_1 = function() {
            _this.turn = winner_1;
            _this.tabCards = [];
            _this.tabMap = {};
            GameMgr_1.default.GetInstance().setTurnCount();
            var turnCount = GameMgr_1.default.GetInstance().getTurnCount();
            if (13 == turnCount) {
              _this.turn = -1;
              _this.clearTimer();
              _this.mHisCards.splice(0);
              _this.updateCardsNote();
              _this.turnEnd();
              return;
            }
            _this.nextTurn();
          };
          var self_2 = this;
          cc.tween(this.node).delay(.5).call(function() {
            self_2.tableCards.clearOutCards(winner_1, CallBack_1);
            self_2.bids.addScore(winner_1, 1);
            self_2.mGameHeadItemArr[winner_1].setScore(self_2.bids.getScore(winner_1));
            if (0 == winner_1) {
              var val = self_2.bids.getScore(winner_1);
              var val2 = self_2.bids.getBids(winner_1);
              if (self_2.isFakeMode != DefineConfig_1.GameModel.Online) if (cc.sys.OS_WINDOWS === cc.sys.os) self_2.mDepositBtn.node.active = true; else if (!self_2.mDepositBtn.node.active) {
                self_2.mDepositBtn.node.active = val >= val2;
                self_2.mDepositBtn.node.scale = 0;
                if (self_2.mDepositBtn.node.active) {
                  self_2.ShowAutpBtnEffect();
                  PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.AutoPlay_Appear);
                }
              }
            }
          }).start();
        } else {
          this.turn++;
          this.turn > 3 && (this.turn = 0);
          this.nextTurn();
        }
      };
      SingleGameController.prototype.turnEnd = function() {
        PlayerMgr_1.default.Instance.mIsFristRound = false;
        if (PlayerMgr_1.default.Instance.mIsGameSingle && PlayerMgr_1.default.Instance.mSumScorePageNum <= 5) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["SumScorePage" + PlayerMgr_1.default.Instance.mSumScorePageNum]);
          PlayerMgr_1.default.Instance.mSumScorePageNum++;
        }
        if (!PlayerMgr_1.default.Instance.mIsGameSingle && PlayerMgr_1.default.Instance.mOnlineSumScorePageNum <= 5) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["OlSumScore" + PlayerMgr_1.default.Instance.mOnlineSumScorePageNum]);
          PlayerMgr_1.default.Instance.mOnlineSumScorePageNum++;
        }
        var winner = this.bids.calculate();
        NF_1.default.Debug.Log(">>>> Turn end", this.bids, winner);
        var results = this.bids.results;
        GameMgr_1.default.GetInstance().SetWinOrLose(results);
        PlatformMgr_1.default.GetInstance().OnEventCount("ScoreBoard");
        PlayerMgr_1.default.Instance.CalcGameEndTimes();
        var isAuto = GameDataMgr_1.default.GetInstance().getData("Game_BitAuto", false);
        var isWin = this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].isWin();
        isWin && PlatformMgr_1.default.GetInstance().OnEventCount(isAuto ? DefineConfig_1.EventName.Game_BitAuto_EnoughWin : DefineConfig_1.EventName.Game_BitManual_EnoughWin);
        NF_1.default.Audio.Play(8);
        GameMgr_1.default.GetInstance().SetCurrRound(results.length);
        1 == results.length ? this.gameData.sendEvent(DefineConfig_1.EventName.Round1) : 2 == results.length ? this.gameData.sendEvent(DefineConfig_1.EventName.Round2) : 3 == results.length ? this.gameData.sendEvent(DefineConfig_1.EventName.Round3) : 4 == results.length ? this.gameData.sendEvent(DefineConfig_1.EventName.Round4) : 5 == results.length && this.gameData.sendEvent(DefineConfig_1.EventName.Round5);
        this.ShowHeadRank();
        if (this.bids.checkEnd()) {
          GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ScoreBoardForm) ? NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_RefreshScore, this.bids) : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ScoreBoardForm, this.bids);
          DealCardsMgr_1.default.GetInstance().SetCurrInnings();
          DealCardsMgr_1.default.GetInstance().SetHalfwayExit(false);
          return this.gameEnd();
        }
        this.mGameHeadItemArr.forEach(function(bb) {
          bb.clear();
        });
        NF_1.default.Debug.Log(">>> index ", this.button);
        this.gameBegin(this.button);
        this.offlieBotY();
        if (this.isFakeMode == DefineConfig_1.GameModel.Online) {
          GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ScoreBoardForm) ? NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_RefreshScore, this.bids) : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ScoreBoardForm, this.bids);
          this.dealCards();
        } else {
          5 == GameMgr_1.default.GetInstance().RoundMax && (2 == results.length || 4 == results.length || this.dealCards());
          3 == GameMgr_1.default.GetInstance().RoundMax && 2 != results.length && this.dealCards();
          GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ScoreBoardForm) ? NFNotifyMgr_1.default.GetInstance().Notify(GameEnum_1.EnumNotify.Game_RefreshScore, this.bids) : GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ScoreBoardForm, this.bids);
        }
      };
      SingleGameController.prototype.ShowHeadRank = function() {
        var currents = JSON.parse(JSON.stringify(this.bids.currents));
        currents.sort(function(a, b) {
          return a < b ? 1 : -1;
        });
        var arr = [];
        for (var i = 0; i < currents.length; i++) for (var j = 0; j < this.bids.currents.length; j++) {
          var b = currents[i] == this.bids.currents[j];
          if (b && -1 == arr.indexOf(j)) {
            arr.push(j);
            break;
          }
        }
        for (var i = 0; i < arr.length; i++) {
          var element = arr[i];
          this.mGameHeadItemArr[element].mrankNode.node.active = i <= 2;
          i <= 2 && (this.mGameHeadItemArr[element].mrankNode.spriteFrame = this.mRankSprite[i]);
        }
      };
      SingleGameController.prototype.dealCards = function() {
        if (!this.isDeal && GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.PrePare) {
          this.isDeal = true;
          this.deal.deal(this.button);
        }
      };
      SingleGameController.prototype.gameEnd = function() {
        NF_1.default.Audio.Play(13);
        GameMgr_1.default.GetInstance().GameState = DefineConfig_1.GameState.End;
      };
      SingleGameController.prototype.setTurnTime = function() {
        var val = 10 - this.mIndex % 4;
        this.mIndex += 1;
        this.timerKick = this.timeCountSec + val;
        this.setTime(this.turn);
      };
      SingleGameController.prototype.setBotNames = function(seats) {
        var myIndex = 0;
        for (var i = 0; i < 4; i++) 0 == seats[i] && (myIndex = i);
        for (var i = 1; i < 4; i++) {
          myIndex++;
          myIndex > 3 && (myIndex = 0);
          this.names[i].string = "Bot-" + seats[myIndex];
          this.mGameHeadItemArr[i].SetName("Bot-" + seats[myIndex]);
          this.isFakeMode == DefineConfig_1.GameModel.Online && (this.names[i].string = this.fakeNames[seats[myIndex]]);
        }
        var name = cc.sys.localStorage.getItem(DefineConfig_1.LocalStorageKey.MyName);
        if (name) {
          this.names[DefineConfig_1.ChairID.Down].string = name + "(me)";
          this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].SetName(name + "(me)");
        } else {
          this.names[DefineConfig_1.ChairID.Down].string = "(me)";
          this.mGameHeadItemArr[DefineConfig_1.ChairID.Down].SetName("(me)");
        }
      };
      SingleGameController.prototype.version = function() {
        this.labVersion.string = DefineConfig_1.Version;
      };
      SingleGameController.prototype.setTime = function(chairID) {
        var _this = this;
        if (this.isFakeMode != DefineConfig_1.GameModel.Online) return;
        if (this.timerKick - this.timeCountSec < 0 || -1 == this.turn) return;
        this.timers.forEach(function(timer, index) {
          if (chairID != index) timer.node.active = false; else {
            var c = _this.timerKick - _this.timeCountSec;
            var max = 0;
            if (chairID == DefineConfig_1.ChairID.Down) {
              timer.string = "Timeout: " + c;
              GameMgr_1.default.GetInstance().CountDown = c;
            } else {
              max = GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Bid ? [ 5, 5, 5, 5 ][_this.bids.getBidsCount()] : [ 5, 5, 5, 5 ][_this.tabCards.length];
              timer.string = (max - c > 2, "thinking...\n" + c);
            }
            chairID == DefineConfig_1.ChairID.Down && GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.Paly && GameMgr_1.default.GetInstance().getIsDeposit() || (timer.node.active = true);
          }
        });
      };
      SingleGameController.prototype.clearTimer = function() {
        this.timers.forEach(function(timer) {
          timer.node.active = false;
        });
      };
      SingleGameController.prototype.clearTimeKick = function() {
        this.timerKick = -1;
      };
      SingleGameController.prototype.offlieBotY = function() {
        if (this.isFakeMode != DefineConfig_1.GameModel.Online) return;
        if (this.offlineInfo.Y == this.round) for (var i = 1; i < 4; i++) if (this.gameData.getFakeModeBotOfflineY() && this.botOnline[i]) {
          this.botOnline[i] = false;
          var name = this.names[i].string;
          this.names[i].string = name + "(bot)";
          this.mGameHeadItemArr[i].SetName(name + "(bot)");
        }
      };
      SingleGameController.prototype.checkCard = function(card, turn, ava) {
        var hc = this.handCards[turn];
        if (!hc.checkCard(card)) return ava[RandomCardLogic_1.default.GetInstance().random(0, ava.length)];
        var ok = false;
        for (var i = 0; i < ava.length; i++) if (ava[i] == card) {
          ok = true;
          break;
        }
        if (!ok) return ava[RandomCardLogic_1.default.GetInstance().random(0, ava.length)];
        return card;
      };
      SingleGameController.prototype.autoSendMyCard = function() {
        var ava = RandomCardLogic_1.default.GetInstance().findDiscard(this.tabCards, this.handCards[this.turn]);
        0 == ava.length && (ava = this.handCards[this.turn].getHandCardsArr());
        if (0 == this.tabCards.length) {
          var card = this.bots[DefineConfig_1.ChairID.Down].first(this.handCards[this.turn], this.recordMap);
          this.tableCards.sendMyCard(this.checkCard(card, this.turn, ava));
        } else this.tableCards.sendMyCard(this.bots[DefineConfig_1.ChairID.Down].second(this.handCards[this.turn], ava, this.tabCards));
      };
      SingleGameController.prototype.btnShowScoreBoard = function() {
        if (GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.End) return;
        NF_1.default.BtnUtils.IsTouchEnd();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_ScoreRecords_Click);
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ScoreBoardForm, this.bids);
      };
      SingleGameController.prototype.btnExit = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        if (GameMgr_1.default.GetInstance().GameState == DefineConfig_1.GameState.End) return;
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ExitForm);
      };
      SingleGameController.prototype.btnShowCardsNote = function() {
        if (this.mCardsNote) {
          if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
          var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
          var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + info.mPayId, 0);
          if (1 != effective) {
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.SeeCardBuyForm);
            return;
          }
          this.mCardsNote.active = !this.mCardsNote.active;
          var dele = this.mCardsNote.getComponent("CardsNoteForm");
          dele.OnOpen(this.mHisCards);
          this.ShowBtnEffect(!this.mCardsNote.active);
        }
      };
      SingleGameController.prototype.checkShowCardsNoteAd = function() {
        if (this.isFakeMode == DefineConfig_1.GameModel.Battle8Bid) {
          var int = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.Battle8ModelIsGame, 0);
          if (int <= 0) {
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.BidModelHelpForm);
            return;
          }
        }
        if (this.mCardsNote) {
          var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
          var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + info.mPayId, 0);
          var gameNum = GameDataMgr_1.default.GetInstance().getData("GameNum", 0);
          gameNum++;
          if (1 != effective && gameNum >= 2 && AdManger_1.default.GetInstance().CheckAd(EnumMacros_1.AdsType.AT_Int_RewardVideo, "sp_004")) {
            GameDataMgr_1.default.GetInstance().setData("GameNum", 0);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.SeeCardAdForm);
          } else GameDataMgr_1.default.GetInstance().setData("GameNum", gameNum);
        }
      };
      SingleGameController.prototype.showCardsNote = function() {
        if (this.mCardsNote && !this.mCardsNote.active) {
          var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
          var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + info.mPayId, 0);
          if (effective) {
            this.mCardsNote.active = true;
            var dele = this.mCardsNote.getComponent("CardsNoteForm");
            dele.OnOpen(this.mHisCards);
            this.ShowBtnEffect(!this.mCardsNote.active);
          }
        }
      };
      SingleGameController.prototype.updateCardNoteTime = function() {
        var info = NF_1.default.DataTables.GetInfoById("ShopInfo", 102);
        var effective = GameDataMgr_1.default.GetInstance().getData("SkuEffective" + info.mPayId, 0);
        var nowTime = new Date().getTime();
        var endTime = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.SkuTime + info.mPayId, 0);
        this.mBuyTime = endTime;
        this.mTxtLeftTime = this.mBtnCardsNote.node.getChildByName("TxtTime").getComponent(cc.Label);
        if (this.mBuyTime > nowTime) {
          var leftTime = this.mBuyTime - new Date().getTime();
          var day = Math.ceil(leftTime / 864e5);
          if (day > 1) this.mTxtLeftTime.string = day + "Day"; else if (-1 == this.mInterval) {
            var self_3 = this;
            var callfunc = function() {
              var leftTime = self_3.mBuyTime - new Date().getTime();
              if (leftTime > 18e5) {
                var left = NF_1.default.Date.LeftTimeFormat(self_3.mBuyTime, "hh:mm:ss");
                self_3.mTxtLeftTime.string = left;
              } else if (leftTime > 0) {
                var left = NF_1.default.Date.LeftTimeFormat(self_3.mBuyTime, "mm:ss");
                self_3.mTxtLeftTime.string = left;
              } else {
                clearInterval(self_3.mInterval);
                self_3.mInterval = -1;
                GameDataMgr_1.default.GetInstance().setData("SkuEffective" + info.mPayId, 0);
                self_3.mCardsNote.active = false;
                self_3.mTxtLeftTime.string = "SEE CARDS";
              }
            };
            this.mInterval = setInterval(callfunc, 1e3);
          }
          if (this.mCardsNote && !this.mCardsNote.active) {
            var self_4 = this;
            cc.tween(this.node).delay(1).call(function() {
              self_4.showCardsNote();
            }).start();
          }
        } else this.mTxtLeftTime.string = "SEE CARDS";
      };
      SingleGameController.prototype.updateCardsNote = function() {
        if (this.mCardsNote && this.mCardsNote.active) {
          var dele = this.mCardsNote.getComponent("CardsNoteForm");
          dele.OnOpen(this.mHisCards);
          this.ShowBtnEffect(!this.mCardsNote.active);
        }
      };
      SingleGameController.prototype.OnBtnShop = function() {
        if (!NF_1.default.BtnUtils.IsTouchEnd(0)) return;
        if (!this.mShopClick) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.ShopClick);
          this.mShopClick = true;
        }
        var item = SkinMgr_1.default.GetInstance().GetDiscountData();
        if (item && item.SkinInfo.mTag2) {
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Shop_Click);
          GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, item.SkinInfo.mTag2);
        } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopForm, 1);
      };
      SingleGameController.prototype.onGoogleClick = function() {
        window["onGoogleClick"] && window["onGoogleClick"]();
      };
      __decorate([ property(Deal_1.default) ], SingleGameController.prototype, "deal", void 0);
      __decorate([ property(TableCards_1.default) ], SingleGameController.prototype, "tableCards", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "ndBidBoards", void 0);
      __decorate([ property(cc.Prefab) ], SingleGameController.prototype, "pBidBoard", void 0);
      __decorate([ property([ cc.Label ]) ], SingleGameController.prototype, "names", void 0);
      __decorate([ property([ GameHeadItem_1.default ]) ], SingleGameController.prototype, "mGameHeadItemArr", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "labYourTurn", void 0);
      __decorate([ property(cc.Label) ], SingleGameController.prototype, "labVersion", void 0);
      __decorate([ property([ cc.Label ]) ], SingleGameController.prototype, "timers", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mCardsNote", void 0);
      __decorate([ property(cc.Button) ], SingleGameController.prototype, "mBtnCardsNote", void 0);
      __decorate([ property(cc.Button) ], SingleGameController.prototype, "mDepositBtn", void 0);
      __decorate([ property(cc.Sprite) ], SingleGameController.prototype, "mDepositBtnBG", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mDepositSwitchBG", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mDepositSliderBG", void 0);
      __decorate([ property(sp.Skeleton) ], SingleGameController.prototype, "mAutoplay", void 0);
      __decorate([ property(cc.SpriteFrame) ], SingleGameController.prototype, "mDepositSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SingleGameController.prototype, "mRankSprite", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mShopBtn", void 0);
      __decorate([ property(cc.Label) ], SingleGameController.prototype, "mShopDiscountLab", void 0);
      __decorate([ property(cc.Label) ], SingleGameController.prototype, "mShopDiscountTimeLab", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mbid8BG", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mbid8TF", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mbid8effect", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mBidPosNode", void 0);
      __decorate([ property(cc.Node) ], SingleGameController.prototype, "mGoogleBtn", void 0);
      SingleGameController = __decorate([ ccclass ], SingleGameController);
      return SingleGameController;
    }(cc.Component);
    exports.default = SingleGameController;
    cc._RF.pop();
  }, {
    "./Bot": "Bot",
    "./Common/Mgr/CalculateScoreMgr": "CalculateScoreMgr",
    "./Common/Mgr/DealCardsMgr": "DealCardsMgr",
    "./Common/Mgr/GameDataMgr": "GameDataMgr",
    "./Common/Mgr/GameEntry": "GameEntry",
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Common/Mgr/SkinMgr": "SkinMgr",
    "./Deal": "Deal",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./GameHeadItem": "GameHeadItem",
    "./NFramework/Definition/EnumMacros": "EnumMacros",
    "./NFramework/NF": "NF",
    "./NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "./Platform/AdManger": "AdManger",
    "./Platform/PlatformMgr": "PlatformMgr",
    "./RandomCardLogic": "RandomCardLogic",
    "./TableCards": "TableCards"
  } ],
  SkinMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2475d9SZSFFbJVgeH4xVwoo", "SkinMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DefineConfig_1 = require("../../Definition/Constant/DefineConfig");
    var GameEnum_1 = require("../../Definition/Constant/GameEnum");
    var BaseInstance_1 = require("../../NFramework/Base/BaseInstance");
    var NF_1 = require("../../NFramework/NF");
    var PlatformMgr_1 = require("../../Platform/PlatformMgr");
    var DealCardsMgr_1 = require("./DealCardsMgr");
    var GameDataMgr_1 = require("./GameDataMgr");
    var GameEntry_1 = require("./GameEntry");
    var PlayerMgr_1 = require("./PlayerMgr");
    var SkinMgr = function(_super) {
      __extends(SkinMgr, _super);
      function SkinMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      SkinMgr.prototype.InitData = function() {
        PlatformMgr_1.default.GetInstance().IsTranssion();
        this.mAllShopInfo = NF_1.default.DataTables.GetAllInfos("ShopInfo");
        this.mDiscountData = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.DiscountData);
        this.mSkinData = NF_1.default.Storage.GetData(DefineConfig_1.LocalStorageKey.SkinData);
        var show = GameDataMgr_1.default.GetInstance().getData("IsTranssion", true);
        if (!this.mSkinData) {
          this.mSkinData = {};
          this.mSkinData.BgWear = 401;
          this.mSkinData.CardWear = 301;
          this.mSkinData.UnlockSkinArr = [];
          this.mSkinData.SkinWeight = [];
          this.mSkinData.DiscountArr = [];
          for (var index = 0; index < this.mAllShopInfo.length; index++) {
            var element = this.mAllShopInfo[index];
            var item = element;
            if ((309 == item.mId || 409 == item.mId) && show) continue;
            if ((7 == item.mType || 3 == item.mType) && (1 == item.mTag2 || 2 == item.mTag2)) {
              var obj = {};
              obj.IsVideo = 7 == item.mType;
              obj.SkinWeight = 0;
              obj.Skinid = item.mId;
              this.mSkinData.SkinWeight.push(obj);
            }
          }
          this.mSkinData.UnlockSkinArr.push(401);
          this.mSkinData.UnlockSkinArr.push(301);
          this.SavaSkinData();
        }
        PlayerMgr_1.default.Instance.PlayerData.mIsNewGame || this.ProduceDiscountData();
      };
      SkinMgr.prototype.SavaSkinData = function() {
        NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.SkinData, this.mSkinData);
      };
      Object.defineProperty(SkinMgr.prototype, "AllShopInfo", {
        get: function() {
          return this.mAllShopInfo;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(SkinMgr.prototype, "SkinData", {
        get: function() {
          return this.mSkinData;
        },
        enumerable: false,
        configurable: true
      });
      SkinMgr.prototype.GetDiscountData = function() {
        var data = PlatformMgr_1.default.GetFBcData();
        if (this.mDiscountData && this.mDiscountData.DiscountEndTimes <= NF_1.default.Time.CurrentNetTime) {
          this.mDiscountData = null;
          NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.DiscountData, this.mDiscountData);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint);
          NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
        }
        return this.mDiscountData;
      };
      SkinMgr.prototype.ProduceDiscountData = function(isHome, isforce) {
        var _this = this;
        void 0 === isHome && (isHome = false);
        void 0 === isforce && (isforce = false);
        var isProduce = false;
        isHome ? PlayerMgr_1.default.Instance.PlayerData.mIsNewGame && DealCardsMgr_1.default.GetInstance().GameStrategy.CurrInnings >= 1 && (!this.mDiscountData || this.mDiscountData && this.mDiscountData.DiscountEndTimes <= NF_1.default.Time.CurrentNetTime) && (isProduce = true) : isProduce = !this.mDiscountData || this.mDiscountData && this.mDiscountData.DiscountEndTimes <= NF_1.default.Time.CurrentNetTime;
        if (isProduce) {
          var id = this.getSkinId();
          if (id > 0) {
            this.mDiscountData = {};
            this.mDiscountData.DiscountStartTimes = NF_1.default.Time.CurrentNetTime;
            this.mDiscountData.DiscountEndTimes = NF_1.default.Time.CurrentNetTime + 864e5;
            this.mDiscountData.SkinId = this.getSkinId();
            this.mAllShopInfo.forEach(function(element) {
              element.mId == _this.mDiscountData.SkinId && (_this.mDiscountData.SkinInfo = element);
            });
            NF_1.default.Storage.SetData(DefineConfig_1.LocalStorageKey.DiscountData, this.mDiscountData);
            GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.ShopDiscountForm);
          }
        }
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop_RedPoint);
      };
      SkinMgr.prototype.SetSkinUnlock = function(info, isPush) {
        void 0 === isPush && (isPush = true);
        this.mSkinData.UnlockSkinArr.push(info.mId);
        if (!isPush) {
          this.SavaSkinData();
          return;
        }
        "SingleGame" == cc.director.getScene().name ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Game_Shop_Buy) : PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Home_TimeLimit_Buy);
        this.mDiscountData && info.mId == this.mDiscountData.SkinInfo.mId && (3 == info.mType ? PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TimeLimit_Coin_Buy) : 7 == info.mType && PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.TimeLimit_AD_Buy));
        PlatformMgr_1.default.GetInstance().OnEventCount(NF_1.default.String.Splicing(DefineConfig_1.EventName.AllSkinBuy, info.mId));
        this.SetWearSkin(info);
      };
      SkinMgr.prototype.SetWearSkin = function(info) {
        1 == info.mTag2 && (this.mSkinData.BgWear = info.mId);
        2 == info.mTag2 && (this.mSkinData.CardWear = info.mId);
        this.SavaSkinData();
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_WearSkin);
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_Shop);
      };
      SkinMgr.prototype.SetWeight = function(skinid, num) {
        void 0 === num && (num = 1);
        if (-1 == this.mSkinData.UnlockSkinArr.indexOf(skinid)) {
          var arr = this.mSkinData.SkinWeight;
          arr.forEach(function(element) {
            element.Skinid == skinid && (element.SkinWeight += num);
          });
          this.SavaSkinData();
        }
      };
      SkinMgr.prototype.getSkinId = function() {
        var count = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.VideoCount);
        var item;
        var arr = this.mSkinData.SkinWeight;
        arr.sort(function(a, b) {
          if (a.SkinWeight > b.SkinWeight) return -1;
          return 1;
        });
        for (var index = arr.length - 1; index >= 0; index--) {
          var element = arr[index];
          if (element.IsVideo) {
            var info = NF_1.default.DataTables.GetInfoById("ShopInfo", element.Skinid);
            var count_1 = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.ADShop + element.Skinid, 0);
            info.mPriceB - count_1 <= 1 && arr.splice(index, 1);
          }
        }
        var weight = 0;
        var isSame = false;
        if (count < 10) {
          var arrs = [];
          for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            var isUnlock = -1 == this.mSkinData.UnlockSkinArr.indexOf(element.Skinid);
            var isDiscount = -1 == this.mSkinData.DiscountArr.indexOf(element.Skinid);
            if (isUnlock && isDiscount && element.IsVideo) {
              if (item) {
                isSame = weight == element.SkinWeight;
                if (!isSame) break;
              } else {
                weight = element.SkinWeight;
                item = element.Skinid;
              }
              arrs.push(element);
            }
          }
          item = arrs.length > 0 ? arrs[NF_1.default.Math.RandomInt(0, arrs.length)].Skinid : -1;
        } else {
          var repeatarr = [];
          for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            var isUnlock = -1 == this.mSkinData.UnlockSkinArr.indexOf(element.Skinid);
            var isDiscount = -1 == this.mSkinData.DiscountArr.indexOf(element.Skinid);
            if (isUnlock && isDiscount && element.SkinWeight >= weight) {
              weight = element.SkinWeight;
              repeatarr.push(element);
            }
          }
          if (repeatarr.length > 0) {
            var isCoin = true;
            for (var index = 0; index < repeatarr.length; index++) {
              var element = repeatarr[index];
              if (element.IsVideo) {
                isCoin = false;
                break;
              }
            }
            if (isCoin) {
              var coin = PlayerMgr_1.default.Instance.PlayerData.mGold;
              var gap = 0;
              for (var index = 0; index < repeatarr.length; index++) {
                var element = repeatarr[index];
                var info = NF_1.default.DataTables.GetInfoById("ShopInfo", element.Skinid);
                if (0 == gap) {
                  gap = info.mPrice - coin;
                  item = element.Skinid;
                } else info.mPrice - coin < gap && (item = element.Skinid);
              }
            } else item = repeatarr[NF_1.default.Math.RandomInt(0, repeatarr.length)].Skinid;
          }
        }
        return item;
      };
      return SkinMgr;
    }(BaseInstance_1.default);
    exports.default = SkinMgr;
    cc._RF.pop();
  }, {
    "../../Definition/Constant/DefineConfig": "DefineConfig",
    "../../Definition/Constant/GameEnum": "GameEnum",
    "../../NFramework/Base/BaseInstance": "BaseInstance",
    "../../NFramework/NF": "NF",
    "../../Platform/PlatformMgr": "PlatformMgr",
    "./DealCardsMgr": "DealCardsMgr",
    "./GameDataMgr": "GameDataMgr",
    "./GameEntry": "GameEntry",
    "./PlayerMgr": "PlayerMgr"
  } ],
  StaticEventMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9c0ap44JRJGZ+wpMiAOs2m", "StaticEventMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../../NFramework/Base/BaseInstance");
    var NF_1 = require("../../NFramework/NF");
    var StaticEventMgr = function(_super) {
      __extends(StaticEventMgr, _super);
      function StaticEventMgr() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.FristKey = "FristKey";
        _this.mIsFristDay = false;
        _this.mIsNewDay = false;
        return _this;
      }
      StaticEventMgr.prototype.InitData = function() {
        this.CheckDay();
      };
      StaticEventMgr.prototype.CheckDay = function() {
        var date = NF_1.default.Storage.GetInt(this.FristKey, 0);
        date > 0;
      };
      return StaticEventMgr;
    }(BaseInstance_1.default);
    exports.default = StaticEventMgr;
    cc._RF.pop();
  }, {
    "../../NFramework/Base/BaseInstance": "BaseInstance",
    "../../NFramework/NF": "NF"
  } ],
  TableBack: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c902e0j7AtFTr2ZvB/lDpOm", "TableBack");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SkinMgr_1 = require("./Common/Mgr/SkinMgr");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var GameEnum_1 = require("./Definition/Constant/GameEnum");
    var NFLocalStorage_1 = require("./NFramework/DataBase/NFLocalStorage");
    var NF_1 = require("./NFramework/NF");
    var NFNotifyMgr_1 = require("./NFramework/Notification/NFNotifyMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TableBack = function(_super) {
      __extends(TableBack, _super);
      function TableBack() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mIsGame = false;
        _this.mIsload = false;
        _this.gameData = null;
        return _this;
      }
      TableBack.prototype.onLoad = function() {};
      TableBack.prototype.start = function() {};
      TableBack.prototype.onEnable = function() {
        var data = cc.find("GameData");
        if (data) {
          var gameData = data.getComponent("GameData");
          this.gameData = gameData;
        }
        this.RefreshTableSkin();
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.EN_Refresh_WearSkin, this.RefreshTableSkin, this);
      };
      TableBack.prototype.onDisable = function() {
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
      };
      TableBack.prototype.RefreshTableSkin = function() {
        var skin = SkinMgr_1.default.GetInstance().SkinData.BgWear;
        var BgIndex = 0;
        var info;
        var data = NFLocalStorage_1.default.GetInstance().GetData(DefineConfig_1.LocalStorageKey.FreeTrialData, null);
        if (data && data.skinId > 0 && 4 == data.skinType) {
          info = NF_1.default.DataTables.GetInfoById("ShopInfo", data.skinId);
          skin = data.skinId;
          BgIndex = info.mBgIndex;
        }
        if (0 != skin) {
          info = NF_1.default.DataTables.GetInfoById("ShopInfo", skin);
          if (info) {
            BgIndex = info.mBgIndex;
            var frame = this.gameData.mBg[BgIndex];
            frame && (this.node.getComponent(cc.Sprite).spriteFrame = frame);
          }
        } else this.node.getComponent(cc.Sprite).spriteFrame = this.gameData.mBg[skin];
      };
      __decorate([ property(cc.Boolean) ], TableBack.prototype, "mIsGame", void 0);
      __decorate([ property(cc.Boolean) ], TableBack.prototype, "mIsload", void 0);
      TableBack = __decorate([ ccclass ], TableBack);
      return TableBack;
    }(cc.Component);
    exports.default = TableBack;
    cc._RF.pop();
  }, {
    "./Common/Mgr/SkinMgr": "SkinMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./Definition/Constant/GameEnum": "GameEnum",
    "./NFramework/DataBase/NFLocalStorage": "NFLocalStorage",
    "./NFramework/NF": "NF",
    "./NFramework/Notification/NFNotifyMgr": "NFNotifyMgr"
  } ],
  TableCards: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c4fdWflSdDG4nZflrU4VCC", "TableCards");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MyCard_1 = require("./MyCard");
    var DefineConfig_1 = require("./Definition/Constant/DefineConfig");
    var PlayerMgr_1 = require("./Common/Mgr/PlayerMgr");
    var GameMgr_1 = require("./Common/Mgr/GameMgr");
    var NF_1 = require("./NFramework/NF");
    var RandomCardLogic_1 = require("./RandomCardLogic");
    var PlatformMgr_1 = require("./Platform/PlatformMgr");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    function getRotationRCard(c) {
      var max = 13 - c;
      var arr = [];
      for (var i = 0; i < max; i++) arr.push(3 * c + 8 * i);
      return arr;
    }
    function getPositionXCard(c) {
      var posArr = [];
      var covert = (100 * c - cc.winSize.width) / (c - 1);
      if (covert < 10) {
        covert = 10;
        var max = 100 * c - (c - 1) * covert;
        var start = (cc.winSize.width - max) / 2;
        for (var i = 0; i < c; i++) {
          var pos = cc.v2(start + (50 + i * (100 - covert)) - cc.winSize.width / 2, 0);
          posArr.push(pos);
        }
      } else for (var i = 0; i < c; i++) {
        var pos = cc.v2(50 + i * (100 - covert) - cc.winSize.width / 2, 0);
        posArr.push(pos);
      }
      return posArr;
    }
    var TableCards = function(_super) {
      __extends(TableCards, _super);
      function TableCards() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pCardBack = null;
        _this.pCard = null;
        _this.ndHands = [];
        _this.kill = 0;
        _this.ndHandCards = [];
        _this.myCards = [];
        _this.outCards = [];
        _this.CardRecord = {};
        _this.discardEaseing = cc.easeSineInOut();
        _this.tabCards = [];
        return _this;
      }
      TableCards.prototype.start = function() {};
      TableCards.prototype.loadHandCards = function(cards) {
        for (var i = 1; i < 4; i++) this.createHandCards(i);
        var me = this.ndHands[DefineConfig_1.ChairID.Down];
        var posArr = getPositionXCard(13);
        for (var i = 0; i < 13; i++) {
          var node = cc.instantiate(this.pCard);
          cc.tween(node).to(.5, {
            position: posArr[i]
          }).start();
          var myCard = node.getComponent(MyCard_1.default);
          myCard.refreshCard(cards[i]);
          myCard.posCurrent = posArr[i];
          myCard.tableCards = this;
          myCard.cardIndex = i;
          node.zIndex = 10;
          me.addChild(node);
          me.zIndex = 10;
          this.myCards.push(node.getComponent(MyCard_1.default));
        }
      };
      TableCards.prototype.createHandCards = function(chairID) {
        if (chairID == DefineConfig_1.ChairID.Down) return;
        var pos = this.ndHands[chairID].getPosition();
        var nds = [];
        for (var i = 0; i < 13; i++) {
          var node = cc.instantiate(this.pCardBack);
          node.angle = -80;
          node.setPosition(pos);
          this.node.addChild(node);
          node.zIndex = 1e3 + 100 * chairID + i;
          node.scale = .5;
          nds.push(node);
        }
        var rotations = getRotationRCard(0);
        var effectPos = cc.v3(13, -9);
        for (var i = 0; i < 13; i++) {
          var n = nds[i];
          var r = rotations[i];
          if (chairID == DefineConfig_1.ChairID.Up) {
            n.angle = 180;
            r += 128;
            effectPos = cc.v3(21 - 3.5 * i, n.y + -9 + 1.5 * i);
          } else if (chairID == DefineConfig_1.ChairID.Left) {
            n.angle = -90;
            r += 40;
            r = -r;
            effectPos = cc.v3(n.x + 9 - 1.5 * i, 3.5 * i - 21);
          } else if (chairID == DefineConfig_1.ChairID.Right) {
            n.angle = 90;
            r += 40;
            effectPos = cc.v3(n.x - 9 + 1.5 * i, 3.5 * i - 21);
          }
          this.rotateTo(n, r, effectPos);
        }
        this.ndHandCards[chairID] = nds;
      };
      TableCards.prototype.rotateTo = function(node, val, effectPos) {
        cc.tween(node).to(.5, {
          angle: val,
          position: effectPos
        }).start();
      };
      TableCards.prototype.disableMyCards = function(ava) {
        var avaMap = {};
        ava.forEach(function(card) {
          avaMap[card] = true;
        });
        this.myCards.forEach(function(mc) {
          avaMap[mc.card] ? mc.enable = true : mc.disableCard();
        });
      };
      TableCards.prototype.myCard = function(mc) {
        var _this = this;
        var turnCount = GameMgr_1.default.GetInstance().getTurnCount();
        if (this.CardRecord[turnCount]) return;
        this.CardRecord[turnCount] = mc.card;
        if (PlayerMgr_1.default.Instance.mIsGameSingle && PlayerMgr_1.default.Instance.mIsFristRound) {
          var num = 13 - this.myCards.length + 1;
          num.toString().length < 2 && (num = "0" + num.toString());
          PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName["Card" + num]);
        }
        NF_1.default.Audio.Play(4);
        var zIndexFin = this.outCards.length - 10;
        var posMe = this.ndHands[DefineConfig_1.ChairID.Down].position;
        var pos = posMe.add(mc.node.position);
        mc.node.removeFromParent();
        mc.node.setPosition(pos);
        cc.tween(mc.node).to(GameMgr_1.default.GetInstance().DiscardSpeed, {
          position: cc.v3(posMe.x, -67),
          scale: 1
        }, {
          easing: "sineInOut"
        }).delay(.1).call(function() {
          mc.node.zIndex = zIndexFin;
          var event = new cc.Event.EventCustom("MyCardSent", true);
          event.setUserData({
            card: mc.card
          });
          _this.node.dispatchEvent(event);
        }).start();
        this.node.addChild(mc.node);
        this.outCards.push(mc);
        this.tabCards.push(mc.card);
        var cardIndex = mc.cardIndex;
        this.myCards = [].concat(this.myCards.slice(0, cardIndex), this.myCards.slice(cardIndex + 1, this.myCards.length));
        var posArr = getPositionXCard(this.myCards.length);
        for (var i = 0; i < this.myCards.length; i++) {
          var mc_1 = this.myCards[i];
          var pos_1 = posArr[i];
          mc_1.posCurrent = pos_1;
          mc_1.cardIndex = i;
          mc_1.enable = false;
          mc_1.goto(pos_1);
        }
      };
      TableCards.prototype.sendMyCard = function(card) {
        var discard = null;
        for (var i = 0; i < this.myCards.length; i++) if (this.myCards[i].card == card) {
          discard = this.myCards[i];
          break;
        }
        this.myCard(discard);
      };
      TableCards.prototype.GameResetting = function() {
        this.CardRecord = {};
      };
      TableCards.prototype.botCard = function(chairID, discard, CallBack) {
        if (chairID == DefineConfig_1.ChairID.Down) return;
        var list = [];
        this.ndHandCards[chairID].forEach(function(card) {
          card.active && list.push(card);
        });
        var index = RandomCardLogic_1.default.GetInstance().random(0, list.length);
        list[index].active = false;
        NF_1.default.Audio.Play(4);
        var zIndex = list[index].zIndex;
        var zIndexFin = this.outCards.length - 10;
        var myCard = cc.instantiate(this.pCard).getComponent(MyCard_1.default);
        myCard.refreshCard(discard);
        chairID == DefineConfig_1.ChairID.Right ? myCard.node.angle = -90 : chairID == DefineConfig_1.ChairID.Up ? myCard.node.angle = 180 : chairID == DefineConfig_1.ChairID.Left && (myCard.node.angle = 90);
        myCard.node.zIndex = zIndex;
        myCard.node.setPosition(list[index].getPosition());
        var disH = 0;
        var pos = cc.v3();
        chairID == DefineConfig_1.ChairID.Right ? pos = cc.v3(66, this.ndHands[chairID].y - disH) : chairID == DefineConfig_1.ChairID.Up ? pos = cc.v3(this.ndHands[chairID].x, 67) : chairID == DefineConfig_1.ChairID.Left && (pos = cc.v3(-66, this.ndHands[chairID].y - disH));
        myCard.node.zIndex = zIndexFin;
        cc.tween(myCard.node).to(GameMgr_1.default.GetInstance().DiscardSpeed, {
          position: pos
        }, {
          easing: "sineInOut"
        }).delay(.1).call(function() {
          myCard.node.zIndex = zIndexFin;
          CallBack && CallBack();
        }).start();
        this.node.addChild(myCard.node);
        this.outCards.push(myCard);
        this.tabCards.push(discard);
        var effectPos = cc.v3(13, -9);
        list = [].concat(list.slice(0, index), list.slice(index + 1, list.length));
        var len = 13 - list.length;
        var rotations = getRotationRCard(0);
        for (var i = 0; i < list.length; i++) {
          var n = list[i];
          var r = rotations[i];
          if (chairID == DefineConfig_1.ChairID.Up) {
            r += 128 + 4.35 * len;
            effectPos = cc.v3(21 - 3.5 * i - 1.75 * len, this.ndHands[chairID].getPosition().y + -9 + 1.5 * i);
          } else if (chairID == DefineConfig_1.ChairID.Left) {
            r += 40 + 4.15 * len;
            r = -r;
            effectPos = cc.v3(this.ndHands[chairID].getPosition().x + 9 - 1.5 * i, 3.5 * i - 21 + 1.75 * len);
          } else if (chairID == DefineConfig_1.ChairID.Right) {
            r += 40 + 4.15 * len;
            effectPos = cc.v3(this.ndHands[chairID].getPosition().x - 9 + 1.5 * i, 3.5 * i - 21 + 1.75 * len);
          }
          cc.tween(n).to(.5, {
            angle: r,
            position: effectPos
          }).start();
        }
      };
      TableCards.prototype.checkWin = function() {
        if (this.tabCards.length >= 4) {
          var winner_1 = RandomCardLogic_1.default.GetInstance().findWinner(this.tabCards);
          this.outCards.forEach(function(element) {
            if (element.card == winner_1) {
              element.ShowShine();
              cc.tween(element.node).to(.2, {
                scale: element.node.scale + .1
              }).start();
              element.node.zIndex = 1;
            }
          });
        }
      };
      TableCards.prototype.clearOutCards = function(winner, fun) {
        var _this = this;
        var time = GameMgr_1.default.GetInstance().RecoveryTimes;
        var callBack = fun;
        this.checkWin();
        cc.tween(this.node).delay(.5).call(function() {
          if (winner == DefineConfig_1.ChairID.Down) {
            NF_1.default.Audio.Play(6);
            _this.outCards.forEach(function(mc) {
              var ma = Math.abs(mc.node.angle);
              if (90 == ma) {
                var mr = 90 == mc.node.angle ? -60 : 60;
                var t = cc.tween;
                t(mc.node).parallel(t().by(time, {
                  angle: mr
                }), t().to(time, {
                  position: cc.v3(mc.node.x, -cc.winSize.height)
                }, {
                  easing: "sineIn"
                })).call(function() {
                  mc.node.removeFromParent();
                  if (null != callBack) {
                    callBack();
                    callBack = null;
                  }
                }).start();
              } else cc.tween(mc.node).to(time, {
                position: cc.v3(mc.node.x, -cc.winSize.height)
              }, {
                easing: "sineIn"
              }).call(function() {
                mc.node.removeFromParent();
              }).start();
            });
          } else if (winner == DefineConfig_1.ChairID.Up) {
            NF_1.default.Audio.Play(5);
            _this.outCards.forEach(function(mc) {
              var ma = Math.abs(mc.node.angle);
              if (90 == ma) {
                var mr = 90 == mc.node.angle ? 60 : -60;
                var t = cc.tween;
                t(mc.node).parallel(t().by(time, {
                  angle: mr
                }), t().to(time, {
                  position: cc.v3(mc.node.x, cc.winSize.height)
                }, {
                  easing: "sineIn"
                })).call(function() {
                  mc.node.removeFromParent();
                  if (null != callBack) {
                    callBack();
                    callBack = null;
                  }
                }).start();
              } else cc.tween(mc.node).to(time, {
                position: cc.v3(mc.node.x, cc.winSize.height)
              }, {
                easing: "sineIn"
              }).call(function() {
                mc.node.removeFromParent();
              }).start();
            });
          } else {
            NF_1.default.Audio.Play(5);
            _this.outCards.forEach(function(mc) {
              var x = cc.winSize.width;
              winner == DefineConfig_1.ChairID.Left && (x = -cc.winSize.width);
              var t = cc.tween;
              t(mc.node).parallel(t().by(time, {
                angle: 60
              }), t().to(time, {
                position: cc.v3(x, mc.node.y)
              }, {
                easing: "sineIn"
              })).call(function() {
                mc.node.removeFromParent();
                if (null != callBack) {
                  callBack();
                  callBack = null;
                }
              }).start();
            });
          }
          _this.outCards = [];
          _this.tabCards = [];
        }).start();
      };
      __decorate([ property(cc.Prefab) ], TableCards.prototype, "pCardBack", void 0);
      __decorate([ property(cc.Prefab) ], TableCards.prototype, "pCard", void 0);
      __decorate([ property([ cc.Node ]) ], TableCards.prototype, "ndHands", void 0);
      TableCards = __decorate([ ccclass ], TableCards);
      return TableCards;
    }(cc.Component);
    exports.default = TableCards;
    cc._RF.pop();
  }, {
    "./Common/Mgr/GameMgr": "GameMgr",
    "./Common/Mgr/PlayerMgr": "PlayerMgr",
    "./Definition/Constant/DefineConfig": "DefineConfig",
    "./MyCard": "MyCard",
    "./NFramework/NF": "NF",
    "./Platform/PlatformMgr": "PlatformMgr",
    "./RandomCardLogic": "RandomCardLogic"
  } ],
  TipsForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63aaeElLZdKcbZbTJRLJ/8A", "TipsForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFNotifications_1 = require("../../NFramework/Definition/NFNotifications");
    var NF_1 = require("../../NFramework/NF");
    var UIFormLogic_1 = require("../../NFramework/UI/UIFormLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TipsForm = function(_super) {
      __extends(TipsForm, _super);
      function TipsForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mLabTips = null;
        _this.mNodetips = null;
        return _this;
      }
      TipsForm.prototype.onLoad = function() {
        NF_1.default.UIUtils.AdaptWidget(this.node);
      };
      TipsForm.prototype.OnOpen = function(param) {
        var _this = this;
        _super.prototype.OnOpen.call(this, param);
        this.mNodetips.y = 0;
        if ("string" != typeof param) {
          this.node.getComponent(cc.BlockInputEvents).enabled = true;
          if (param) {
            var str_1 = ".";
            this.mLabTips.string = "Checking network, please wait" + str_1;
            this.times = setInterval(function() {
              str_1 = str_1.length >= 3 ? "." : str_1 + ".";
              _this.mLabTips.string = "Checking network, please wait" + str_1;
            }, 500);
          } else {
            if (this.times) {
              clearInterval(this.times);
              this.times = null;
            }
            this.mLabTips.string = "Please connect to the network and try again!";
            cc.tween(this.mNodetips).to(.5, {
              position: cc.v3(0, 120)
            }).delay(.2).call(function() {
              _this.node.opacity = 0;
              _this.Close();
            }).start();
          }
          this.node.opacity = 255;
        } else {
          this.node.getComponent(cc.BlockInputEvents).enabled = false;
          this.mLabTips.string = param;
          this.node.opacity = 0;
          this.node.stopAllActions();
          cc.tween(this.node).to(.2, {
            opacity: 255
          }).delay(1.5).to(.2, {
            opacity: 0
          }).call(function() {
            var data = {
              mAssetUrl: _this.AssetUrl,
              mIsClear: false
            };
            NF_1.default.Notify.Push(NFNotifications_1.NFNotifications.EventId_NFUIComponentBase, NFNotifications_1.NFNotifications.NFUICB_CloseFormName, data);
          }).start();
        }
      };
      TipsForm.prototype.OnClose = function() {
        if (this.times) {
          clearInterval(this.times);
          this.times = null;
        }
        this.node.opacity = 0;
        this.node.stopAllActions();
      };
      __decorate([ property(cc.Label) ], TipsForm.prototype, "mLabTips", void 0);
      __decorate([ property(cc.Node) ], TipsForm.prototype, "mNodetips", void 0);
      TipsForm = __decorate([ ccclass ], TipsForm);
      return TipsForm;
    }(UIFormLogic_1.default);
    exports.default = TipsForm;
    cc._RF.pop();
  }, {
    "../../NFramework/Definition/NFNotifications": "NFNotifications",
    "../../NFramework/NF": "NF",
    "../../NFramework/UI/UIFormLogic": "UIFormLogic"
  } ],
  TurntableForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "968f1uMwJBEh4pyP/wwAmMe", "TurntableForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NF_1 = require("../NFramework/NF");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var DefineConfig_1 = require("../Definition/Constant/DefineConfig");
    var PlayerMgr_1 = require("../Common/Mgr/PlayerMgr");
    var GameEnum_1 = require("../Definition/Constant/GameEnum");
    var NFNotifyMgr_1 = require("../NFramework/Notification/NFNotifyMgr");
    var UIFormLogic_1 = require("../NFramework/UI/UIFormLogic");
    var GameEntry_1 = require("../Common/Mgr/GameEntry");
    var PlatformMgr_1 = require("../Platform/PlatformMgr");
    var AdManger_1 = require("../Platform/AdManger");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TurntableForm = function(_super) {
      __extends(TurntableForm, _super);
      function TurntableForm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mNodeTruntable = null;
        _this.mNodeVideo = null;
        _this.mNodeTime = null;
        _this.mLabDesc = null;
        _this.mLabelTime = null;
        _this.mLabelTimes = null;
        _this.mLabelNum = [];
        _this.mRouletteInfos = [];
        _this.mWeights = [];
        _this.mCanSpin = false;
        _this.mSpining = false;
        _this.mCurRouletteInfo = null;
        _this.mCloseBtn = null;
        _this.mBtnSp = null;
        _this.mBtnIconSp = null;
        _this.mBtnTF = null;
        _this.mBtnIconArr = [];
        return _this;
      }
      TurntableForm.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.mRouletteInfos = NF_1.default.DataTables.GetAllInfos("RouletteInfo");
        NFNotifyMgr_1.default.GetInstance().Listen(GameEnum_1.EnumNotify.ABTest_Event, this.AbTestShow, this);
        this.AbTestShow();
      };
      TurntableForm.prototype.AbTestShow = function() {
        var nodeNums = NF_1.default.UIUtils.GetObjByPath(this.mNodeTruntable, "NodeNums");
        for (var index = 0; index < nodeNums.childrenCount; index++) {
          var element = nodeNums.children[index].getComponent(cc.Label);
          element.enableBold = true;
          this.mLabelNum.push(element);
          var info = this.mRouletteInfos[index];
          this.mWeights.push(info.mWeight);
        }
        this.mCloseBtn.top = 11.6;
        this.mCloseBtn.right = 12.14;
        this.mLabelTimes.enableBold = this.mBtnTF.enableBold = this.mLabDesc.enableBold = this.mLabelTime.enableBold = true;
        this.mBtnSp.color = cc.color(241, 207, 26, 255);
        this.mBtnIconSp.spriteFrame = this.mBtnIconArr[1];
      };
      TurntableForm.prototype.OnOpen = function(param) {
        _super.prototype.OnOpen.call(this, param);
        this.SetView();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SpinWinPage);
        NF_1.default.Audio.Play(2);
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopForm) && !GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
        }
      };
      TurntableForm.prototype.onEnable = function() {};
      TurntableForm.prototype.onDisable = function() {
        this.unscheduleAllCallbacks();
        NFNotifyMgr_1.default.GetInstance().UnListenByObj(this);
        if (GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopForm) && !GameEntry_1.default.UI.GetFormActive(GameEnum_1.UIFormId.ShopPreviewForm)) {
          AdManger_1.default.GetInstance().CloseAd(EnumMacros_1.AdsType.AT_Banner_Bottom);
          AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_Native_Banner_Bottom);
        }
      };
      TurntableForm.prototype.SetView = function() {
        this.ShowTime();
        for (var index = 0; index < this.mLabelNum.length; index++) {
          var element = this.mLabelNum[index];
          var info = this.mRouletteInfos[index];
          element.string = NF_1.default.String.ToBigNumberString(info.mReward);
        }
      };
      TurntableForm.prototype.ShowTime = function() {
        var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay);
        this.mLabelTimes.string = (DefineConfig_1.Constant.MaxTurntableTimesPerDay - times).toString();
        var mills = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableMillis);
        if (mills > 0) {
          times = times >= DefineConfig_1.Constant.TurntableCdTime.length ? DefineConfig_1.Constant.TurntableCdTime.length : times;
          this.mSpinInterval = 1e3 * DefineConfig_1.Constant.TurntableCdTime[times - 1] * 60;
          if (NF_1.default.Time.GetCurrentTimeMillis() - mills > this.mSpinInterval) {
            NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableMillis, 0);
            mills = 0;
          }
        }
        this.mCanSpin = 0 == mills;
        this.mNodeVideo.active = !this.mCanSpin;
        this.mNodeTime.active = !this.mCanSpin;
        if (mills > 0) {
          this.RefreshTime();
          this.schedule(this.RefreshTime, 1);
        }
      };
      TurntableForm.prototype.RefreshTime = function() {
        var millis = NF_1.default.Time.GetCurrentTimeMillis() - NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableMillis);
        millis = Math.floor((this.mSpinInterval - millis) / 1e3);
        if (millis < 0) {
          this.ResetTime();
          return;
        }
        this.mLabelTime.string = NF_1.default.Date.GetMinAndSec(millis);
      };
      TurntableForm.prototype.ResetTime = function() {
        this.unschedule(this.RefreshTime);
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableMillis, 0);
        this.ShowTime();
      };
      TurntableForm.prototype.OnBtnSpin = function() {
        var _this = this;
        if (this.mSpining || !this.mCanSpin) return;
        NF_1.default.BtnUtils.IsTouchEnd();
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.Spin);
        this.mSpining = true;
        var index = NF_1.default.Math.RandomByWeight(this.mWeights);
        var angele = 22.5 * index;
        angele = 360 * NF_1.default.Math.RandomInt(5, 8) + angele;
        NF_1.default.Debug.Log("Index is: " + index);
        this.mCurRouletteInfo = this.mRouletteInfos[index];
        NF_1.default.Debug.Log("Reward num is: " + this.mCurRouletteInfo.mReward);
        this.mNodeTruntable.angle = 0;
        cc.tween(this.mNodeTruntable).to(3, {
          angle: angele
        }, {
          easing: "sineOut"
        }).call(function() {
          _this.OnSpinEnd();
        }).start();
        this.mAngle = this.mNodeTruntable.angle;
      };
      TurntableForm.prototype.update = function(dt) {
        var off = Math.abs(this.mAngle - this.mNodeTruntable.angle);
        var nodeNums = NF_1.default.UIUtils.GetObjByPath(this.mNodeTruntable, "NodeNums");
        if (off >= 360 / nodeNums.childrenCount) {
          NF_1.default.Audio.Play(10);
          this.mAngle = this.mNodeTruntable.angle;
        }
      };
      TurntableForm.prototype.OnSpinEnd = function() {
        this.mSpining = false;
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SpinReward);
        var data = {
          mGold: this.mCurRouletteInfo.mReward,
          mExp: 0,
          mFunc: null,
          mScore: 0,
          mFormid: GameEnum_1.UIFormId.TurntableForm
        };
        GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.RewardForm, data);
        PlayerMgr_1.default.Instance.AddGold(this.mCurRouletteInfo.mReward);
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableMillis, NF_1.default.Time.GetCurrentTimeMillis());
        var times = NF_1.default.Storage.GetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay) + 1;
        NF_1.default.Storage.SetInt(DefineConfig_1.LocalStorageKey.TurntableTimesPerDay, times);
        NF_1.default.Notify.Notify(GameEnum_1.EnumNotify.EN_Refresh_HomeTurnTable);
        times < DefineConfig_1.Constant.MaxTurntableTimesPerDay ? this.ShowTime() : this.OnBtnClose();
      };
      TurntableForm.prototype.OnBtnClose = function() {
        if (this.mSpining) return;
        if (!NF_1.default.BtnUtils.IsTouchEnd()) return;
        _super.prototype.Close.call(this);
      };
      TurntableForm.prototype.OnBtnVideo = function() {
        var _this = this;
        NF_1.default.BtnUtils.IsTouchEnd(1);
        PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.SpinAd, "Network", PlatformMgr_1.default.GetInstance().GetNetwork());
        AdManger_1.default.GetInstance().ShowAd(EnumMacros_1.AdsType.AT_RewardVideo, "sp_002", function(status) {
          if (status == EnumMacros_1.CallBackStatus.CALL_SUCCESS) {
            PlatformMgr_1.default.GetInstance().OnEventCount(DefineConfig_1.EventName.spin_adsuc);
            _this.ResetTime();
            _this.OnBtnSpin();
          } else GameEntry_1.default.UI.OpenUIForm(GameEnum_1.UIFormId.TipsForm, "Video play failed, Please try again later!");
        });
      };
      __decorate([ property(cc.Node) ], TurntableForm.prototype, "mNodeTruntable", void 0);
      __decorate([ property(cc.Node) ], TurntableForm.prototype, "mNodeVideo", void 0);
      __decorate([ property(cc.Node) ], TurntableForm.prototype, "mNodeTime", void 0);
      __decorate([ property(cc.Label) ], TurntableForm.prototype, "mLabDesc", void 0);
      __decorate([ property(cc.Label) ], TurntableForm.prototype, "mLabelTime", void 0);
      __decorate([ property(cc.Label) ], TurntableForm.prototype, "mLabelTimes", void 0);
      __decorate([ property(cc.Widget) ], TurntableForm.prototype, "mCloseBtn", void 0);
      __decorate([ property(cc.Node) ], TurntableForm.prototype, "mBtnSp", void 0);
      __decorate([ property(cc.Sprite) ], TurntableForm.prototype, "mBtnIconSp", void 0);
      __decorate([ property(cc.Label) ], TurntableForm.prototype, "mBtnTF", void 0);
      __decorate([ property(cc.SpriteFrame) ], TurntableForm.prototype, "mBtnIconArr", void 0);
      TurntableForm = __decorate([ ccclass ], TurntableForm);
      return TurntableForm;
    }(UIFormLogic_1.default);
    exports.default = TurntableForm;
    cc._RF.pop();
  }, {
    "../Common/Mgr/GameEntry": "GameEntry",
    "../Common/Mgr/PlayerMgr": "PlayerMgr",
    "../Definition/Constant/DefineConfig": "DefineConfig",
    "../Definition/Constant/GameEnum": "GameEnum",
    "../NFramework/Definition/EnumMacros": "EnumMacros",
    "../NFramework/NF": "NF",
    "../NFramework/Notification/NFNotifyMgr": "NFNotifyMgr",
    "../NFramework/UI/UIFormLogic": "UIFormLogic",
    "../Platform/AdManger": "AdManger",
    "../Platform/PlatformMgr": "PlatformMgr"
  } ],
  UIBasePrefab: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87b71M8UTlCEZcsRPf6Ikoa", "UIBasePrefab");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../Definition/NFConstant");
    var NF_1 = require("../NF");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIBasePrefab = function(_super) {
      __extends(UIBasePrefab, _super);
      function UIBasePrefab() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mPrefabNodes = {};
        return _this;
      }
      UIBasePrefab.prototype.onLoad = function() {
        this.SerializableUIControlNode(this.node);
      };
      UIBasePrefab.prototype.onDestroy = function() {
        NF_1.default.Notify.UnListenByObj(this);
      };
      UIBasePrefab.prototype.SerializableUIControlNode = function(root) {
        if (!root) return;
        var children = root.children;
        for (var k in children) {
          var child = children[k];
          var name = child.name;
          if (-1 != NFConstant_1.default.FilterNodeName.indexOf(name)) continue;
          this.mPrefabNodes[name] = child;
          child.childrenCount >= 1 && this.SerializableUIControlNode(child);
        }
      };
      UIBasePrefab = __decorate([ ccclass ], UIBasePrefab);
      return UIBasePrefab;
    }(cc.Component);
    exports.default = UIBasePrefab;
    cc._RF.pop();
  }, {
    "../Definition/NFConstant": "NFConstant",
    "../NF": "NF"
  } ],
  UIComponentBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21b53lC+TxMybyHUm2fT08S", "UIComponentBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NFUIGroupZIndex = void 0;
    var EnumMacros_1 = require("../Definition/EnumMacros");
    var NFConstant_1 = require("../Definition/NFConstant");
    var NFNotifications_1 = require("../Definition/NFNotifications");
    var NFDictionary_1 = require("../Dictionary/NFDictionary");
    var NF_1 = require("../NF");
    var UIGroup_1 = require("./UIGroup");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var NFUIGroupZIndex;
    (function(NFUIGroupZIndex) {
      NFUIGroupZIndex[NFUIGroupZIndex["Default"] = 1e4] = "Default";
      NFUIGroupZIndex[NFUIGroupZIndex["Middle"] = 2e4] = "Middle";
      NFUIGroupZIndex[NFUIGroupZIndex["Front"] = 2e4] = "Front";
      NFUIGroupZIndex[NFUIGroupZIndex["Top"] = 2e4] = "Top";
      NFUIGroupZIndex[NFUIGroupZIndex["TopTop"] = 2e4] = "TopTop";
    })(NFUIGroupZIndex = exports.NFUIGroupZIndex || (exports.NFUIGroupZIndex = {}));
    var UIComponentBase = function(_super) {
      __extends(UIComponentBase, _super);
      function UIComponentBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mUIGroup = new NFDictionary_1.default();
        _this.mAllForm = {};
        _this.mCurZIndex = 0;
        return _this;
      }
      UIComponentBase.prototype.onLoad = function() {
        NF_1.default.Debug.Log("UIComponentBase onLoad");
        this.CreatUIGrop(EnumMacros_1.NFUIGroupName.Default, NFUIGroupZIndex.Default);
        this.CreatUIGrop(EnumMacros_1.NFUIGroupName.Middle, NFUIGroupZIndex.Middle);
        this.CreatUIGrop(EnumMacros_1.NFUIGroupName.Front, NFUIGroupZIndex.Front);
        this.CreatUIGrop(EnumMacros_1.NFUIGroupName.Top, NFUIGroupZIndex.Top);
        this.CreatUIGrop(EnumMacros_1.NFUIGroupName.TopTop, NFUIGroupZIndex.TopTop);
      };
      UIComponentBase.prototype.CreatUIGrop = function(gropName, zIndex) {
        var grop = new UIGroup_1.default();
        grop.mName = gropName;
        grop.mDepth = zIndex;
        grop.mNode = new cc.Node(grop.mName);
        this.node.addChild(grop.mNode);
        NF_1.default.UIUtils.AdaptWidget(grop.mNode);
        this.mUIGroup.Add(grop.mName, grop);
      };
      UIComponentBase.prototype.onEnable = function() {
        NF_1.default.Notify.Listen(NFNotifications_1.NFNotifications.EventId_NFUIComponentBase, this.OnNotify, this);
      };
      UIComponentBase.prototype.onDisable = function() {
        NF_1.default.Notify.UnListen(NFNotifications_1.NFNotifications.EventId_NFUIComponentBase, this);
      };
      UIComponentBase.prototype.OnNotify = function(event) {
        switch (event.mEventType) {
         case NFNotifications_1.NFNotifications.NFUICB_CloseFormName:
          var data = event.mUserData;
          this.CloseFormName(data.mAssetUrl, data.mIsClear);
        }
      };
      UIComponentBase.prototype.OpenUIForm = function(formId, param, bundleName, callback) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        void 0 === callback && (callback = null);
        var info = NF_1.default.DataTables.GetInfoById("UIFormInfo", formId);
        if (!info) {
          NF_1.default.Debug.Log("\u6ca1\u6709\u8fd9\u4e2a\u754c\u9762: ID" + formId);
          return;
        }
        var assetUrl = this.GetPrefabsPath(info.mAssetName, info.mModuleName);
        this.LoadForm(assetUrl, param, info.mUIGroupName, bundleName, callback);
      };
      UIComponentBase.prototype.OpenView = function(assetUrl, param, bundleName, group, callback) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        void 0 === group && (group = EnumMacros_1.NFUIGroupName.Default);
        void 0 === callback && (callback = null);
        this.LoadForm(assetUrl, param, group, bundleName, callback);
      };
      UIComponentBase.prototype.LoadForm = function(assetUrl, param, groupName, bundleName, callback) {
        var _this = this;
        void 0 === groupName && (groupName = EnumMacros_1.NFUIGroupName.Default);
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        void 0 === callback && (callback = null);
        if (null != this.mAllForm[assetUrl]) {
          var form = this.mAllForm[assetUrl];
          form.active = true;
          this.GetScriptHan(assetUrl, "OnOpen", param);
          form.zIndex = this.mCurZIndex;
          this.mCurZIndex++;
        } else {
          var self_1 = this;
          NF_1.default.ResLoad.LoadBundleRes(bundleName, assetUrl, function(prefab) {
            if (null != prefab) {
              var newNode = cc.instantiate(prefab);
              var groupNode = null;
              var mUIGroup = self_1.mUIGroup.TryGetValue(groupName);
              null != mUIGroup ? groupNode = mUIGroup.mNode : NF_1.default.Debug.Error("mUIGroup is null");
              if (null != groupNode) {
                groupNode.addChild(newNode);
                self_1.mAllForm[assetUrl] = newNode;
                var script = self_1.GetScriptHan(assetUrl, "OnOpen", param);
                script.AssetUrl = assetUrl;
                script.BundleName = bundleName;
                newNode.zIndex = _this.mCurZIndex;
                self_1.mCurZIndex++;
              }
              callback && callback();
            }
          });
        }
      };
      UIComponentBase.prototype.CloseForm = function(formId, isClear) {
        void 0 === isClear && (isClear = false);
        var info = NF_1.default.DataTables.GetInfoById("UIFormInfo", formId);
        if (!info) {
          NF_1.default.Debug.Log("\u6ca1\u6709\u8fd9\u4e2a\u754c\u9762: ID" + formId);
          return;
        }
        var assetUrl = this.GetPrefabsPath(info.mAssetName, info.mModuleName);
        this.CloseFormName(assetUrl, isClear);
      };
      UIComponentBase.prototype.CloseFormName = function(assetUrl, isClear) {
        void 0 === isClear && (isClear = false);
        var form = this.mAllForm[assetUrl];
        if (form && form.active) {
          form.active = false;
          this.GetScriptHan(assetUrl, "OnClose");
          if (isClear) {
            form.destroy();
            this.mAllForm[assetUrl] = null;
          }
        }
      };
      UIComponentBase.prototype.CloseBundleForms = function(bundleName, isClear) {
        void 0 === bundleName && (bundleName = NFConstant_1.default.DefaultBundleName);
        void 0 === isClear && (isClear = false);
        for (var key in this.mAllForm) {
          var form = this.mAllForm[key];
          var script = form.getComponent(form.name);
          script.BundleName == bundleName && this.CloseFormName(script.AssetUrl, isClear);
        }
      };
      UIComponentBase.prototype.GetForm = function(formId) {
        var info = NF_1.default.DataTables.GetInfoById("UIFormInfo", formId);
        if (!info) {
          NF_1.default.Debug.Log("\u6ca1\u6709\u8fd9\u4e2a\u754c\u9762: ID" + formId);
          return;
        }
        var assetUrl = this.GetPrefabsPath(info.mAssetName, info.mModuleName);
        if (null != this.mAllForm[assetUrl]) return this.mAllForm[assetUrl];
      };
      UIComponentBase.prototype.GetFormByUrl = function(assetUrl) {
        if (null != this.mAllForm[assetUrl]) return this.mAllForm[assetUrl];
        return null;
      };
      UIComponentBase.prototype.GetScriptHan = function(assetUrl, callName, param) {
        var node = this.mAllForm[assetUrl];
        var script = node.getComponent(node.name);
        if (script) if ("OnClose" == callName) {
          script.OnClose();
          NF_1.default.Debug.Log("Close from: " + node.name);
        } else {
          script.OnOpen(param);
          NF_1.default.Debug.Log("Open form: " + node.name);
        }
        return script;
      };
      UIComponentBase.prototype.GetPrefabsPath = function(name, model) {
        return "UI/" + model + "/Prefabs/" + name;
      };
      UIComponentBase.prototype.HadShowForm = function(formId) {
        var form = this.GetForm(formId);
        if (form && form.active) return true;
        return false;
      };
      UIComponentBase = __decorate([ ccclass, menu("NFramework/UIComponentBase") ], UIComponentBase);
      return UIComponentBase;
    }(cc.Component);
    exports.default = UIComponentBase;
    cc._RF.pop();
  }, {
    "../Definition/EnumMacros": "EnumMacros",
    "../Definition/NFConstant": "NFConstant",
    "../Definition/NFNotifications": "NFNotifications",
    "../Dictionary/NFDictionary": "NFDictionary",
    "../NF": "NF",
    "./UIGroup": "UIGroup"
  } ],
  UIComponentMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "603a4vmBBRAHYJ7c5Yf/+CI", "UIComponentMgr");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIComponentBase_1 = require("../../NFramework/UI/UIComponentBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIComponentMgr = function(_super) {
      __extends(UIComponentMgr, _super);
      function UIComponentMgr() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIComponentMgr.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        cc.game.addPersistRootNode(this.node);
      };
      UIComponentMgr.prototype.GetFormActive = function(formId) {
        var node = this.GetForm(formId);
        if (!node) return false;
        return node.active;
      };
      UIComponentMgr = __decorate([ ccclass ], UIComponentMgr);
      return UIComponentMgr;
    }(UIComponentBase_1.default);
    exports.default = UIComponentMgr;
    cc._RF.pop();
  }, {
    "../../NFramework/UI/UIComponentBase": "UIComponentBase"
  } ],
  UIFormLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1b3b448tepNnLk4Rh+DWR+g", "UIFormLogic");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NFConstant_1 = require("../Definition/NFConstant");
    var NFNotifications_1 = require("../Definition/NFNotifications");
    var NF_1 = require("../NF");
    var UIBasePrefab_1 = require("./UIBasePrefab");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIFormLogic = function(_super) {
      __extends(UIFormLogic, _super);
      function UIFormLogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mBundleName = NFConstant_1.default.DefaultBundleName;
        _this.mAssetUrl = "";
        _this.mAnimatonNode = null;
        _this.mBg = null;
        _this.mCanClickScreen = false;
        _this.mTweenOpen = null;
        return _this;
      }
      Object.defineProperty(UIFormLogic.prototype, "BundleName", {
        get: function() {
          return this.mBundleName;
        },
        set: function(v) {
          this.mBundleName = v;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UIFormLogic.prototype, "AssetUrl", {
        get: function() {
          return this.mAssetUrl;
        },
        set: function(v) {
          this.mAssetUrl = v;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(UIFormLogic.prototype, "CanClickScreen", {
        get: function() {
          return this.mCanClickScreen;
        },
        enumerable: false,
        configurable: true
      });
      UIFormLogic.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        NF_1.default.UIUtils.AdaptWidget(this.node);
        this.mBg = this.node.getChildByName("mBg");
        if (this.mBg && this.mBg.active) {
          NF_1.default.UIUtils.AdaptWidget(this.mBg);
          NF_1.default.UIUtils.BlockInputEvents(this.mBg);
          this.mCanClickScreen && this.mBg.on(cc.Node.EventType.TOUCH_END, this.OnClickScreen, this);
        }
      };
      UIFormLogic.prototype.onDestroy = function() {};
      UIFormLogic.prototype.onEnable = function() {};
      UIFormLogic.prototype.onDisable = function() {};
      UIFormLogic.prototype.OnOpen = function(param) {
        this.mCanClickScreen = true;
        this.ShowOpenAnimation();
      };
      UIFormLogic.prototype.OnClose = function() {};
      UIFormLogic.prototype.Close = function(event) {
        void 0 === event && (event = null);
        if (event && !NF_1.default.BtnUtils.IsTouchEnd()) return;
        var data = {
          mAssetUrl: this.mAssetUrl,
          mIsClear: false
        };
        NF_1.default.Notify.Push(NFNotifications_1.NFNotifications.EventId_NFUIComponentBase, NFNotifications_1.NFNotifications.NFUICB_CloseFormName, data);
      };
      UIFormLogic.prototype.ShowOpenAnimation = function() {
        if (this.mAnimatonNode) {
          this.mCanClickScreen = false;
          this.mAnimatonNode.scale = 0;
          this.mTweenOpen || (this.mTweenOpen = cc.tween(this.mAnimatonNode).to(.2, {
            scale: 1
          }, {
            easing: "backOut"
          }).call(this.OpenAnimationEnd, this));
          this.mTweenOpen.start();
        }
      };
      UIFormLogic.prototype.OpenAnimationEnd = function() {
        this.mCanClickScreen = true;
      };
      UIFormLogic.prototype.OnClickScreen = function() {
        if (!this.mCanClickScreen || !NF_1.default.BtnUtils.IsTouchEnd()) return;
        this.Close();
      };
      UIFormLogic.prototype.SetCanClickScreen = function(node) {
        this.mCanClickScreen = true;
        node && NF_1.default.UIUtils.BlockInputEvents(node);
      };
      UIFormLogic = __decorate([ ccclass ], UIFormLogic);
      return UIFormLogic;
    }(UIBasePrefab_1.default);
    exports.default = UIFormLogic;
    cc._RF.pop();
  }, {
    "../Definition/NFConstant": "NFConstant",
    "../Definition/NFNotifications": "NFNotifications",
    "../NF": "NF",
    "./UIBasePrefab": "UIBasePrefab"
  } ],
  UIGroup: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2873aYycodLZoZOkiMGg6Cd", "UIGroup");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIGroup = function() {
      function UIGroup() {
        this.mName = "";
        this.mDepth = 0;
        this.mNode = null;
      }
      UIGroup = __decorate([ ccclass ], UIGroup);
      return UIGroup;
    }();
    exports.default = UIGroup;
    cc._RF.pop();
  }, {} ],
  WebAdManger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1556/HAzlBRKkLzWwS7A8x", "WebAdManger");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseInstance_1 = require("../NFramework/Base/BaseInstance");
    var EnumMacros_1 = require("../NFramework/Definition/EnumMacros");
    var WebAdManger = function(_super) {
      __extends(WebAdManger, _super);
      function WebAdManger() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.VideoUrl = "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video&client=ca-games-pub-6877195875453822&description_url=https%3A%2F%2Fcb1.callbreakmaster.fun%2Fh5%2Fcb1%2Findex.html&videoad_start_delay=0&max_ad_duration=30000";
        _this.InterstitialUrl = "https://googleads.g.doubleclick.net/pagead/ads?ad_type=image&client=ca-games-pub-6877195875453822&description_url=https%3A%2F%2Fcb1.callbreakmaster.fun%2Fh5%2Fcb1%2Findex.html&videoad_start_delay=0&max_ad_duration=30000";
        _this.BannerUrl = "https://googleads.g.doubleclick.net/pagead/ads?ad_type=text&client=ca-games-pub-6877195875453822&description_url=https%3A%2F%2Fcb1.callbreakmaster.fun%2Fh5%2Fcb1%2Findex.html&videoad_start_delay=0&max_ad_duration=30000";
        return _this;
      }
      WebAdManger.prototype.Init = function() {
        this.advertiseDiv = document.getElementById("advertise");
        var gameDiv = document.getElementById("GameDiv");
        if (!this.advertiseDiv) {
          this.advertiseDiv = document.createElement("div");
          this.advertiseDiv.id = "advertise";
          this.advertiseDiv.style.border = "0";
          this.advertiseDiv.style.position = "absolute";
          this.advertiseDiv.style.left = "0";
          this.advertiseDiv.style.right = "0";
          this.advertiseDiv.style.top = "0";
          this.advertiseDiv.style.bottom = "0";
          this.advertiseDiv.style.visibility = "hidden";
          gameDiv.appendChild(this.advertiseDiv);
        }
        this.videoContent = document.createElement("video");
        var contentDiv = document.createElement("div");
        contentDiv.id = "contentDiv";
        contentDiv.style.display = "none";
        contentDiv.appendChild(this.videoContent);
        this.adContainerDiv = document.createElement("div");
        this.adContainerDiv.id = "adContainerDiv";
        this.adContainerDiv.style.position = "absolute";
        this.adContainerDiv.style.left = "0px";
        this.adContainerDiv.style.top = "0px";
        this.advertiseDiv.appendChild(contentDiv);
        this.advertiseDiv.appendChild(this.adContainerDiv);
      };
      WebAdManger.prototype.ShowAd = function(type, placeId) {
        void 0 === placeId && (placeId = "");
        if (this.mType == EnumMacros_1.AdsType.AT_Interstitial && type == EnumMacros_1.AdsType.AT_Interstitial || this.mType == EnumMacros_1.AdsType.AT_RewardVideo && type == EnumMacros_1.AdsType.AT_RewardVideo) return;
        var size = cc.view.getFrameSize();
        var width = size.width;
        var height = size.height;
        this.mType = type;
        switch (type) {
         case EnumMacros_1.AdsType.AT_Banner_Bottom:
         case EnumMacros_1.AdsType.AT_Native_Banner_Bottom:
          this.advertiseDiv.style.backgroundColor = "transparent";
          this.adTagUrl = this.BannerUrl;
          height = 64;
          break;

         case EnumMacros_1.AdsType.AT_Interstitial:
          this.advertiseDiv.style.backgroundColor = "#000";
          this.adTagUrl = this.InterstitialUrl;
          break;

         case EnumMacros_1.AdsType.AT_RewardVideo:
          this.adTagUrl = this.VideoUrl;
        }
        if (!this.adTagUrl) return;
        this.linearAdSlotWidth = width;
        this.linearAdSlotHeight = height;
        this.nonLinearAdSlotWidth = width;
        this.nonLinearAdSlotHeight = height;
        if (type == EnumMacros_1.AdsType.AT_Banner_Bottom || type == EnumMacros_1.AdsType.AT_Native_Banner_Bottom) {
          this.linearAdSlotWidth = width;
          this.linearAdSlotHeight = 90;
          this.nonLinearAdSlotWidth = width;
          this.nonLinearAdSlotHeight = 90;
        }
        window["google"] ? this.requestAds() : this.setupUIForContent();
      };
      WebAdManger.prototype.requestAds = function() {
        this.adDisplayContainer && this.adDisplayContainer.destroy();
        this.adContainerDiv.innerHTML = "";
        this.adDisplayContainer = new window["google"].ima.AdDisplayContainer(this.adContainerDiv);
        this.adDisplayContainer.initialize();
        this.adsLoader = new window["google"].ima.AdsLoader(this.adDisplayContainer);
        this.adsLoader.addEventListener(window["google"].ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);
        this.adsLoader.addEventListener(window["google"].ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);
        var adsRequest = new window["google"].ima.AdsRequest();
        adsRequest.adTagUrl = this.adTagUrl;
        adsRequest.linearAdSlotWidth = this.linearAdSlotWidth;
        adsRequest.linearAdSlotHeight = this.linearAdSlotHeight;
        adsRequest.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
        adsRequest.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
        this.adsLoader.requestAds(adsRequest);
      };
      WebAdManger.prototype.onAdsManagerLoaded = function(adsManagerLoadedEvent) {
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.videoContent);
        this.adsManager.addEventListener(window["google"].ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAdEvent.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.LOADED, this.onAdEvent.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.STARTED, this.onAdEvent.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.COMPLETE, this.onAdEvent.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.SKIPPED, this.onAdEvent.bind(this));
        this.adsManager.addEventListener(window["google"].ima.AdEvent.Type.USER_CLOSE, this.onAdEvent.bind(this));
        try {
          this.adsManager.init(this.linearAdSlotWidth, this.linearAdSlotHeight, window["google"].ima.ViewMode.NORMAL);
          this.adsManager.start();
        } catch (adError) {}
      };
      WebAdManger.prototype.onAdEvent = function(adEvent) {
        var _this = this;
        var ad = adEvent.getAd();
        cc.log("ad:" + JSON.stringify(ad));
        switch (adEvent.type) {
         case window["google"].ima.AdEvent.Type.LOADED:
          !ad.isLinear();
          console.log("===========");
          console.log(ad);
          console.log("ad.g.contentType:" + ad.h.contentType);
          var contentType = ad.h.contentType;
          var height = ad.h.height;
          this.setupUIForAds(contentType, height);
          break;

         case window["google"].ima.AdEvent.Type.STARTED:
          ad.isLinear() && (this.intervalTimer = setInterval(function() {
            var remainingTime = _this.adsManager.getRemainingTime();
          }, 300));
          break;

         case window["google"].ima.AdEvent.Type.COMPLETE:
          ad.isLinear() && clearInterval(this.intervalTimer);
          this.setupUIForContent("COMPLETE");
          break;

         case window["google"].ima.AdEvent.Type.SKIPPED:
          this.setupUIForContent("SKIPPED");
          break;

         case window["google"].ima.AdEvent.Type.USER_CLOSE:
          this.setupUIForContent("USER_CLOSE");
          break;

         case window["google"].ima.AdEvent.Type.CLICK:
          break;

         case window["google"].ima.AdErrorEvent.Type.AD_ERROR:
          console.log("AD_ERROR");
          this.setupUIForContent("AD_ERROR");
        }
      };
      WebAdManger.prototype.onAdError = function(adErrorEvent) {
        this.setupUIForContent(adErrorEvent);
        console.log(adErrorEvent.getError());
      };
      WebAdManger.prototype.onContentPauseRequested = function() {
        this.setupUIForAds(null, 0);
      };
      WebAdManger.prototype.onContentResumeRequested = function() {
        this.setupUIForContent();
      };
      WebAdManger.prototype.setupUIForAds = function(contentType, height) {
        if ("text" != contentType && 60 == height) {
          this.setupUIForContent();
          return;
        }
        if ("text" == contentType) {
          console.log(contentType);
          var x = cc.view.getFrameSize().width + "px";
          this.advertiseDiv.style.height = "63px";
          this.advertiseDiv.style.width = x;
          var y = cc.view.getFrameSize().height - 80 + "px";
          this.advertiseDiv.style.top = y;
        } else {
          this.advertiseDiv.style.height = "";
          this.advertiseDiv.style.top = "0";
        }
        this.advertiseDiv.style.visibility = "visible";
      };
      WebAdManger.prototype.setupUIForContent = function(adErrorEvent) {
        void 0 === adErrorEvent && (adErrorEvent = null);
        console.log(" ad over status " + adErrorEvent);
        this.advertiseDiv.style.visibility = "hidden";
      };
      WebAdManger.prototype.CloseAd = function(type) {};
      return WebAdManger;
    }(BaseInstance_1.default);
    exports.default = WebAdManger;
    cc._RF.pop();
  }, {
    "../NFramework/Base/BaseInstance": "BaseInstance",
    "../NFramework/Definition/EnumMacros": "EnumMacros"
  } ],
  WifiOpenForm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "56e4eXgzTxIaa/TkeTwzVkx", "WifiOpenForm");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIFormLogic_1 = require("./NFramework/UI/UIFormLogic");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WifiOpenForm = function(_super) {
      __extends(WifiOpenForm, _super);
      function WifiOpenForm() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      WifiOpenForm.prototype.start = function() {};
      WifiOpenForm = __decorate([ ccclass ], WifiOpenForm);
      return WifiOpenForm;
    }(UIFormLogic_1.default);
    exports.default = WifiOpenForm;
    cc._RF.pop();
  }, {
    "./NFramework/UI/UIFormLogic": "UIFormLogic"
  } ],
  "use_v2.0.x_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "763c2z18ppKj5e3cIP5ulFd", "use_v2.0.x_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_check = true);
    cc._RF.pop();
  }, {} ]
}, {}, [ "BidBoard", "BidForm", "BidModelHelpForm", "BidModelStartForm", "Bot", "CardBack", "CalculateScoreMgr", "DealCardsMgr", "GameDataMgr", "GameEntry", "GameMgr", "PlayerMgr", "SkinMgr", "StaticEventMgr", "UIComponentMgr", "ConfirmForm", "LevelUpForm", "NFBannerForm", "NFNativeBannerForm", "RewardForm", "SeeCardAdForm", "SeeCardBuyForm", "TipsForm", "Deal", "DefineConfig", "GameEnum", "ExitForm", "FakeGameForm", "GameData", "GameHeadItem", "GiveScoreForm", "HomeForm", "CardsNoteForm", "FreeCoinsForm", "HeadItem", "HeadSelectForm", "SelectRoomForm", "SelectRoomItem", "SettingForm", "ShopConfirmForm", "ShopDiscountForm", "ShopForm", "ShopFreeTrialForm", "ShopItem", "ShopPreviewForm", "ShopResultForm", "TurntableForm", "MyCard", "NFAudioManager", "NFSoundInfoBase", "BaseEntry", "BaseInstance", "NFConfig", "NFDebug", "NFDataTables", "NFLocalStorage", "ActionName", "EnumMacros", "NFConstant.NetKey", "NFConstant", "NFNotifications", "NFDictionary", "NFHotUpdateMgr", "NFLanguageComponent", "NFLanguageLabel", "NFLanguageMgr", "NFLanguageType", "NFModelBase", "NF", "NFNetData", "NFPackBase", "NFProtoMap", "NFCommandDelegate", "NFCommandService", "NFHttpService", "NFScoketService", "NFNotifyMgr", "JniComponent", "KwaiGameComponent", "NFBasePlatformMgr", "PlatformInterface", "NFResLoad", "NFUIFormInfoBase", "UIBasePrefab", "UIComponentBase", "UIFormLogic", "UIGroup", "NFArrayUtils", "NFMathUtils", "Base64", "NFIdentifyUtils", "NFStringUtils", "NFDateUtils", "NFTimeUtils", "NFTimer", "NFCaptrueMgr", "NFCaptureToNative", "NFCaptureToWeb", "NFTextureRenderBase", "NFBtnUtils", "NFUIUtils", "ScrollItem", "ScrollList", "ScrollViewPlus", "ScrollViewPlusItem", "AdManger", "PlatformMgr", "WebAdManger", "RandomCardLogic", "RedCircle", "ScoreBoardForm", "SingleGameController", "TableBack", "TableCards", "WifiOpenForm", "use_v2.0.x_cc.Toggle_event" ]);