@echo off
REM Stitch Dosyalarini Toplama Script'i
REM Batch Script - Windows CMD

echo ==================================
echo Stitch Dosyalarini Toplama Araci
echo ==================================
echo.

set "SOURCE=C:\Users\YUNUS\Downloads\stitch_match_details_roster"
set "DEST=C:\Users\YUNUS\Downloads\stitch_all_designs"

REM Hedef klasoru olustur
if not exist "%DEST%" (
    mkdir "%DEST%"
    echo [OK] Hedef klasor olusturuldu
)

echo.
echo Dosyalar kopyalaniyor...
echo.

REM Her alt klasore gir ve dosyalari kopyala
for /d %%F in ("%SOURCE%\*") do (
    set "FOLDER_NAME=%%~nxF"
    
    if exist "%%F\code.html" (
        copy /Y "%%F\code.html" "%DEST%\%%~nxF-code.html" >nul
        echo   [OK] %%~nxF-code.html
    )
    
    if exist "%%F\screen.png" (
        copy /Y "%%F\screen.png" "%DEST%\%%~nxF-screen.png" >nul
        echo   [OK] %%~nxF-screen.png
    )
)

echo.
echo ==================================
echo TAMAMLANDI!
echo ==================================
echo.
echo Hedef: %DEST%
echo.
echo Klasoru acmak icin bir tusa basin...
pause >nul
explorer "%DEST%"
