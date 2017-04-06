var script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";

var entry =
"    <atom:entry xmlns:atom='http://www.w3.org/2005/Atom'\n"+
"        xmlns:gd='http://schemas.google.com/g/2005'\n"+
"        xmlns:gContact='http://schemas.google.com/contact/2008'>\n"+
"      <atom:category scheme='http://schemas.google.com/g/2005#kind'\n"+
"        term='http://schemas.google.com/contact/2008#contact'/>\n"+
"      <gd:name>\n"+
"         <gd:givenName>HELLO</gd:givenName>\n"+
"         <gd:familyName>WORLD</gd:familyName>\n"+
"         <gd:fullName>Hello World</gd:fullName>\n"+
"      </gd:name>\n"+
"      <atom:content type='text'>Notes</atom:content>\n"+
"      <gd:email rel='http://schemas.google.com/g/2005#work'\n"+
"        primary='true'\n"+
"        address='liz@gmail.com' displayName='E. Bennet'/>\n"+
"      <gd:email rel='http://schemas.google.com/g/2005#home'\n"+
"        address='liz@example.org'/>\n"+
"      <gd:phoneNumber rel='http://schemas.google.com/g/2005#work'\n"+
"        primary='true'>\n"+
"        (206)555-1212\n"+
"      </gd:phoneNumber>\n"+
"      <gd:phoneNumber rel='http://schemas.google.com/g/2005#home'>\n"+
"        (206)555-1213\n"+
"      </gd:phoneNumber>\n"+
"      <gd:im address='liz@gmail.com'\n"+
"        protocol='http://schemas.google.com/g/2005#GOOGLE_TALK'\n"+
"        primary='true'\n"+
"        rel='http://schemas.google.com/g/2005#home'/>\n"+
"      <gd:structuredPostalAddress\n"+
"          rel='http://schemas.google.com/g/2005#work'\n"+
"          primary='true'>\n"+
"        <gd:city>Mountain View</gd:city>\n"+
"        <gd:street>1600 Amphitheatre Pkwy</gd:street>\n"+
"        <gd:region>CA</gd:region>\n"+
"        <gd:postcode>94043</gd:postcode>\n"+
"        <gd:country>United States</gd:country>\n"+
"        <gd:formattedAddress>\n"+
"          1600 Amphitheatre Pkwy Mountain View\n"+
"        </gd:formattedAddress>\n"+
"      </gd:structuredPostalAddress>\n"+
"     <gContact:groupMembershipInfo deleted='false'\n"+
"            href='http://www.google.com/m8/feeds/groups/christoph256@gmail.com/base/6'/>\n"+
"    </atom:entry>"
;

script.onload = function () {
    chrome.identity.getAuthToken({'interactive': true}, function (token) {
        console.log(token);

        gapi.load("client", function () {
            gapi.client.init({
                'apiKey': 'AIzaSyDkUPOELSeSwzz0USCzk7mtRi_6Qpz8vXc',
                'discoveryDocs': ['https://people.googleapis.com/$discovery/rest?version=v1'],
            }).then(function () {
                return gapi.client.people.people.connections.list({
                    resourceName: 'people/me',
                    access_token: token
                }).then(function (response) {

                    gapi.client.request({
                        method: 'POST',
                        path: 'm8/feeds/contacts/default/full/?access_token=' + token,
                        body: entry,
                        headers: {
                            "Content-Type": "application/atom+xml; charset=UTF-8; type=feed",
                            "GData-Version": "3.0"
                        }
                        /*headers: {"Content-Type": "application/atom+xml",
                         "},*/
                    }).then(function (response) {
                        console.log(response)
                    }, function (error) {
                        console.log(error)
                    })
                }, function (reason) {
                    console.log(reason);
                });
            });
        });
    });

};

document.head.appendChild(script);

