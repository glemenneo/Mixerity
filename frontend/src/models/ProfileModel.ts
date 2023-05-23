export default interface Profile {
  uid?: number;
  displayName?: string;
  profilePicUrl?: string;
  bio?: string;
  created?: string;
  following?: number[];
}
