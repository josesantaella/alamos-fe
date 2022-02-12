import { ApolloClient, DocumentNode, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { PostService, HomePageService } from '../services';

class ApolloService {
  private static localization = { default: 'en' };
  private static instance: ApolloService;
  private static client: ApolloClient<NormalizedCacheObject>;
  private readonly isServer = typeof window === 'undefined';
  public readonly initialCacheState = 'apolloInitialCacheState';
  post: PostService;
  home: HomePageService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    ApolloService.client = this.initClient();
    this.post = new PostService(this.runQuery);
    this.home = new HomePageService(this.runQuery);
  }
  public getClient() {
    return ApolloService.client;
  }
  public extractCache(): NormalizedCacheObject {
    return ApolloService.client.extract();
  }
  public restoreCache(cache: NormalizedCacheObject): void {
    ApolloService.client.restore(cache);
  }

  public setLocale(locale: string) {
    ApolloService.localization.default = locale;
  }

  private runQuery<T>(query: DocumentNode, variables?: Record<string, string>) {
    variables = variables
      ? { ...variables, locale: ApolloService.localization.default }
      : { locale: ApolloService.localization.default };
    return ApolloService.client.query<T>({ query, variables });
  }

  private initClient() {
    return new ApolloClient({
      uri: 'https://alamos-be.herokuapp.com/graphql',
      cache: this.getCache(),
      connectToDevTools: true
    });
  }

  private getCache() {
    const inMemoryCache = new InMemoryCache();
    return inMemoryCache;
  }

  private getInitialCacheState(): NormalizedCacheObject {
    if (this.isServer) return;
    const nextData = window['__NEXT_DATA__'];
    const initialState = nextData[this.initialCacheState];
    return initialState as NormalizedCacheObject;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ApolloService {
    if (!ApolloService.instance || typeof window === 'undefined') {
      ApolloService.instance = new ApolloService();
    }
    return ApolloService.instance;
  }
}

export default ApolloService.getInstance();
