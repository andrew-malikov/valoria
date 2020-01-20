import { Options } from 'got/dist/source';
import UrlBuilder from 'rest-api-url-builder';

import { ParticularHandle } from '../../infrastructure/chains';

export abstract class BaseHttpService {
    constructor(protected readonly urls: UrlBuilder, protected readonly setupOptions: ParticularHandle<Options>) {}
}
