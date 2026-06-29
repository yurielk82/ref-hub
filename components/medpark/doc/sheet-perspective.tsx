import { Sheet, RHead, RFoot, SecHead } from './chrome'

export function SheetPerspective() {
  return (
    <Sheet>
      <RHead right="01 · 핵심 관점" />
      <section id="s01" className="sec">
        <SecHead n="01" title="핵심 관점 - AI에 다 맡기지 않습니다" />
        <p>
          근태 자동화라고 하면 흔히 “AI에게 시키자”고 생각하기 쉽습니다. 저는 다르게 봤습니다. 이
          문제의 <strong>대부분은 AI를 쓰면 안 되는 영역</strong>이고, 잘못 적용하면 오히려
          부정확해집니다.
        </p>
        <div className="qa">
          <h4>
            <span className="x">✕</span>빠진 기록을 AI가 추측해 채우면 안 됩니다.
          </h4>
          <p className="b">
            출입 태그를 안 찍었거나 결재를 안 올렸을 때 AI가 “아마 외출이었겠지” 하고 채우면 그
            기록은 사실이 아니게 됩니다. 그 잘못된 기록으로 월급과 주 52시간을 계산하면, 분쟁이 나면
            근거가 통째로 무너집니다.
          </p>
          <p className="a">AI가 메우는 게 아니라, 사람이 직접 찍게 만듭니다.</p>
        </div>
        <div className="qa">
          <h4>
            <span className="x">✕</span>계산을 AI에게 시키면 안 됩니다.
          </h4>
          <p className="b">
            생성형 AI는 같은 자료를 줘도 답이 매번 조금씩 달라질 수 있고(비결정적) 숫자도 틀릴 수
            있습니다. 월급·근로시간처럼 “항상 똑같이 정확해야 하는 계산”에는 부적합합니다.
          </p>
          <p className="a">
            정해진 계산 로직(파이썬·DB 쿼리)이 계산합니다. 같은 입력은 늘 같은 결과(재현 가능)이고,
            어떤 규칙·어떤 원본에서 나온 숫자인지 그대로 추적됩니다.
          </p>
        </div>
        <div className="note">
          <div className="h">역할 경계 - 시스템은 사실을 만들지 않습니다</div>
          <ul className="li">
            <li>
              <span>
                <strong>사실 확정:</strong> 출입·결재는 사람이 찍고, 시간 합계·초과근무는 계산
                로직이 냅니다.
              </span>
            </li>
            <li>
              <span>
                <strong>이상 후보 제시:</strong> “평소와 다르니 봐야 한다”고 추려 보여주는 것까지가
                시스템 역할입니다.
              </span>
            </li>
            <li>
              <span>
                <strong>최종 판정:</strong> 무단결근·징계·임금 조정은 반드시 사람이 정합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>
      <RFoot page="2 / 7" />
    </Sheet>
  )
}
