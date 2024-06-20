/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDto{

    @ApiProperty({ description: 'The Email of User' })
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email address"})
    readonly email: string

    @ApiProperty({ description: 'The Password of the use' })
    @IsNotEmpty()
    @IsString()
    readonly password: string

}