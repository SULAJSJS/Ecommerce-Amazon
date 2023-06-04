import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// get profile
	// toggle favorites
	// update profile

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async login(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}
	@Auth()
	@HttpCode(200)
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorites(id, +productId)
	}
}
