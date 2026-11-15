/**
 * 사람인 이력서 한 벌. 칸 이름과 순서는 사람인 이력서 화면을 따른다. 사람인에 항목별로 붙여 넣는 용도라
 * 문장은 사람인에 쓴 그대로 둔다. 저장소가 공개라 이 값들은 git에 두지 않고 서버의 저장소 밖 폴더에만 둔다.
 */
export interface SaraminCareer {
  company: string;
  /** "YYYY.MM" */
  start: string;
  /** "YYYY.MM", 재직 중이면 null */
  end: string | null;
  /** 사람인 '직무' 칸 (예: 유통관리) */
  job: string;
  /** 사람인 '부서·직급' 줄 (예: 영업관리팀 과장) */
  role: string;
  duty: string;
  leaveReason: string;
}

export interface SaraminEducation {
  school: string;
  /** 예: 대학교(4년), 고등학교 */
  level: string;
  status: string;
  major: string;
  minor: string;
}

export interface SaraminResume {
  /** 이력서 제목 — 예전 버전에는 없다 */
  title?: string;
  basic: {
    name: string;
    careerType: string;
    gender: string;
    birthYear: string;
    email: string;
    phone: string;
    address: string;
  };
  myCareer: string;
  careers: SaraminCareer[];
  education: SaraminEducation[];
  skills: string[];
  portfolio: { label: string; url: string }[];
  careerDescription: { title: string; body: string };
  coverLetter: { title: string; body: string }[];
}

/** 잡코리아 경력 한 줄. 잡코리아는 부서·직급·직책·연봉을 따로 받는다. */
export interface JobkoreaCareer {
  company: string;
  /** "YYYY.MM" */
  start: string;
  /** "YYYY.MM", 재직 중이면 null */
  end: string | null;
  department: string;
  /** 직급 (예: 과장) */
  position: string;
  /** 직책 (예: 파트장·팀장·팀원) */
  title: string;
  /** 잡코리아 '주요직무' */
  job: string;
  /** 예: 5,000만원. 모르면 빈칸 */
  salary: string;
  duty: string;
}

export interface JobkoreaEducation {
  school: string;
  level: string;
  /** "YYYY.MM" 또는 "YYYY" */
  start: string;
  end: string;
  status: string;
  major: string;
  /** 예: 3.2 / 4.5 */
  gpa: string;
}

/** 잡코리아 이력서 한 벌. 칸 순서는 잡코리아 이력서 보기 화면(2026-10-31 오너 제공)을 따른다. */
export interface JobkoreaResume {
  /** 이력서 제목 */
  title: string;
  basic: {
    name: string;
    gender: string;
    birthYear: string;
    phone: string;
    email: string;
    address: string;
  };
  skills: string[];
  education: JobkoreaEducation[];
  careers: JobkoreaCareer[];
  /** 인턴·대외활동 / 해외경험 */
  activities: string;
  /** 자격증 / 어학 */
  certificates: string;
  careerDescription: { title: string; body: string };
  coverLetter: { title: string; body: string }[];
  portfolio: { label: string; url: string }[];
  /** 희망근무조건 */
  preference: {
    employmentType: string;
    location: string;
    salary: string;
    jobs: string;
    industries: string;
  };
}

/** 리멤버 경력 한 줄. 회사 아래 부서·직급·기간과 업무 상세 한 칸을 둔다. */
export interface RememberCareer {
  company: string;
  department: string;
  /** 직급 (예: 과장) */
  position: string;
  /** "YYYY.MM" */
  start: string;
  /** "YYYY.MM", 재직 중이면 null */
  end: string | null;
  /** 업무 상세 — 역할과 성과 */
  detail: string;
}

export interface RememberEducation {
  school: string;
  /** 예: 학사 */
  degree: string;
  major: string;
  /** "YYYY" */
  start: string;
  end: string;
}

/**
 * 리멤버 프로필 한 벌. 칸 순서는 리멤버 프로필 편집 화면(2026-11-15 오너 제공)을 따른다.
 * 파일로 내는 이력서가 아니라 프로필이라 경력기술서·자기소개서 칸과 제출용 파일이 없다.
 */
export interface RememberResume {
  basic: { name: string };
  /** 소개 영역의 두 칸(각 5,000자). 둘째 칸은 받은 화면에 이름이 없었다. */
  intro: { basic: string; detail: string };
  careers: RememberCareer[];
  education: RememberEducation[];
  /** 직무 선택 목록 */
  jobs: string[];
  /** 전문 분야·스킬 키워드 */
  skills: string[];
  languages: string;
  websites: string[];
  /** 강의·자문 활동 (제목·활동시기) */
  lectures: string;
  /** 논문·저서 (제목·발행연월) */
  publications: string;
  /** 기사 (제목·링크) */
  articles: string;
  /** 수상 및 기타이력 */
  awards: string;
  certificates: string;
}

export type ResumePlatform = "saramin" | "jobkorea" | "remember";

/** 제출용 파일(이력서·경력기술서·자기소개서·포트폴리오)을 만드는 사이트 */
export type FilePlatform = "saramin" | "jobkorea";

export interface ResumeByPlatform {
  saramin: SaraminResume;
  jobkorea: JobkoreaResume;
  remember: RememberResume;
}

/** 저장된 한 버전. 파일 이름이 id고, 어느 사이트용인지는 담긴 폴더가 정한다. */
export interface ResumeVersion<R = SaraminResume> {
  format: 1;
  id: string;
  savedAt: string;
  label: string;
  resume: R;
}

export interface ResumeVersionSummary {
  id: string;
  savedAt: string;
  label: string;
}
