declare namespace API {
  export type httpRespone = {
    code: number;
    msg: string;
    success: boolean;
  };

  type SelectOption = {
    children: unknown[];
    dicCode: string;
    id: string;
    parentId: string;
    title: string;
    value: string;
  };
  type wrapSelectOption = httpRespone & {
    data: SelectOption[];
  };
  type paging = {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: any[];
    pages: number;
    searchCount: boolean;
    size: number;
    total: number;
  };
  type wrapUnknownResult = httpRespone & {
    data?: unknown;
  };

  type ProcessExam = {
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
    state: number;
    subjScore: number;
    title: string;
    totalScore: number;
    totalTime: number;
    updateBy: string;
    updateTime: string;
    userId: string;
    userId_dictText: string;
    userScore: number;
    userTime: number;
  };
  type wrapProcessExam = httpRespone & {
    data?: ProcessExam;
  };

  type Exam = {
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
  type ExamPaging = paging & {
    records: Exam[];
  };
  type wrapExamPaging = httpRespone & {
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
    analysis: string | undefined;
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
  type wrapQuestion = httpRespone & {
    data: Question;
  };

  type ChapterGroup = {
    chapterId: string;
    levels: {
      level: string;
      quCount: number;
      title: string;
      num?: number;
    }[];
    quType: string;
    repoId: string;
    title: string;
  };
  type wrapChapterGroup = httpRespone & {
    data: ChapterGroup[];
  };
  type QuestionGroup = {
    id?: string;
    itemRand: boolean;
    paperId: string;
    pathScore: boolean;
    perScore: number;
    quCount: number;
    quRand: boolean;
    quType: string;
    quType_dictText: string;
    strictSort: boolean | number;
    title: string;
    totalScore: number;
    quList: Question[];
    anchor?: string;
  };
  type PaperEditParams = {
    quCount?: number;
    totalScore?: number;
    title?: string;
    joinType?: number;
    timeType?: number;
    groupList?: RepoQuestionGroupList[];
    catId?: string;
    catId_dictText?: string;
    createBy?: string;
    createBy_dictText?: string;
    createTime?: string;
    deptCode?: string;
    id?: string;
    joinType_dictText?: string;
    objScore?: number;
    subjScore?: number;
  };
  type wrapPaperEditParams = httpRespone & {
    data: PaperEditParams;
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
  type wrapPaperDetail = httpRespone & {
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
  type wrapPaperResult = httpRespone & {
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
  type PaperRecord = paging & {
    records: Record[];
  };
  type wrapPaperRecord = httpRespone & {
    data: PaperRecord;
  };

  type ExamRecord = {
    captures: unknown[];
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
    realName: string;
    state: number;
    subjScore: number;
    title: string;
    totalScore: number;
    totalTime: number;
    updateBy: string;
    updateTime: string;
    userId: string;
    userId_dictText: string;
    userScore: number;
    userTime: number;
  };
  type ExamRecordPaging = paging & {
    records: ExamRecord[];
  };
  type wrapExamRecordPaging = httpRespone & {
    data: ExamRecordPaging;
  };

  type PaperManage = {
    catId: string;
    catId_dictText: string;
    createBy: string;
    createBy_dictText: string;
    createTime: string;
    deptCode: string;
    id: string;
    joinType: number;
    joinType_dictText: string;
    objScore: number;
    quCount: number;
    subjScore: number;
    timeType: number;
    title: string;
    totalScore: number;
  };
  type wrapPaperManageSingle = httpRespone & {
    data: PaperManage;
  };
  type PaperManagePaging = paging & {
    records: PaperManage[];
  };
  type wrapPaperManagePaging = httpRespone & {
    data: PaperManagePaging;
  };

  type Repo = {
    catId?: string; //题库id
    chapters?: unknown[]; // 章节
    isExam?: boolean; //题库用于考试
    isTrain?: boolean; //题库用于训练
    remark?: string;
    title?: string;
  };

  type RepoManage = Repo & {
    catId_dictText?: string; // 题库类别 职业资格类
    code?: string;
    createBy?: string;
    createTime?: string;
    dataFlag?: number; //位置
    id?: string;
    quCount?: number; //题目数量
    typeList?: {
      count: string;
      quType: string;
      quType_dictText: string;
    }[];
    updateBy?: string;
    updateTime?: string;
  };
  type RepoManagePaging = paging & {
    records: RepoManage[];
  };

  type wrapRepoManage = httpRespone & {
    data: RepoManage;
  };
  type wrapRepoManagePaging = httpRespone & {
    data: RepoManagePaging;
  };

  type Review = {
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
    deptCode: string;
    endTime: string;
    examType: string;
    examType_dictText: string;
    examUser: number;
    handMin: number;
    hasSaq: true;
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
    unreadPaper: number;
    updateBy: string;
    updateTime: string;
  };
  type ReviewPaging = paging & {
    records: Review[];
  };
  type wrapReviewPaging = httpRespone & {
    data: ReviewPaging;
  };

  type ExamDetail = Exam & {
    deptCode: string;
    deptCodes: unknown[];
  };
  type wrapExamDetail = httpRespone & {
    data: ExamDetail;
  };

  type UserStatis = {
    activeUser: number;
    allUser: number;
    dateStr: string;
    newUser: number;
    statDate: string;
  };
  type UserStatisPaging = paging & {
    records: Review[];
  };
  type wrapUserStatisPaging = httpRespone & {
    data: UserStatisPaging;
  };

  type ExamStatis = {
    dateStr: string;
    examCount: number;
    examUser: number;
    passRate: string;
    passUser: number;
    statDate: string;
  };
  type ExamStatisPaging = paging & {
    records: Review[];
  };
  type wrapExamStatisPaging = httpRespone & {
    data: UserStatisPaging;
  };

  type RepoAnswer = {
    analysis?: string;
    content?: string;
    id?: string;
    image?: string;
    isRight?: boolean;
    answerId?: string;
    tag?: string;
  };
  type RepoQuestion = {
    quId?: string;
    analysis?: string;
    answerList?: RepoAnswer[];
    chapterId?: string;
    chapterId_dictText?: string;
    content?: string;
    createTime?: string;
    deptCode?: string;
    id?: string;
    image?: string;
    level?: string;
    level_dictText?: string;
    quType?: string;
    quType_dictText?: string;
    remark?: string;
    repoId?: string;
    updateTime?: string;
    video?: string;
    tagList?: unknown;
    score?: number;
  };
  type RepoRule = {
    quCount?: number;
    title?: string;
    num?: number;
    quType?: string;
    repoId?: string;
    repoTitle?: string;
    levelTitle?: string;
    chapterTitle?: string;
    chapterId?: string;
  };

  type RepoQuestionGroupList = {
    anchor?: number;
    title?: string;
    quType?: string;
    quCount?: number;
    totalScore?: number;
    perScore?: number;
    quRand?: boolean;
    itemRand?: boolean;
    strictSort?: number;
    quList?: RepoQuestion[];
    ruleList?: RepoRule[];

    pathScore?: boolean;
  };
  type wrapRepoQuestion = httpRespone & {
    data: RepoQuestion;
  };
  type wrapRepoQuestionList = httpRespone & {
    data: RepoQuestion[];
  };
  type RepoQuestionPaging = paging & {
    records: RepoQuestion[];
  };
  type wrapRepoQuestionPaging = httpRespone & {
    data: RepoQuestionPaging;
  };

  type userData = {
    userName?: string;
    token: string;
    state?: number;
    roles?: string[];
    roleType?: number;
    realName?: string;
    points?: number;
    id?: string;
    dataScope?: number;
  };

  type User = {
    avatar?: string;
    createBy?: string;
    createTime?: string;
    dataFlag?: number;
    deptCode?: string;
    id?: string;
    idCard?: string;
    password?: string;
    points?: number;
    realName?: string;
    roles?: string[];
    salt?: string;
    state?: number;
    updateBy?: string;
    updateTime?: string;
    userName?: string;
    email?: string;
  };
  type WrapUser = httpRespone & {
    data: User;
  };
  type UserPaging = paging & {
    records: User[];
  };
  type wrapUserPaging = httpRespone & {
    data: UserPaging;
  };

  type Role = {
    createBy: string;
    createTime: string;
    dataFlag: number;
    dataScope: number;
    dataScope_dictText: string;
    id: string;
    roleName: string;
    roleType: number;
    roleType_dictText: string;
    updateBy: string;
    updateTime: string;
  };
  type wrapRole = httpRespone & {
    data: Role[];
  };

  type Depart = {
    children: Depart[];
    deptCode: string;
    deptName: string;
    deptType: number;
    id: string;
    parentId: string;
    sort: number;
  };
  type WrapDepart = httpRespone & {
    data: Depart[];
  };
  type Tree = {
    title?: string;
    key?: string;
    value?: string;
    children?: Tree[];
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
