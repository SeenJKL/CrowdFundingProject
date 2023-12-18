*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}        chrome
${URL}            https://657fe3da8ccef3019f9634c7--friendly-gelato-62e82d.netlify.app/
${WAIT_TIMEOUT}   5s

*** Test Cases ***
Open Dashboard Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    1

    Wait Until Page Contains Element    //*[contains(@href, 'dashboard')]    timeout=${WAIT_TIMEOUT}
    Click Element    //*[contains(@href, 'dashboard')]

    # Verify key elements on the Dashboard page
    Page Should Contain    All Campaigns
    ${is_FundCard_visible}    Run Keyword And Return Status    Page Should Contain Element    class: FundCard
    Run Keyword If    not ${is_FundCard_visible}    Fail    FundCard is not visible

    # Close the browser after the test
    Close Browser
    