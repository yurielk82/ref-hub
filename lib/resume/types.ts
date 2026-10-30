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

/** 저장된 한 버전. 파일 이름이 id다. */
export interface ResumeVersion {
  format: 1;
  id: string;
  savedAt: string;
  label: string;
  resume: SaraminResume;
}

export interface ResumeVersionSummary {
  id: string;
  savedAt: string;
  label: string;
}
