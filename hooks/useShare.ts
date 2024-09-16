export type ShareDataType = {
  url: string;
  text?: string;
  title?: string;
  files?: File[];
};

const useShare = () => {
  const isShareSupported = () => navigator?.share ?? false;

  const copyToClipboard = (text: string, callback?: () => void) => {
    navigator.clipboard?.writeText(text).then(() => {
      callback && callback();
    });
  };

  /**
   * Only Mobile && https
   * @param data
   */
  const onShare = async (data: ShareDataType) => {
    if (isShareSupported()) {
      await window.navigator?.share({
        ...data,
        title: `📮 함께 온 메세지 ‘${data.title}’에 초대합니다. 💌`,
      });
    } else {
      copyToClipboard(data?.url, () =>
        alert("링크를 클립보드에 복사했습니다 :)")
      );
    }
  };

  return {
    onShare,
  };
};

export default useShare;
