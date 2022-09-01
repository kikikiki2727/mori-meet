export const useVonage = async (options) => {
  const OT = await import("@opentok/client");

  // 引数
  const apiKey: string = options.apiKey;
  const sessionId: string = options.sessionId;

  const videoInsertId = "videos";

  // オブジェクト、オプション
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

  const sessionObj = ref<OT.Session>();
  const publisherObj = ref<OT.Publisher>();

  /**
   * セッションオブジェクト初期化
   */
  const initSession = () => {
    sessionObj.value = OT.initSession(apiKey, sessionId)
      .on(
        "streamCreated",
        (e) => {
          console.log("streamCreated", e);
          sessionObj.value.subscribe(e.stream, videoInsertId, subscribeOpts);
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
    console.log(sessionObj.value);
  };

  /**
   * publisherオブジェクト初期化
   */
  const initPublisher = () => {
    publisherObj.value = OT.initPublisher("videos", publisherOpts, (e) => {
      if (e) {
        console.error("error", e);
        throw Error;
      } else {
        console.log("success initPublisher");
      }
    });
  };

  /**
   * マイクオンオフ
   * @param {boolean} audioFlag
   */
  const toggleAudio = (audioFlag: boolean) => {
    publisherObj.value.publishAudio(audioFlag);
  };

  /**
   * ビデオオンオフ
   * @param {boolean} videoFlag
   */
  const toggleVideo = (videoFlag: boolean) => {
    publisherObj.value.publishVideo(videoFlag);
  };

  return {
    initSession,
    initPublisher,
    toggleAudio,
    toggleVideo,
  };
};
