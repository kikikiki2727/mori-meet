export const useVonage = async (options) => {
  const OT = await import("@opentok/client");

  // 引数
  const sessionId: string = options.sessionId;
  const apiKey: string = options.vonageApiKey;
  const token: string = options.sessionToken;

  const videoInsertId = "videos";

  // オブジェクト、オプション
  let sessionObj: OT.Session;
  const subscribeOpts: OT.SubscriberProperties = {
    fitMode: "contain",
    insertMode: "append",
    style: {
      audioBlockedDisplayMode: "off",
      audioLevelDisplayMode: "off",
      buttonDisplayMode: "off",
      nameDisplayMode: "on",
      videoDisabledDisplayMode: "off",
    },
  };

  let publisherObj: OT.Publisher;
  const publisherOpts: OT.PublisherProperties = {
    fitMode: "cover",
    insertMode: "append",
    name: "",
    style: {
      audioLevelDisplayMode: "off",
      archiveStatusDisplayMode: "off",
      buttonDisplayMode: "off",
      nameDisplayMode: "on",
    },
    // width: "auto",
    // height: "100%",
  };

  let screenSharingObj: OT.Publisher;
  const screenSharingOpts: OT.PublisherProperties = {
    videoSource: "screen",
    fitMode: "cover",
    insertMode: "append",
    name: "",
    style: {
      audioLevelDisplayMode: "off",
      archiveStatusDisplayMode: "off",
      buttonDisplayMode: "off",
      nameDisplayMode: "on",
    },
  };

  // フラグ
  const isShareScreen = ref(false);

  /**
   * セッションオブジェクト初期化
   */
  const initSession = () => {
    sessionObj = OT.initSession(apiKey, sessionId);
    sessionObj.on(
      "streamCreated",
      (e) => {
        console.log("streamCreated", e);
        sessionObj.subscribe(e.stream, videoInsertId, subscribeOpts);
        if (e.stream.videoType === "screen") isShareScreen.value = true;
      },
      this
    );
    sessionObj.on("streamDestroyed", (e) => {
      console.log("streamDestroyed", e);
      if (e.stream.videoType === "screen") isShareScreen.value = false;
    });
    sessionObj.on("sessionConnected", (e) => {
      console.log("sessionConnected", e);
    });
    sessionObj.on("sessionDisconnected", (e) => {
      console.log("sessionDisconnected", e);
    });
    sessionObj.on("connectionCreated", (e) => {
      console.log("connectionCreated", e);
    });
    sessionObj.on("connectionDestroyed", (e) => {
      console.log("connectionDestroyed", e);
    });
    console.log(sessionObj);
  };

  /**
   * publisherオブジェクト初期化
   */
  const initPublisher = () => {
    publisherObj = OT.initPublisher("videos", publisherOpts, (e) => {
      if (e) {
        console.error("error", e);
        throw Error;
      } else {
        console.log("success initPublisher");
      }
    });
  };

  /**
   * sessionに接続
   */
  const connectSession = () => {
    sessionObj.connect(token, (e) => {
      if (e) {
        console.log("error", e);
      } else {
        console.log("success session connect");
        sessionObj.publish(publisherObj, (e) => {
          if (e) {
            console.error("error", e);
            throw Error;
          } else {
            console.log("success publish");
          }
        });
      }
    });
  };

  /**
   * sessionから切断
   */
  const sessionDisconnect = () => {
    sessionObj.disconnect();
    publisherObj.destroy();
  };

  /**
   * 画面共有
   */
  const shareScreen = () => {
    if (isShareScreen.value) {
      console.log("すでに画面共有されています");
      return;
    }
    OT.checkScreenSharingCapability((res) => {
      if (!res.supported || res.extensionRegistered === false) {
        console.log("res", res);
        console.error("このブラウザはサポートされていません");
        return;
        // throw Error;
      }
      console.log("res", res);
      screenSharingObj = OT.initPublisher(
        videoInsertId,
        screenSharingOpts,
        (e) => {
          if (e) {
            console.error("error", e);
            throw Error;
          } else {
            console.log("success initPublisher");
            sessionObj.publish(screenSharingObj, (e) => {
              if (e) {
                console.error("error", e);
                throw Error;
              } else {
                isShareScreen.value = true;
                console.log("success publish");
              }
            });
          }
        }
      );
      screenSharingObj.on("streamDestroyed", (e) => {
        console.log("screen publisher: streamDestroyed", e);
        isShareScreen.value = false;
      });
    });
  };

  /**
   * マイクオンオフ
   * @param {boolean} audioFlag
   */
  const toggleAudio = (audioFlag: boolean) => {
    publisherObj.publishAudio(audioFlag);
  };

  /**
   * ビデオオンオフ
   * @param {boolean} videoFlag
   */
  const toggleVideo = (videoFlag: boolean) => {
    publisherObj.publishVideo(videoFlag);
  };

  return {
    initSession,
    initPublisher,
    connectSession,
    sessionDisconnect,
    shareScreen,
    toggleAudio,
    toggleVideo,
  };
};
