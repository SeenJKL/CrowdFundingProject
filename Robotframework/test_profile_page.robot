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

    Wait Until Page Contains Element    //*[contains(@href, '/profile')]    timeout=${WAIT_TIMEOUT}
    Click Element    //*[contains(@href, '/profile')]

    # Verify key elements on the Withdraw page
    Page Should Contain    Your Created Campaigns
    Page Should Contain    Your Donated Campaigns

    # Close the browser after the test
    Close Browser
    