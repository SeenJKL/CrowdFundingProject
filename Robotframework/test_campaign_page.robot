*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    chrome
${URL}        https://657fe3da8ccef3019f9634c7--friendly-gelato-62e82d.netlify.app/
${WAIT_TIMEOUT}    5s

*** Test Cases ***
Open Campaign Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    1

    Wait Until Page Contains Element    //*[contains(@href, 'create-campaign')]    timeout=${WAIT_TIMEOUT}
    Click Element    //*[contains(@href, 'create-campaign')]

    # Verify key elements on the Campaign page
    Page Should Contain    Start a Campaign

    # Close the browser after the test
    Close Browser
    