import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {

    @IsNotEmpty()
    @IsString()
    current_password: string;

    @IsNotEmpty()
    @IsString()
    new_password: string;

    @IsNotEmpty()
    @IsString()
    confirm_password: string;

}