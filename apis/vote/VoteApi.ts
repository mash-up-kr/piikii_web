import instance from "@/apis/instance";
import { AxiosInstance } from "axios";
import { ResponseForm } from "../common/model";
import {
  VoteDeadlineSetRequestDto,
  VotePlaceResponseDto,
  VotePlacesResponseDto,
  VoteResultResponseDto,
  VoteSaveRequestDto,
  VoteStatusResponseDto,
} from "./types/dto";

class VoteApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getVotes = async ({
    roomUid,
  }: {
    roomUid: string;
  }): Promise<ResponseForm<VoteResultResponseDto>> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/rooms/${roomUid}/votes`,
    });
    return data;
  };

  getVoteStatus = async ({
    roomUid,
  }: {
    roomUid: string;
  }): Promise<ResponseForm<VoteStatusResponseDto>> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/rooms/${roomUid}/votes/status`,
    });
    return data;
  };

  getUserVoteResult = async ({
    roomUid,
    userUid,
  }: {
    roomUid: string;
    userUid: string;
  }): Promise<ResponseForm<VotePlacesResponseDto>> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/rooms/${roomUid}/votes/user/${userUid}`,
    });
    return data;
  };

  postVote = async ({
    roomUid,
    payload,
  }: {
    roomUid: string;
    payload: VoteSaveRequestDto;
  }): Promise<ResponseForm> => {
    const { data } = await this.axios({
      method: "POST",
      url: `/rooms/${roomUid}/votes`,
      data: payload,
    });
    return data;
  };

  patchVoteDeadline = async ({
    roomUid,
    payload,
  }: {
    roomUid: string;
    payload: VoteDeadlineSetRequestDto;
  }): Promise<ResponseForm> => {
    const { data } = await this.axios({
      method: "PATCH",
      url: `/rooms/${roomUid}/votes/deadline`,
      data: payload,
    });
    return data;
  };
}

const voteApi = new VoteApi();

export default voteApi;
