*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    chrome
${URL}        https://657fe3da8ccef3019f9634c7--friendly-gelato-62e82d.netlify.app/
${WAIT_TIMEOUT}   5s

*** Test Cases ***
Open Home Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    1

    Wait Until Page Contains Element    //*[contains(@href, '/ranking')]    timeout=${WAIT_TIMEOUT}
    Click Element    //*[contains(@href, '/ranking')]

    # Verify key elements on the Ranking page
    Page Should Contain    Donator Rankings
    ${is_rankingtable_visible}    Run Keyword And Return Status    Page Should Contain Element    class: rankingtable
    Run Keyword If    not ${is_rankingtable_visible}    Fail    rankingtable is not visible

    # Close the browser after the test
    Close Browser
    