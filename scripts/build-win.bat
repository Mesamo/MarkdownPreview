set PLATFPRM=%1%
set ARCH=%2%
set APP_NAME="MarkdownPreview"

set IGNORE_LIST="dist|script|\.idea|\.vscode|.*\.md"

electron-packager . %APP_NAME% --platform=%PLATFPRM% --arch=%ARCH% --out=.\dist --ignore=%IGNORE_LIST%