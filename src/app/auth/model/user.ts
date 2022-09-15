export interface User {
  ['user_id']: string;
  ['name_first']?: string;
  ['name_middle']?: string;
  ['name_last']?: string;
  ['username']?: string;
  ['password']?: string;
  ['position']?: string;
  ['designation']?: string;
  ['token']?: string;
  ['reset_token_expiration_date']?: Date;
  signature?: string;
}
