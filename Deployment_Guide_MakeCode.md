# MakeCode 확장 블록 배포 및 적용 가이드

이 문서는 이지메이커 마이크로비트 쉴드용 커스텀 확장 블록(Extension)의 개발을 완료한 후, 이를 실제 온라인 MakeCode 환경에 적용하고 사용자들에게 배포하는 방법을 정리한 가이드입니다.

## 1. 개발 및 배포 기본 워크플로우

온라인 MakeCode용 확장은 기본적으로 **GitHub 저장소(Repository)** 를 통해 배포됩니다.
전체적인 뼈대와 흐름은 다음과 같습니다:
1. MakeCode 에디터 내에서 새 프로젝트 생성 및 GitHub 연결
2. 코드 작성 후 Github 릴리즈 배포(Publish)
3. Github 저장소 URL을 통한 사용자 배포 방법 (초안 배포 형태)
4. 단어로 검색 가능한 공식 레지스트리에 등록 요청 (선택 사항)

---

## 2. 세부 진행 방법

### Step 1: 에디터 환경 설정 및 GitHub 연결
마이크로소프트 MakeCode는 GitHub과 매우 강력하게 연동되어 있습니다. 이를 통해 클라우드에 확장을 배포합니다.
1. 브라우저에서 [MakeCode for micro:bit](https://makecode.microbit.org/) 에 접속합니다.
2. 화면 우측 상단의 설정 메뉴나 프로젝트 하단의 **[Sign in]** 버튼을 눌러 본인의 GitHub 계정으로 로그인합니다.
3. 홈 화면에서 [새 프로젝트]를 생성합니다.
4. MakeCode 화면 하단 상태 표시줄에 나타난 **[GitHub 연동 버튼]** (작은 고양이 모양 로고)을 클릭하고, "Create a GitHub repository" 과정을 진행합니다.
   > 💡 **Tip:** 저장소 이름 앞에는 MakeCode 규격임을 나타내는 `pxt-`를 붙이는 것이 관습입니다. (예: `pxt-ezmakershield-microbit`)

### Step 2: 코드 작성 및 Release(버전 발매)
1. 로컬 환경에서 작성한 `.ts` 파일과 `pxt.json` 등의 코드를 직접 Push 하거나, 온라인 에디터 상에서 코드를 입력/수정합니다.
2. 커스텀 블록들이 시뮬레이터나 테스트 타겟 보드에서 잘 동작하는지 검증을 완료합니다.
3. 코드 수정이 완료되었다면 화면 하단의 **[GitHub 버튼]** (위 화살표 모양으로 변경됨)을 누릅니다.
4. 변경 사항이 있으면 Commit 메시지를 입력하고 **[Commit and push changes]** 를 눌러 GitHub에 업로드합니다.
5. 패키지를 대중에게 공식 버전으로 묶어 발매하려면, 연동 메뉴 아래쪽 **[Create a new Release]** (예: v0.0.1, v1.0.0 등)를 클릭하여 배포합니다. 
> MakeCode에서는 Release 태그가 생성된 버전을 안정적인 확장 패키지로 간주하여 사용자들에게 제공합니다.

### Step 3: 가장 빠르고 확실한 일반 사용자 배포 (URL 공유 방식)
저장소의 릴리즈 배포가 완료되면 즉시 교사나 학생들에게 배포하여 사용할 수 있습니다.
1. 개발하신 GitHub 저장소의 전체 URL 주소를 복사합니다.
   *예: `https://github.com/계정이름/pxt-ezmakershield-microbit`*
2. 블록 코딩을 하려는 학생들은 MakeCode 웹페이지에서 프로젝트를 만들고 중간 카테고리의 **[확장(Extensions)]** 메뉴를 클릭합니다.
3. 확장 기능을 검색하는 텍스트 입력창에 복사한 **GitHub 리포지토리 URL 주소 전체를 붙여넣기 한 후 검색(엔터/돋보기 클릭)** 합니다.
4. 검색 결과에 `ezmakershield-microbit` 썸네일 카드가 뜨면, 이를 클릭함으로써 학생들의 툴박스에 블록 항목이 추가됩니다.

---

## 3. 고급 배포: 공식 확장 라이브러리로 승인받기

URL을 붙여넣는 방식이 아니라, MakeCode 검색창에 `ezmaker` 처럼 **키워드 단어만 입력해도** 곧바로 검색결과에 뜨게 만들기 위해서는 Microsoft 측의 공식 승인 과정이 필요합니다. 

1. **사전 준비**: 
   - `README.md` 가 제품 사진과 블록 사용법 등으로 상세하고 충실히 기입되어야 합니다.
   - 라이센스 설정(예: MIT License)이 정확히 기입되어 있어야 합니다.
2. **신청 절차 (Pull Request)**:
   - Microsoft MakeCode 팀에서 관리하는 GitHub 저장소인 [microsoft/pxt-microbit](https://github.com/microsoft/pxt-microbit)로 이동합니다.
   - 해당 리포지토리 안의 `targetconfig.json` 파일을 열어, 허용된 플러그인 리스트에 여러분의 Github 주소를 추가하는 PR (Pull Request)을 제출해야 합니다.
   - 혹은 MakeCode의 [공식 커뮤니티 포럼](https://forum.makecode.com/) 에 확장 등록 승인(Approval)을 요청하는 글을 양식에 맞춰 업로드해야 합니다.
   - Microsoft 개발팀이 확인 및 검토를 거쳐 Merge 해주면 수일~수주 내에 전 세계 대상 공식 라이브러리로 등재됩니다.

> 공식 승인 전까지는 [Step 3]의 "URL 복사 붙여넣기 방식"을 교안 문서나 화면의 QR코드 등으로 제공해 수업이나 제작 목적으로 충분히 사용할 수 있습니다.
