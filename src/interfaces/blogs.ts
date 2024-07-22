// TEER - Medium integration notes:
// These are just "partial" interfaces of actual Medium's GraphQl responses (only needed properties are included)
// Please call Medium's GraphQl using operationName: 'UserProfileQuery' to see all available properties
export interface MedinumBlog {
  extendedPreviewContent: {
    subtitle: string;
  };
  id: string;
  latestPublishedAt: number;
  mediumUrl: string;
  previewImage: {
    id: string;
  };
  readingTime: number;
  title: string;
  tags: Array<{
    displayTitle: string;
    id: string;
  }>;
  uniqueSlug: string;
  updatedAt: string;
  uploadedByUserId: number;
}

export type MedinumBlogListResponse = Array<{
  data: {
    userResult: {
      homepagePostsConnection: {
        posts: Array<MedinumBlog>;
        pagingInfo: {
          next: {
            from: string;
          } | null;
        };
      };
    };
  };
}>;
