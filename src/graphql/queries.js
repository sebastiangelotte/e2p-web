/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserData = `query GetUserData($id: ID!) {
  getUserData(id: $id) {
    id
    courses
  }
}
`;
export const listUserDatas = `query ListUserDatas(
  $filter: ModelUserDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      courses
    }
    nextToken
  }
}
`;
