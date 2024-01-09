import { ObjectId, WithId } from "mongodb";
// import { refreshTokensBlacklistedCollection } from "../../db";
import {refreshTokensBlacklistedCollection} from "../../index";
export const authQueryRepository = {
  async findBlacklistedUserRefreshTokenById(
    userId: ObjectId,
    refreshToken: string
  ): Promise<undefined | string> {
    const foundRefreshToken = await refreshTokensBlacklistedCollection.findOne({
      _id: userId,
    });
    if(!foundRefreshToken){
      return undefined
    }
    return foundRefreshToken?.refreshTokensArray.find((el:any)=> el === refreshToken );
  },
};