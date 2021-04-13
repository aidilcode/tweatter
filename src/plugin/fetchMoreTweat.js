import axiosInstance from "@/plugin/axios";

function fetchMoreTweat(after, pause) {
  if (!after) return null;

  // check if pause break is done after fetching data
  if (pause < Date.now()) {
    const response = axiosInstance({
      method: "get",
      url: after,
    })

    return response
  }
}

export default fetchMoreTweat;
