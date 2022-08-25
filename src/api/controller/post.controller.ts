
import {
  Controller, Get, Param, Inject
} from '@nestjs/common';
import { PostService } from '../service';
import { PostDTO, MessageDTO, PostDetailDTO } from '../dto';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) { }

  /**
 * Function get all posts with Observable.
 * @author David Martínez
 * @param null
 * @return {List<PostDTO>} list of posts
 */
  @ApiOperation({ description: 'Get post' })
  @ApiCreatedResponse({
    description: 'Post.',
    type: [PostDTO],
  })
  @Get('')
  getPosts(): Observable<PostDTO[]> {
    this.logger.info(`method: getPosts, req:null`)
    const result = this.postService.getPosts();
    this.logger.info(`response:${JSON.stringify(result)}`)
    return result
  }

  /**
 * Function get all posts and universities  with Observable.
 * @author David Martínez
 * @param null
 * @return {MessageDTO} list of posts and universities
 */
  @ApiOperation({ description: 'Get posts with list universities with Observable' })
  @ApiCreatedResponse({
    description: 'Post.',
    type: MessageDTO,
  })
  @Get('universities')
  getPostWithUniversities(): Observable<MessageDTO> {
    this.logger.info(`method: getPostWhitUniversities, req:null`)
    const result = this.postService.getPostsWithUniversities();
    this.logger.info(`response:${JSON.stringify(result)}`)
    return result
  }

  /**
 * Function get post by Id.
 * @author David Martínez
 * @param id post id
 * @return {PostDTO} post
 */
  @ApiParam({ name: 'id' })
  @ApiOperation({ description: 'Get post by Id' })
  @ApiCreatedResponse({
    description: 'Post.',
    type: PostDTO,
  })
  @Get(':id')
  async getPostById(@Param('id') id): Promise<PostDTO> {
    this.logger.info(`method: getPostById, req:${id}`)
    const result = await this.postService.getPostById(id);
    this.logger.info(`response:${JSON.stringify(result)}`)

    return result
  }

  /**
 * Function get post by Id with their comments.
 * @author David Martínez
 * @param id post id
 * @return {PostDetailDTO} post with comments
 */
  @ApiOperation({ description: 'Get post by Id with comments' })
  @ApiCreatedResponse({
    description: 'Post.',
    type: PostDetailDTO,
  })
  @ApiParam({ name: 'id' })
  @Get(':id/comments')
  async getPostByIdWithComments(@Param('id') id): Promise<PostDetailDTO> {
    this.logger.info(`method: getPostByIdWithComments, req:${id}`)
    const result = await this.postService.getPostByIdWithComments(id);
    this.logger.info(`response:${JSON.stringify(result)}`)
    return result
  }





}

