/**
 * User model
 * User 객체의 타입을 정의해 놓은 인터페이스입니다.
 * 필요에 따라 수정하거나 삭제하셔도 됩니다.
 * 자주 쓰이는 인터페이스는 models 폴더에 정의해 놓고 import해서 사용하면 됩니다.
 * @interface User
 * @property {number} id - 유저의 고유 id
 * @property {string} firstName - 유저의 이름
 * @property {string} lastName - 유저의 성
 * @property {number} age - 유저의 나이
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
