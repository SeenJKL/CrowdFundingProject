*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}    chrome
${URL}        https://657fe3da8ccef3019f9634c7--friendly-gelato-62e82d.netlify.app/
${WAIT_TIMEOUT}    5s

*** Test Cases ***
Open Home Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    1

    # Verify the presence of key elements on the Home page
    Page Should Contain    Welcome to Your Crowdfunding Platform
    Page Should Contain    Empowering ideas and making dreams come true.

    # Close the browser after the test
    Close Browser
    