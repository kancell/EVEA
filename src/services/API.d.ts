declare namespace API {
  type WarpProcess = {
    code: number;
    data?: unknown;
    msg: string;
    success: boolean;
  };

  type ExamInfo = {
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
    objScore: number;
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
  };
  type ExamPaging = {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: any[];
    pages: number;
    records: ExamInfo[];
    searchCount: boolean;
    size: number;
    total: number;
  };
  type WarpExamPaging = {
    code: number;
    msg: string;
    success: boolean;
    data: ExamPaging;
  };

  type Answer = {
    abc: string;
    answer: string;
    answerId: string;
    checked: boolean;
    content: string;
    id: string;
    image: string;
    isRight: boolean;
    paperId: string;
    pathScore: number;
    quId: string;
    sort: number;
  };
  type Question = {
    actualScore: number;
    analysis: string;
    answer: string;
    answerList: Answer[];
    answered: boolean;
    content: string;
    groupId: string;
    id: string;
    image: string;
    isRight: boolean;
    mark: boolean;
    paperId: string;
    quId: string;
    quType: string;
    quType_dictText: string;
    score: number;
    sort: number;
    video: string;
  };
  type WarpQuestion = {
    code: number;
    msg: string;
    success: boolean;
    data: Question;
  };

  type QuestionGroup = {
    id: string;
    itemRand: boolean;
    paperId: string;
    pathScore: boolean;
    perScore: number;
    quCount: number;
    quRand: boolean;
    quType: string;
    quType_dictText: string;
    strictSort: boolean;
    title: string;
    totalScore: number;
    quList: Question[];
  };
  type PaperDetail = {
    actionInterval: number;
    actionOn: boolean;
    answerDevice: number;
    camInterval: number;
    camOn: boolean;
    chance: number;
    createBy: string;
    createTime: string;
    dataFlag: number;
    departId: string;
    departId_dictText: string;
    deptCode: string;
    examId: string;
    handMin: number;
    hasSaq: boolean;
    id: string;
    lateMax: number;
    leaveActual: number;
    leaveCheck: number;
    leaveCount: number;
    leaveOn: boolean;
    leftSeconds: number;
    limitTime: string;
    objScore: number;
    passed: boolean;
    points: number;
    qualifyScore: number;
    state: number;
    subjScore: number;
    title: number;
    totalScore: number;
    totalTime: number;
    updateBy: string;
    updateTime: string;
    userId: string;
    userId_dictText: string;
    userScore: number;
    userTime: number;
    groupList: QuestionGroup[];
  };
  type WarpPaperDetail = {
    code: number;
    msg: string;
    success: boolean;
    data: PaperDetail;
  };

  type PaperResult = {
    createBy: string;
    createTime: string;
    dataFlag: number;
    departId: string;
    departId_dictText: string;
    deptCode: string;
    examId: string;
    hasSaq: boolean;
    id: string;
    leaveActual: number;
    limitTime: string;
    objScore: number;
    passed: boolean;
    qualifyScore: number;
    resultType: number;
    state: number;
    subjScore: number;
    thanks: string;
    title: string;
    totalScore: number;
    totalTime: number;
    updateBy: string;
    updateTime: string;
    userId: string;
    userId_dictText: string;
    userScore: number;
    userTime: number;
    groupList: QuestionGroup[];
  };
  type WarpPaperResult = {
    code: number;
    msg: string;
    success: boolean;
    data: PaperResult;
  };

  type Record = {
    createTime: string;
    examId: string;
    examId_dictText: string;
    id: string;
    maxScore: number;
    passed: boolean;
    realName: string;
    title: string;
    tryCount: number;
    updateTime: string;
    userId: string;
  };
  type ExamRecord = {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: unknown[];
    pages: number;
    searchCount: boolean;
    size: number;
    total: number;
    records: Record[];
  };
  type WarpExamRecord = {
    code: number;
    msg: string;
    success: boolean;
    data: ExamRecord;
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
