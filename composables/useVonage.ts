export const useVonage = async (options) => {
  const OT = await import("@opentok/client");

  // 引数
  const sessionId: string = options.sessionId;
  const apiKey: string = options.vonageApiKey;
  const token: string = options.sessionToken;

  const videoInsertId = "videos";

  // オブジェクト、オプション
  // const publisherObj = ref<OT.Publisher>();
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
    // width: "100%",
    // height: "100%",
  };

  // const sessionObj = ref<OT.Session>();
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

  /**
   * セッションオブジェクト初期化
   */
  const initSession = () => {
    sessionObj = OT.initSession(apiKey, sessionId)
      .on(
        "streamCreated",
        (e) => {
          console.log("streamCreated", e);
          sessionObj.subscribe(e.stream, videoInsertId, subscribeOpts);
        },
        this
      )
      .on("streamDestroyed", (e) => {
        console.log("streamDestroyed", e);
      })
      .on("sessionConnected", (e) => {
        console.log("sessionConnected", e);
      })
      .on("sessionDisconnected", (e) => {
        console.log("sessionDisconnected", e);
      })
      .on("connectionCreated", (e) => {
        console.log("connectionCreated", e);
      })
      .on("connectionDestroyed", (e) => {
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
    toggleAudio,
    toggleVideo,
  };
};
