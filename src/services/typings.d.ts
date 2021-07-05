// @ts-ignore
/* eslint-disable */

declare namespace API {
  type WarpEaxmPaging = {
    code: number;
    msg: string;
    success: boolean;
    data: EaxmPaging;
  };
  type EaxmPaging = {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: any[];
    pages: number;
    records: {
      actionInterval: number;
      actionOn: boolean;
      answerDevice: number;
      camInterval: number;
      camOn: boolean;
      chance: number;
      content: string;
      createBy: string;
      createTime: string;
      dataFlag: number;
      endTime: string;
      examType: string;
      examType_dictText: string;
      handMin: number;
      hasSaq: boolean;
      id: string;
      lateMax: number;
      leaveCheck: number;
      leaveCount: number;
      leaveOn: boolean;
      objScore: 100;
      openType: number;
      password: string;
      points: number;
      qualifyScore: number;
      resultType: number;
      startTime: string;
      state: number;
      subjScore: number;
      thanks: string;
      timeLimit: boolean;
      title: string;
      tmplId: string;
      totalScore: number;
      totalTime: number;
      updateBy: string;
      updateTime: string;
    }[];
    searchCount: boolean;
    size: number;
    total: number;
  };
  type WarpEaxmCreate = {
    code: number;
    data: {
      id: string;
    };
    msg: string;
    success: boolean;
  };
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
