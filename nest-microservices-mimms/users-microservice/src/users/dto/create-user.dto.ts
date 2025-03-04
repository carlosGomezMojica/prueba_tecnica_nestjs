export class CreateUserDto {
  name: string;
  password: string;
  email: string;
}

export class ShowUserDto {
  id: number;
  name: string;
  email: string;
}
