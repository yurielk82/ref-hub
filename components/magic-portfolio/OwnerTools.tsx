import { Row, SmartLink, Text } from "@once-ui-system/core";
import { jobsViewer } from "@/auth";
export async function MagicOwnerTools() {
  if (!(await jobsViewer())) return null;
  return (
    <Row fillWidth horizontal="center" wrap gap="24" padding="24">
      <Text onBackground="neutral-weak">관리</Text>
      <SmartLink href="/edit">홈페이지 편집</SmartLink>
      <SmartLink href="/ax/edit">AX 문구 편집</SmartLink>
      <SmartLink href="/resume">이력서</SmartLink>
      <SmartLink href="/jobs">공고 모음</SmartLink>
    </Row>
  );
}
