export interface User {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: Avatar;
  displayName: string;
  emailAddress?: string;
  self: string;
  timeZone: string;
}

export interface Avatar {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}

export interface Comment {
  author: User;
  body: string;
  created: string;
  id: string;
  renderedBody: string;
  self: string;
  updateAuthor: User;
  updated: string;
}

export interface Issue {
  expand: string;
  fields: {
    aggregateprogress: {
      progress: number;
      total: number;
      percent: number;
    };
    aggregatetimeestimate: number;
    aggregatetimeoriginalestimate: number;
    aggregatetimespent: number | null;
    assignee: User;
    creator: User;
    description: {
      content: {
        type: "paragraph" | "codeBlock" | "rule" | "mediaSingle";
        attrs?: {
          language?: "json";
          layout?: "align_start";
        };
        content: {
          type: "text" | "inlineCard" | "media";
          text: string;
          attrs?: {
            url?: string;
            collection?: string;
            height?: number;
            width?: number;
            id?: number;
            type?: "file";
          };
          marks?: {
            type: "strong" | "code";
          }[];
        }[];
      }[];
      type: "doc";
      version: number;
    };
    parent: {
      id: string;
      key: string;
      self: string;
      fields: {
        summary: string;
      };
    };
    priority: {
      iconUrl: string;
      id: string;
      name: string;
      self: string;
    };
    progress: {
      percent: number;
      progress: number;
      total: number;
    };
    project: {
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      self: string;
      simplified: boolean;
      avatarUrls: Avatar;
    };
    status: {
      description: string;
      iconUrl: string;
      id: string;
      name: string;
      self: string;
    };
    reporter: User;
    resolution?: null;
    summary: string;
    timeestimate: number;
    timeoriginalestimate: number;
    timespent: number | null;
  };
  id: string;
  key: string;
  self: string;
}
