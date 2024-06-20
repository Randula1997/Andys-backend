/* eslint-disable prettier/prettier */
import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength, MinLength,  } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger";

export enum Role {
    User = 'user',
    ServiceProvider = 'serviceProvider',
}

export class SignUpDto{
    @ApiProperty({ description: 'The Name of User' })
    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    readonly name: string;

    @ApiProperty({ description: 'The Email of User' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsEmail({}, { message: 'Please enter a correct email address' })
    readonly email: string;

    @ApiProperty({ description: 'The Address of User' })
    @IsNotEmpty({ message: 'Address must not be empty' })
    readonly address: string;

    @ApiProperty({ description: 'The Phone Number of User' })
    @IsNotEmpty({ message: 'Phone Number must not be empty' })
    readonly phoneNumber: number;

    @ApiProperty({ description: 'The Password of User' })
    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(12, { message: 'Password must be at most 12 characters long' })
    readonly password: string;

    @ApiProperty({ description: 'The Role of User' })
    @IsNotEmpty({ message: 'Role must not be empty' })
    @IsString({ message: 'Role must be a string' })
    @IsIn([Role.User, Role.ServiceProvider], { message: 'Role must be either "user" or "service provider"' })
    readonly role: string;

}