/* =================================================================
   CYBERACADEMY PRO — Realistic Audio Engine  v2.0  |  audio.js
   4 Narration Personas  •  Natural Speech  •  Web Speech API
   ================================================================= */

'use strict';

/* ────────────────────────────────────────────────────────────────
   VOICE PERSONAS
   ──────────────────────────────────────────────────────────────── */
const PERSONAS = {
  'sir-ji': {
    id: 'sir-ji', emoji: '👨‍🏫',
    name: 'Sir Ji', nameDisplay: 'Sir Ji — हिंदी Teacher',
    lang: 'hi-IN', rate: 0.86, pitch: 0.93,
    color: '#1E40AF', bgColor: '#EFF6FF',
    desc: 'Formal classroom Hindi — structured aur clear',
    intro: 'नमस्ते, मैं हूँ Sir Ji। आपका स्वागत है इस lesson में।'
  },
  'dora': {
    id: 'dora', emoji: '🔵',
    name: 'Dora', nameDisplay: 'Dora — दोस्ताना हिंदी',
    lang: 'hi-IN', rate: 1.02, pitch: 1.18,
    color: '#0891B2', bgColor: '#ECFEFF',
    desc: 'Fun, energetic — Doraemon-style Hindi friend!',
    intro: 'Yaar yaar yaar! Main hoon Dora! Aaj bahut maza aane wala hai!'
  },
  'prof-alex': {
    id: 'prof-alex', emoji: '🎓',
    name: 'Prof. Alex', nameDisplay: 'Prof. Alex — English Academic',
    lang: 'en-GB', rate: 0.84, pitch: 0.90,
    color: '#7C3AED', bgColor: '#F5F3FF',
    desc: 'British academic — precise and authoritative',
    intro: 'Good day. I am Professor Alex. Let us begin today\'s lesson.'
  },
  'ryan': {
    id: 'ryan', emoji: '🎤',
    name: 'Ryan', nameDisplay: 'Ryan — English Casual',
    lang: 'en-US', rate: 1.0, pitch: 1.08,
    color: '#059669', bgColor: '#ECFDF5',
    desc: 'Chill American style — like a senior explaining to you',
    intro: 'Hey! What\'s up. I\'m Ryan. Let\'s learn this together, it\'s actually really cool stuff.'
  }
};

/* ────────────────────────────────────────────────────────────────
   NARRATION SCRIPTS — Natural, Conversational, Multi-Voice
   Each section has all 4 persona scripts
   ──────────────────────────────────────────────────────────────── */
const SCRIPTS = {

  'hero': {
    'sir-ji': `
नमस्ते! CyberAcademy Pro के Module 2 में आपका हार्दिक स्वागत है।

मैं हूँ Sir Ji। और आज से हम शुरू कर रहे हैं एक बहुत महत्वपूर्ण topic।

LDAP। Lightweight Directory Access Protocol।

यह topic सुनने में technical लगता है। लेकिन मैं आपसे वादा करता हूँ, इस module के अंत तक आप इसे पूरी तरह समझ जाएंगे।

LDAP वह protocol है जो Active Directory की रीढ़ की हड्डी है।

हर बार जब आप किसी corporate network में login करते हैं, LDAP काम करता है।
हर बार जब कोई application user को verify करती है, LDAP काम करता है।
हर बार जब BloodHound domain enumerate करता है, LDAP काम करता है।

इस module में हम सीखेंगे कि LDAP क्या है, यह कैसे काम करता है, और attackers इसे कैसे exploit करते हैं।

तो चलिए, शुरू करते हैं। Scroll करते रहिए।`,

    'dora': `
Yaar! Yaar! Yaar! Module 2 shuru ho gaya!

Main hoon Dora, aur aaj hum sikhenge LDAP!

Ek second ruko. LDAP kya hota hai? Sound karta hai kuch boring sa, right?

BILKUL NAHI! Yaar, yeh toh sabse interesting cheez hai!

Socho aise: Active Directory ek giant building hai. LDAP woh door hai jisse tum us building ke andar jaate ho!

Bina LDAP ke? Building mein ghusna impossible!

BloodHound use karta hai LDAP. NetExec use karta hai LDAP. ldapsearch use karta hai LDAP.

Yeh sikhoge toh OSCP mein, HTB mein, real-world mein, sab jagah kaam aayega!

Excited ho? Main toh bahut excited hoon! Let's goooo!`,

    'prof-alex': `
Good day, and welcome to Module Two of our cybersecurity curriculum.

I am Professor Alex, and today we begin our study of LDAP — the Lightweight Directory Access Protocol.

Now, I appreciate that the name sounds rather dry. But I assure you, this protocol is absolutely foundational to understanding enterprise security.

LDAP is the query language of Active Directory. Without it, no enterprise identity system could function.

In this module, we will cover thirty-five lessons — from the absolute basics of directory services, through to advanced attack and defence techniques used in real penetration tests.

By the end, you will understand LDAP not just theoretically, but practically — how to query it, abuse it, and defend it.

Let us begin. Please proceed to lesson one.`,

    'ryan': `
Hey! Welcome to Module 2!

So we're doing LDAP today, and honestly? This is the stuff that'll make you dangerous on any pentest.

I'm Ryan, and I'm gonna walk you through LDAP from scratch.

Think of it this way — Active Directory is like a massive spreadsheet with all the company's users, computers, groups, passwords, everything.

LDAP is the language you use to talk to that spreadsheet.

Wanna find all domain admins? LDAP. Wanna enumerate users? LDAP. Wanna dump attributes? LDAP.

BloodHound, NetExec, ldapsearch — they all talk LDAP under the hood.

We've got like 35 lessons here, but I promise we'll keep it fun. Scroll down and let's get into it!`
  },

  'what-is-ldap': {
    'sir-ji': `
Lesson 1 — LDAP क्या है।

LDAP का full form है — Lightweight Directory Access Protocol।

चलिए इसे तोड़कर समझते हैं।

पहला शब्द है Lightweight। इसका मतलब है यह protocol simple और fast है। यह heavy नहीं है।

दूसरा शब्द है Directory। Directory का मतलब है एक organized collection of information। जैसे phone directory में नाम और numbers होते हैं।

तीसरा शब्द है Access Protocol। यह वह set of rules है जिसके according information को access किया जाता है।

तो LDAP एक ऐसा protocol है जो हमें directory services को access करने का तरीका देता है।

LDAP 1993 में University of Michigan में develop हुआ था। इसे बनाने का मकसद था कि एक simple protocol बनाया जाए जो heavy DAP protocol का alternative हो।

Microsoft ने Windows 2000 में LDAP को Active Directory का core protocol बनाया।

LDAP port 389 पर run करता है। Secure LDAP, जिसे LDAPS कहते हैं, port 636 पर run करता है।

Real world में LDAP का use होता है — user authentication में, email address lookup में, और enterprise applications में user information fetch करने के लिए।`,

    'dora': `
Yaar! Lesson ek!

LDAP kya hai? Okay okay, naam thoda boring hai. LDAP. Lightweight Directory Access Protocol. 

Lightweight matlab? LIGHT! Fast! Chhota! Efficient!

Directory matlab? Socho ek bahut bada phone book. Lekin sirf phone numbers nahi, usmein sab kuch hai! Name, password, email, groups, permissions, sab kuch!

Access Protocol matlab? Woh set of rules jo batata hai — is phone book se data kaise maango, kaise update karo, kaise delete karo!

Toh LDAP basically ek language hai! Jisme tum Active Directory se baat karte ho!

Kab bana? 1993 mein! University of Michigan ke kuch smart logon ne banaya!

Microsoft ne socha — wow, yeh toh kaafi accha hai! Aur 2000 mein Active Directory mein daal diya!

Port? LDAP ka default port hai 389. Secure version ka port hai 636. Yeh yaad rakho, bohot kaam aayega!

Kya socha? Simple hai na? Chalte hain aage!`,

    'prof-alex': `
Lesson one. What is LDAP?

LDAP stands for Lightweight Directory Access Protocol.

Let us examine each component of this name carefully.

Lightweight. This refers to the protocol's design philosophy — it was intentionally designed to be simpler and less resource-intensive than its predecessor, the Directory Access Protocol, or DAP.

Directory. In computing, a directory is a specialised database optimised for read operations. Unlike relational databases, directories are hierarchical and designed to store identity information — users, groups, devices, policies.

Access Protocol. This defines the standardised set of operations and message formats used to interact with the directory.

LDAP was developed in 1993 by Tim Howes, Mark Smith, and Gordon Good at the University of Michigan, as a lightweight client interface to the X.500 directory standard.

Microsoft incorporated LDAP version 3 as the native protocol for Active Directory in Windows 2000 Server, and it remains so today.

The standard port is 389 for unencrypted communications, and 636 for LDAP over TLS, commonly referred to as LDAPS.`,

    'ryan': `
Alright, lesson one. What even is LDAP?

LDAP — Lightweight Directory Access Protocol.

Let me break that down real quick.

Lightweight? Yeah it's fast and efficient. Doesn't take a lot of resources.

Directory? Think of it like a phonebook on steroids. Instead of just names and numbers, it stores everything about every user, computer, and group in the company. Department, email, manager, password hash, group memberships... everything.

Access Protocol? It's basically the language you use to talk to that phonebook. Read from it, write to it, search through it.

LDAP was invented in 1993 at the University of Michigan. Some dudes were like, let's make a simpler way to query directories. And they did.

Then Microsoft goes, hey this is great, and bakes it right into Active Directory.

Now, practically speaking — when you're doing a pentest and you run BloodHound, or ldapsearch, or NetExec with the ldap module? You're speaking LDAP to the Domain Controller.

Ports to know: 389 is standard LDAP. 636 is LDAPS — that's LDAP over TLS, encrypted.`
  },

  'ldap-architecture': {
    'sir-ji': `
Lesson 5 — LDAP Architecture।

अब हम समझेंगे कि LDAP का architecture कैसे designed है।

LDAP एक client-server model follow करता है।

इसमें तीन main components होते हैं।

पहला है LDAP Client। यह कोई भी application हो सकती है — BloodHound, Outlook, एक PowerShell script — जो LDAP queries send करती है।

दूसरा है LDAP Server। Active Directory के case में, यह Domain Controller होता है। यह LDAP requests receive करता है और responses देता है।

तीसरा है Directory Information Tree, जिसे हम DIT कहते हैं। यह वह hierarchical structure है जिसमें सारा data store होता है।

DIT का structure एक उल्टे tree की तरह होता है।

सबसे ऊपर होता है Root। फिर उसके नीचे आते हैं Domain Components। फिर Organizational Units। और सबसे नीचे होते हैं actual objects जैसे Users, Computers, Groups।

जब LDAP Client को कुछ search करना होता है, तो वह एक SearchRequest message send करता है।

इस request में होता है — Base DN, जो बताता है कहाँ से search शुरू करें। Search Scope, जो बताता है कितनी depth तक जाएं। और Filter, जो बताता है क्या ढूंढना है।

Server यह सब process करता है और SearchResultEntry messages return करता है।

यह पूरा conversation TCP port 389 पर होता है।`,

    'dora': `
Yaar! Ab samjhte hain LDAP ka architecture!

Okay toh basically yeh ek bada game hai — Client versus Server!

Client — woh jo maangta hai. Jaise BloodHound, ya ldapsearch, ya koi bhi app.

Server — woh jo deta hai. Domain Controller! Woh bechara din raat LDAP requests handle karta rehta hai!

Aur beech mein? Ek giant tree! Isko kehte hain Directory Information Tree, ya DIT!

Socho aise — ek seedha tree, lekin ulta khada hai. Roots upar, patte neeche.

Bilkul upar hai Root. Phir aate hain Domain Components, jaise DC=corp,DC=local. Phir Organizational Units. Phir sab objects — users, computers, groups!

Jab client kuch dhundta hai, toh woh bolctha hai — "Yaar Server ji, mujhe yahan se dekho, itni gehraai mein jao, aur yeh filter lagao!"

Server sunता है, DIT mein dhundta hai, aur reply karta hai — "Lo yeh raha, yeh raha, yeh raha!"

Sab kuch TCP 389 pe hota hai!

Simple hai na? Tree structure! Upar se neeche! Client-Server!`,

    'prof-alex': `
Lesson five. LDAP Architecture.

LDAP employs a standard client-server architecture, operating over TCP/IP.

The client initiates a connection to the server, typically on port 389. The server, in Active Directory environments, is the Domain Controller.

The data stored on the LDAP server is organised as a Directory Information Tree, abbreviated DIT. This is a hierarchical, inverted tree structure.

At the apex of the tree is the Root. Beneath it are entries representing the domain, using Domain Component, or DC, notation. Beneath those are Organisational Units, and within OUs reside the actual directory objects — users, computers, groups, and so forth.

Communication occurs via LDAP messages, defined in RFC 4511. Each message is encoded using ASN.1 BER encoding.

When a client wishes to search, it sends a SearchRequest message specifying three key parameters. First, the Base Distinguished Name — the point in the tree from which to begin searching. Second, the scope — whether to search just the base entry, its immediate children, or the entire subtree. Third, the filter — a boolean expression defining which entries to return.

The server responds with zero or more SearchResultEntry messages, followed by a final SearchResultDone message.

This request-response pattern underpins all LDAP operations.`,

    'ryan': `
Okay, LDAP architecture. Let's map this out.

It's a classic client-server setup.

The client is anything that wants to talk to Active Directory — BloodHound, ldapsearch, your PowerShell scripts, even Outlook when it looks up email addresses.

The server is the Domain Controller. It runs LDAP and handles all the requests.

Now, all the data is stored in what's called the Directory Information Tree, or DIT. It's a tree structure — think of a file system, but for identity data.

At the top is the root. Then you've got your domain like DC=corp,DC=local. Inside that, Organizational Units like OU=Users, OU=Computers. And inside those, the actual objects.

When a client wants to search for something, it sends a SearchRequest. That request has three things in it.

One — the Base DN. Where do you want to start searching in the tree?

Two — the Scope. How deep do you want to go? Just the base object? One level down? Or the entire subtree?

Three — the Filter. What are you actually looking for? Like, give me all users with SPN set. Or give me all computers in the IT OU.

The server finds the matching entries and sends them back. Simple.`
  },

  'distinguished-names': {
    'sir-ji': `
Distinguished Names — यह topic बहुत important है।

LDAP में हर object का एक unique address होता है। इसे Distinguished Name, या DN, कहते हैं।

DN का structure होता है — comma से separated attributes का एक sequence।

Example: CN=Alice,OU=Engineering,DC=corp,DC=local

इसे पढ़ते हैं right to left, यानी tree की root से object तक।

DC=local — यह top-level domain है।
DC=corp — यह second level domain है।
OU=Engineering — यह Organizational Unit है।
CN=Alice — यह Alice का Common Name है।

तो Alice एक user है, जो Engineering OU में है, जो corp.local domain में है।

अब समझते हैं हर component को।

DC — Domain Component। Domain name के parts को represent करता है।

OU — Organizational Unit। Container objects हैं जो users और computers को organize करते हैं।

CN — Common Name। किसी specific object का name।

O — Organization। कभी-कभी company का नाम।

L — Locality। Location।

ST — State।

C — Country।

एक DN जितना specific होगा, उतना ही tree में deep होगा।

RDN — Relative Distinguished Name — यह DN का वह part होता है जो किसी particular level पर unique होता है।

जैसे — CN=Alice उस OU के level पर RDN है।

Attackers के लिए DN बहुत useful है। जब आप BloodHound से enumeration करते हैं, तो हर object का पूरा DN दिखता है जिससे आप उसकी exact location समझ सकते हैं।`,

    'dora': `
Yaar! Yaar! Ab LDAP ka GPS system!

Naam kya hai? Distinguished Name! DN!

Dekho, agar tum kissi bhi AD object ka exact address jaanna chahte ho, woh DN mein hota hai!

Example lo: CN=Alice,OU=Engineering,DC=corp,DC=local

Isko padhte hain right se left!

DC=local — yeh sabse upar wala part hai. Top-level domain!
DC=corp — iske neeche! corp.local!
OU=Engineering — aur is OU ke andar...
CN=Alice — yeh hai Alice! Mil gayi!

Samjhe? Jaise address likhte ho — Country, State, City, Street, House Number!

Bas yahan ulta padhna hota hai!

Ab components yaad karo!

DC — Domain Component! Domain ke parts!
OU — Organizational Unit! Jaise folders!
CN — Common Name! Object ka actual naam!

RDN ka matlab? Relative DN! Ek level pe jo unique part hai!

Yaar, jab tum ldapsearch chalate ho ya BloodHound, tab yeh DNs sab jagah dikhte hain!

Example: CN=Domain Admins,CN=Users,DC=corp,DC=local

Matlab Domain Admins group hai, Users container mein, corp.local domain mein!

Simple hai na? GPS of Active Directory!`,

    'prof-alex': `
Distinguished Names. This is a fundamental concept in LDAP.

Every entry in the LDAP directory is uniquely identified by its Distinguished Name, or DN.

A Distinguished Name is a string composed of Relative Distinguished Name components, separated by commas, read from the most specific on the left to the most general on the right.

Consider this example: CN equals Alice, OU equals Engineering, DC equals corp, DC equals local.

Reading from right to left, we have DC equals local — the top-level domain component. DC equals corp — the second domain component, giving us corp dot local. OU equals Engineering — the Organizational Unit named Engineering. And finally, CN equals Alice — the Common Name of the specific entry.

The DN uniquely identifies Alice's account within the corp.local domain.

The standard attribute types used in Distinguished Names are as follows.

DC, Domain Component, represents a component of the domain name. OU, Organizational Unit, represents a container. CN, Common Name, identifies a specific object. O, Organisation. L, Locality. ST, State or Province. C, Country.

The Relative Distinguished Name is the portion of the DN that is unique at a given level in the tree. In our example, CN equals Alice is the RDN within the Engineering OU.

Understanding DNs is essential for constructing LDAP queries and for interpreting the output of enumeration tools such as BloodHound and ldapsearch.`,

    'ryan': `
Distinguished Names. This is super important, and honestly not that complicated once you see it.

Every single object in Active Directory has a unique address called a Distinguished Name, or DN.

Here's an example: CN=Alice,OU=Engineering,DC=corp,DC=local

Read it from right to left — it's like a path from the root down to the object.

DC=local — that's the top of the domain. DC=corp — so now we're at corp.local. OU=Engineering — we're inside the Engineering OU. CN=Alice — and there she is.

The components are pretty straightforward.

DC is Domain Component. These come from the domain name — corp.local becomes DC=corp, DC=local.

OU is Organizational Unit. Think of these as folders.

CN is Common Name. That's the name of the actual object.

Now the Relative Distinguished Name, or RDN — that's just the left-most part of the DN. The part that's unique at that level in the tree. So CN=Alice is the RDN.

Why do you care? Because when you're running ldapsearch or looking at BloodHound output, you're gonna see DNs everywhere.

Like CN=Domain Admins,CN=Users,DC=corp,DC=local — that's telling you exactly where in the directory the Domain Admins group lives.`
  },

  'ldap-operations': {
    'sir-ji': `
LDAP Operations — यह section बहुत practical है।

LDAP में 8 main operations होते हैं।

पहली operation है Bind। यह authentication step है। Client server को बताता है कि मैं कौन हूँ और मुझे यह काम करने का अधिकार है।

दूसरी है Search। यह सबसे commonly used operation है। Directory से data retrieve करने के लिए।

तीसरी है Add। नए objects create करने के लिए।

चौथी है Modify। Existing objects के attributes change करने के लिए।

पाँचवीं है Delete। Objects हटाने के लिए।

छठी है Compare। यह check करता है कि किसी object का specific attribute कोई particular value है या नहीं।

सातवीं है ModifyDN। किसी object को rename करना या move करना।

आठवीं है Extended Operations। Custom operations के लिए जो standard में नहीं हैं।

Security perspective से सबसे important operations हैं Bind और Search।

Attacker पहले Bind करता है — या तो valid credentials से, या anonymous bind try करता है।

फिर Search operation से पूरा domain enumerate करता है।

अगर Anonymous Bind allowed है, तो बिना किसी credentials के पूरा AD structure देखा जा सकता है। यह बहुत बड़ी security misconfiguration है।

Defense में हमेशा ensure करें कि Anonymous Bind disabled हो और सभी LDAP operations logged हों।`,

    'dora': `
LDAP Operations! Yeh section toh ekdum mast hai!

Toh basically LDAP mein aath cheezein kar sakte ho!

Pehla — Bind! Yeh login jaisa hai! "Bhai, main hoon, yeh mera ID hai!" Server bolega — "Theek hai, aa jao!"

Doosra — Search! Sabse jyada use hota hai! "Mujhe sab users dhundo!" "Mujhe sab Domain Admins dhundo!" Yeh sab Search se hota hai!

Teesra — Add! Naya object banana hai? Add karo!

Chautha — Modify! Kisi ki attribute change karni hai? Modify!

Paanchva — Delete! Object hatana hai? Delete!

Chhatha — Compare! Check karo kya yeh attribute is value ke equal hai?

Saatva — ModifyDN! Object ko rename karo ya dusri jagah move karo!

Aathva — Extended Operations! Custom kaam karne ke liye! Jaise password change!

Ab HACKER wala angle sunno!

Pehle attacker Bind karta hai — ya credentials se, ya ANONYMOUS BIND se!

Anonymous Bind kya hai? Bhai! Bina password ke LDAP access! Imagine karo, koi bhi aake AD ka sara data dekh sakta hai! Yeh toh disaster hai!

Phir Search karta hai — sab users, sab groups, sab computers, sab SPNs — sab nikal leta hai!

Isliye defenders ko Anonymous Bind BAND karna chahiye! Aur sab LDAP events log karne chahiye!`,

    'prof-alex': `
LDAP Operations. Let us examine each operation systematically.

The Bind operation authenticates the client to the server. It establishes the identity under which subsequent operations will be authorised.

The Search operation retrieves entries matching specified criteria. It is by far the most frequently used LDAP operation.

The Add operation creates a new entry in the directory.

The Modify operation changes one or more attributes of an existing entry.

The Delete operation removes an entry from the directory.

The Compare operation tests whether a named attribute of an entry has a particular value, returning a boolean result.

The ModifyDN operation renames or relocates an entry within the directory tree.

Extended Operations provide a mechanism for protocol extensions. Password modification is a notable example.

From a security perspective, the Bind and Search operations are most significant.

An attacker will typically first attempt a Bind — either with stolen credentials, or speculatively, as an Anonymous Bind. Anonymous binding, if permitted, allows directory enumeration without any credentials whatsoever.

Following a successful Bind, an attacker will issue Search requests to enumerate users, groups, computers, Service Principal Names, and permission objects.

Defenders should ensure Anonymous Bind is disabled on all Domain Controllers, enforce LDAPSigning to prevent man-in-the-middle attacks, and log all LDAP Search operations for anomaly detection.`,

    'ryan': `
Alright, LDAP operations. There are eight of them and they're not complicated.

Bind — this is authentication. You're basically saying, hey server, here's who I am. The server says, cool, you're in.

Search — this is the big one. This is how you query the directory. Give me all users. Give me all Domain Admins. Give me everything with an SPN set.

Add — create a new directory object.

Modify — change attributes on an existing object.

Delete — remove an object.

Compare — check whether an attribute has a specific value. Returns true or false.

ModifyDN — rename or move an object within the tree.

Extended Operations — custom stuff. Password resets use this.

Now from an attacker's perspective, here's what matters.

First, you try to Bind. You might use credentials you've already got. Or you try an Anonymous Bind — no credentials at all. If Anonymous Bind is enabled, you can enumerate the entire AD without needing a single password. That's a massive misconfiguration.

After Bind, you Search. And with the right LDAP filter, you can pull out all users, all groups, all computers, Kerberoastable accounts, anything with interesting attributes.

Tools like NetExec with --ldap, ldapsearch, and BloodHound's collection methods all work exactly this way.`
  },

  'ldap-ports': {
    'sir-ji': `
LDAP Ports — यह तो हर interview में पूछा जाता है!

Port 389 — यह standard LDAP port है। Default। Unencrypted। सारी communication यहाँ होती है।

Port 636 — यह LDAPS port है। LDAP over SSL या TLS। Encrypted communication।

Port 3268 — यह Global Catalog LDAP port है। जब आपको पूरे forest में search करना हो।

Port 3269 — यह Global Catalog LDAPS port है। Global Catalog पर encrypted connection।

अब इनका use कब होता है?

जब आप same domain में query करते हैं — port 389।
जब आप forest-wide search करते हैं — port 3268।
जब encryption required हो — 636 या 3269।

Nmap scan में क्या देखें?

अगर 389 open है, तो LDAP available है।
अगर 3268 open है, तो यह Domain Controller है, और Global Catalog भी run हो रहा है।

SMB signing और LDAP signing relate करते हैं — अगर LDAP signing enforce नहीं है, तो LDAP relay attack possible है।

Wireshark में port 389 filter करके LDAP traffic capture कर सकते हैं।`,

    'dora': `
Ports! Ports! Ports! Yeh toh exam aur interview dono mein poochhte hain!

Port 389 — LDAP! Basic! Default! Unencrypted!

Socho yeh ek open door hai. Koi bhi aake traffic dekh sakta hai agar SSL nahi hai!

Port 636 — LDAPS! LDAP with SSL! Encrypted! Safe wala! 

Port 3268 — Global Catalog! Poore forest ko search karna hai? Yeh port use karo!

Port 3269 — Global Catalog with SSL! Secure version!

Attacker kya karta hai?

Pehle Nmap chalata hai — nmap -sV -p 389,636,3268,3269 target!

Agar 389 open hai — party shuru!

Agar 3268 open hai — Global Catalog bhi hai, matlab poore forest ki info milegi!

Phir ldapsearch chalata hai aur data nikalta hai!

LDAP Relay Attack bhi hota hai — agar LDAP signing disabled hai, to NTLM relay karke koi bhi LDAP operation kar sakte ho!

Yaar defense mein kya karo?

LDAP signing enable karo! LDAPS mandatory karo! Aur ports ko firewall se restrict karo sirf authorized IPs ke liye!

Simple na? Four ports! 389, 636, 3268, 3269! Done!`,

    'prof-alex': `
LDAP Ports. A critical topic for both examination purposes and practical work.

Port 389. This is the standard LDAP port. All unencrypted LDAP communications occur here by default. Credentials and data transmitted on this port are visible in plaintext to any network observer.

Port 636. This is LDAPS — LDAP over TLS. All communications are encrypted, protecting against eavesdropping and credential theft.

Port 3268. This is the Global Catalog LDAP port. The Global Catalog contains a partial replica of all objects in the entire forest, enabling forest-wide searches. This port is essential when searching across multiple domains.

Port 3269. This is the Global Catalog LDAPS port — encrypted Global Catalog queries.

From a security standpoint, port 389 presents a significant risk if LDAP signing is not enforced. Without signing, an attacker positioned on the network can perform LDAP relay attacks — intercepting authentication attempts and relaying them to the Domain Controller.

When assessing an Active Directory environment, identifying open LDAP ports via port scanning is an early enumeration step. The presence of port 3268 confirms a Domain Controller with Global Catalog functionality.

Organisations should enforce LDAP channel binding and signing, and where possible, require LDAPS exclusively.`,

    'ryan': `
Ports. Four you need to know for LDAP.

389 — plain LDAP. Default. Unencrypted. Everything you send and receive is plaintext on the wire. Passwords, user data, all of it.

636 — LDAPS. That's LDAP over TLS. Encrypted. This is what you want to use.

3268 — Global Catalog LDAP. When you need to search across the whole forest, not just one domain, you hit this port.

3269 — Global Catalog LDAPS. Encrypted version of that.

In practice, during a pentest you'll Nmap the target and look for these ports open.

If 389 is open, you can try LDAP enumeration. If 3268 is open too, that's a Domain Controller with Global Catalog — even better, you can get forest-wide data.

Now here's the attack angle. If LDAP signing isn't enforced, you can do an LDAP relay attack. You catch an NTLM authentication on the network, relay it to the LDAP server, and perform operations as that user — like adding yourself to Domain Admins. Tools like ntlmrelayx from Impacket do exactly this.

For defense: enforce LDAP signing and channel binding, push for LDAPS everywhere, and make sure you're logging and alerting on connections to port 389 from unexpected hosts.`
  },

  'ldap-attacks': {
    'sir-ji': `
LDAP Attacks — यह section बहुत practical है।

चलिए सबसे common LDAP-based attacks देखते हैं।

पहला है LDAP Enumeration।

कोई भी authenticated domain user LDAP से domain की information query कर सकता है।

Command: ldapsearch -x -H ldap://DC01 -b "DC=corp,DC=local" "(objectClass=user)"

यह command सभी user objects return करेगा।

दूसरा है Anonymous Bind Exploitation।

अगर Anonymous Bind enabled है, तो बिना credentials के भी enumeration possible है।

Command: ldapsearch -x -H ldap://DC01 -b "DC=corp,DC=local"

तीसरा है LDAP Injection।

अगर कोई web application user input को directly LDAP filter में डालती है बिना sanitize किए, तो LDAP injection possible है।

Example: User input: *)(&

यह filter को modify कर देता है।

चौथा है LDAP Relay Attack।

अगर LDAP signing disabled है और attacker network में है, तो वह NTLM authentication को capture करके LDAP server पर relay कर सकता है।

पाँचवाँ है Credential Harvesting via LDAP।

BloodHound और SharpHound LDAP से सारे object relationships collect करते हैं।

Defense में:
Anonymous bind disable करें।
LDAP signing enforce करें।
Web applications में LDAP input sanitize करें।
LDAP traffic monitor करें।`,

    'dora': `
ATTACKS! Ab asli maza aata hai!

Yaar, LDAP ke through kitna kuch kar sakte hain! Dekho!

Attack number ek — LDAP Enumeration!

Koi bhi domain user LDAP se sab kuch dekh sakta hai! Sab users, sab groups, sab computers!

ldapsearch -x -H ldap://DC01 -b "DC=corp,DC=local" "(objectClass=user)"

Bas itna chalao, sab user mil jaate hain! Kya scene hai!

Attack number do — Anonymous Bind!

Agar yeh enable hai, credentials bhi nahi chahiye!

ldapsearch -x -H ldap://DC01 -b "DC=corp,DC=local"

Bas! No password, full enumeration!

Attack number teen — LDAP Injection!

Web app ne LDAP filter mein user input directly daal diya? Injection karo!

Input: star close-bracket open-bracket ampersand

Filter tod do!

Attack number chaar — LDAP Relay!

LDAP signing nahi hai? NTLM authentication pakdo, LDAP mein relay karo, Domain Admins mein khud ko daal lo!

ntlmrelayx -t ldap://DC01 --escalate-user alice

Bas! Domain Admin ban gaye!

Attack number paanch — BloodHound!

LDAP se sab relationships collect karo, graph banao, attack path dhundo!

Yaar, yeh sab LDAP ki wajah se possible hai!

Defense? Anonymous bind band karo, LDAP signing on karo, monitor karo!`,

    'prof-alex': `
LDAP Attacks. Let us examine the primary attack vectors targeting LDAP.

The first and most fundamental is Unauthenticated Enumeration, or Anonymous Bind exploitation.

If Anonymous Bind is enabled, an attacker requires no credentials to query the directory. The command ldapsearch with the x flag for simple authentication and no bind credentials will succeed. This is a critical misconfiguration that should be remediated immediately.

Second is Authenticated Enumeration. Any valid domain account — even a standard low-privilege user — can query LDAP for a wealth of information. User accounts, group memberships, computer accounts, Service Principal Names, and ACL information are all accessible.

Tools such as BloodHound leverage this by issuing LDAP queries to collect the entire graph of Active Directory relationships, revealing attack paths to Domain Administrator.

Third is LDAP Injection. Web applications that construct LDAP filters using unvalidated user input are vulnerable. A classic payload such as asterisk, closing parenthesis, opening parenthesis, ampersand can break out of the intended filter and expose or modify additional entries.

Fourth is the LDAP Relay Attack. If LDAP signing and channel binding are not enforced, an attacker can relay captured NTLM authentication to the Domain Controller's LDAP service. This can be used to create new accounts, modify group memberships, or perform DCSync-enabling attribute modifications. Impacket's ntlmrelayx is the standard tool for this.

Mitigations include enforcing LDAP signing, enabling channel binding, disabling anonymous bind, and monitoring LDAP traffic for anomalous patterns.`,

    'ryan': `
Attacks. This is where it gets fun.

Let me walk you through the main LDAP attack vectors.

One — Unauthenticated enumeration via Anonymous Bind.

If the DC has Anonymous Bind enabled, you don't even need credentials.

ldapsearch -x -H ldap://10.10.10.10 -b "DC=corp,DC=local"

That's it. No password. You get back everything. Users, groups, computer accounts. This is rare now, but it still shows up in older environments.

Two — Authenticated enumeration.

With any valid domain user, you can query LDAP for a ton of stuff. SPNs for Kerberoasting. Users with no Kerberos pre-auth for AS-REP Roasting. Everyone's group memberships. ACL configurations.

BloodHound automates all of this by firing a bunch of LDAP queries and building a graph.

Three — LDAP Injection.

If a web app builds LDAP filter strings with user input and doesn't sanitize it, you can inject. Classic payload: *)(&. This breaks out of the filter and can return all objects.

Four — NTLM Relay to LDAP.

This is spicy. If LDAP signing is off, you can relay captured NTLM hashes to the LDAP service.

ntlmrelayx.py -t ldap://DC01 --escalate-user lowprivuser

You can use this to add yourself to Domain Admins. No password cracking needed.

Defense: enable LDAP signing, enable channel binding, kill anonymous bind, and monitor for bulk LDAP searches.`
  },

  'tools': {
    'sir-ji': `
Tools Section — आइए practical tools सीखते हैं।

पहला tool है ldapsearch।

यह command-line tool है जो Linux पर ldap-utils package में आता है।

Basic syntax: ldapsearch -x -H ldap://server -b "baseDN" "filter"

Option -x simple authentication के लिए।
Option -H LDAP server specify करने के लिए।
Option -b base DN specify करने के लिए।
Option -D bind DN के लिए।
Option -W password prompt के लिए।

Example — सभी users enumerate करना:
ldapsearch -x -H ldap://DC01 -D "user@corp.local" -W -b "DC=corp,DC=local" "(objectClass=user)" sAMAccountName mail

दूसरा tool है NetExec, जिसे पहले CrackMapExec कहते थे।

nxc ldap DC01 -u alice -p Password123 --users
यह command सभी domain users list करेगा।

nxc ldap DC01 -u alice -p Password123 --groups
यह सभी groups list करेगा।

तीसरा powerful tool है BloodHound।

SharpHound data collect करता है। BloodHound उसे visualize करता है।

यह LDAP queries से complete AD graph बनाता है।

Shortest path to Domain Admin automatically find करता है।

यह pentesters का favorite tool है।

चौथा है bloodyAD — यह Python-based tool है जो बिना Mimikatz के AD modifications कर सकता है।

Defense में इन सभी tools के patterns को SIEM में detect करना चाहिए।`,

    'dora': `
Tools! Tools! Tools! Ab asli action!

Tool number ek — ldapsearch!

Linux ka superhero! LDAP queries command line se!

ldapsearch -x -H ldap://DC01 -D "alice@corp.local" -W -b "DC=corp,DC=local" "(objectClass=user)" sAMAccountName

Matlab — simply login karo as Alice, aur sab users ke SAM account names le aao!

Options yaad karo:
Minus x — simple auth!
Minus H — server!
Minus b — base DN!
Minus D — bind karne ki account!
Minus W — password mangega!

Tool number do — NetExec! Pehle iska naam tha CrackMapExec!

nxc ldap DC01 -u alice -p Password123 --users

Bas ek command mein sare users! Magical hai!

nxc ldap DC01 -u alice -p Password123 --groups
Groups bhi!

nxc ldap DC01 -u alice -p Password123 --trusted-for-delegation
Kerberoasting targets!

Tool number teen — BLOOOOODHOUND!

Yaar, yeh toh ek full movie hai!

SharpHound LDAP se sab data collect karta hai.
BloodHound usse ek beautiful graph mein dikhata hai.
Attack path automatically nikal deta hai!

OU se Domain Admin tak ka rasta? BloodHound batayega!

Tool number chaar — bloodyAD!

Python se AD modify karo bina Mimikatz ke!

python bloodyAD.py --host DC01 -u alice -p Password123 addObjectToGroup alice "Domain Admins"

Seedha Domain Admin group mein ghus gaye!

Yaar, yeh sab tools LDAP pe depend karte hain!`,

    'prof-alex': `
Tool Reference. I shall cover the primary tools used for LDAP interaction in penetration testing contexts.

ldapsearch. This is the standard command-line LDAP client included in the ldap-utils package on Linux systems. It is the foundation for manual LDAP enumeration.

The basic syntax is: ldapsearch, with the x flag for simple authentication, H flag specifying the LDAP URI, D flag for the bind distinguished name, W to prompt for password, b flag for the base DN, followed by the search filter and optional attribute list.

NetExec, formerly known as CrackMapExec. This is a comprehensive network exploitation tool with robust LDAP capabilities. Using the ldap protocol module, one can enumerate users, groups, password policies, trusted domains, Kerberos delegation configurations, and much more with simple command-line flags.

BloodHound. This is perhaps the most significant Active Directory enumeration tool available. It consists of two components — SharpHound, a C-sharp data collector that issues extensive LDAP queries to gather user, group, computer, GPO, and ACL data — and the BloodHound graphical interface, which visualises the collected data as a graph and automatically identifies attack paths to Domain Administrator.

bloodyAD. A Python library and command-line tool for Active Directory manipulation via LDAP and Kerberos, useful for performing privilege escalation operations without requiring Mimikatz.

From a defensive perspective, security teams should configure SIEM rules to detect the characteristic patterns of these tools — specifically, high-volume LDAP queries from workstations, queries for specific sensitive attributes, and connections to port 389 from unexpected sources.`,

    'ryan': `
Tools. Let's go through the main ones you'll use.

ldapsearch — this is your manual LDAP query tool on Linux. Super flexible, low-level control.

ldapsearch -x -H ldap://10.10.10.10 -D "alice@corp.local" -W -b "DC=corp,DC=local" "(objectClass=user)" sAMAccountName memberOf

That says: connect to this DC, bind as alice, search from the domain root, find all user objects, return their SAM account names and group memberships.

NetExec — this is your Swiss army knife. It wraps all the common LDAP queries into neat flags.

nxc ldap DC01 -u alice -p Password123 --users — gets all users.
nxc ldap DC01 -u alice -p Password123 --kerberoasting output.txt — finds SPNs for Kerberoasting.
nxc ldap DC01 -u alice -p Password123 --asreproast output.txt — finds accounts without pre-auth.

BloodHound — this is the one that really changed pentesting.

You run SharpHound to collect data via LDAP. It queries everything — users, groups, computers, GPOs, ACLs, sessions.

Then you open BloodHound and it shows you a graph. You can query it with Cypher — find shortest path to Domain Admins, find all Kerberoastable users, find DCSync rights. All the dangerous paths show up visually.

bloodyAD — Python tool for doing AD modifications over LDAP. Great for post-exploitation when you have write privileges but not RDP.

All of these fundamentally speak LDAP. That's why understanding the protocol matters.`
  },

  'quiz-section': {
    'sir-ji': `
Knowledge Check!

बधाई हो! आपने Module 2 — LDAP का पूरा content पढ़ लिया।

अब 10 questions का quiz है।

यह quiz cover करेगा — LDAP basics, architecture, DN, operations, ports, attacks, और tools।

हर wrong answer के बाद explanation ध्यान से पढ़ें।

अगर score 80% से ज़्यादा है, तो आप Module 3 के लिए ready हैं।

Module 3 में हम BloodHound और SharpHound को deeply cover करेंगे।

All the best!`,

    'dora': `
QUIZ TIME! QUIZ TIME! QUIZ TIME!

Yaar, ab test lenge! Par darene ki zaroorat nahi!

10 questions hain! Sab module se hi hain!

Galat jawab ho toh tension mat lo — explanation padho, samjho, aage badho!

80 percent se upar? Module 3 ready!

Module 3 mein kya hai? BloodHound! Yaar woh toh ek alag duniya hai!

All the BEST! Tum kar sakte ho! Main believe karta hoon tumpe!

GO GO GO!`,

    'prof-alex': `
Knowledge Assessment.

Congratulations on completing Module Two.

You have covered LDAP fundamentals, architecture, naming conventions, operations, security considerations, attack techniques, and tooling.

The following assessment consists of ten questions drawn from across the module.

I would encourage you to attempt each question independently before viewing the explanation.

A score of eighty percent or above indicates readiness to proceed to Module Three, which covers Active Directory enumeration with BloodHound.

Good luck.`,

    'ryan': `
Alright, quiz time!

You made it through the whole LDAP module — nice work!

Ten questions, covers everything from ports to attacks to tools.

Don't stress about it. If you get one wrong, read the explanation and it'll click.

Hit 80 percent or above and you're ready for Module 3 — BloodHound and AD enumeration.

Let's see what you've got!`
  }
};

/* ────────────────────────────────────────────────────────────────
   AUDIO PLAYER STATE
   ──────────────────────────────────────────────────────────────── */
const AP = {
  synth:         window.speechSynthesis,
  persona:       'sir-ji',
  sectionIdx:    0,
  isPlaying:     false,
  isPaused:      false,
  rate:          1.0,
  voice:         null,
  utterance:     null,
  autoAdvance:   false,
  sectionKeys:   Object.keys(SCRIPTS),
  get currentKey() { return this.sectionKeys[this.sectionIdx]; },
  get currentScript() {
    const sec = SCRIPTS[this.currentKey];
    return sec ? (sec[this.persona] || sec['sir-ji'] || '') : '';
  }
};

/* ────────────────────────────────────────────────────────────────
   BUILD PLAYER UI
   ──────────────────────────────────────────────────────────────── */
function buildPlayer() {
  const wrap = document.createElement('div');
  wrap.id = 'ac-audio-wrap';
  wrap.className = 'acp-wrap';
  wrap.innerHTML = `
    <!-- Trigger pill -->
    <div class="acp-trigger" id="acp-trigger">
      <div class="acp-wave-wrap" id="acp-wave-wrap">
        <div class="acp-wave"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      <span class="acp-trigger-label">Hindi / English Audio</span>
      <span class="acp-lang-dot"></span>
    </div>

    <!-- Panel -->
    <div class="acp-panel" id="acp-panel">

      <!-- Header -->
      <div class="acp-panel-head">
        <div class="acp-panel-brand">
          <span class="acp-brand-icon">🎙️</span>
          <div>
            <div class="acp-brand-title">Audio Narration</div>
            <div class="acp-brand-sub" id="acp-persona-tag">Sir Ji — हिंदी Teacher</div>
          </div>
        </div>
        <button class="acp-close" id="acp-close">✕</button>
      </div>

      <!-- Persona Selector -->
      <div class="acp-personas" id="acp-personas">
        ${Object.values(PERSONAS).map(p => `
          <button class="acp-persona-btn ${p.id === 'sir-ji' ? 'active' : ''}"
                  data-persona="${p.id}" style="--p-color:${p.color};--p-bg:${p.bgColor}"
                  title="${p.desc}">
            <span class="acp-p-emoji">${p.emoji}</span>
            <span class="acp-p-name">${p.name}</span>
            <span class="acp-p-lang">${p.lang.includes('hi') ? 'HI' : 'EN'}</span>
          </button>`).join('')}
      </div>

      <!-- Now playing -->
      <div class="acp-now-playing">
        <div class="acp-now-icon" id="acp-now-icon">📖</div>
        <div class="acp-now-info">
          <div class="acp-now-sub">अभी चल रहा है / Now Playing</div>
          <div class="acp-now-name" id="acp-now-name">Module Introduction</div>
        </div>
        <div class="acp-status-dot" id="acp-status-dot"></div>
      </div>

      <!-- Progress -->
      <div class="acp-progress-wrap">
        <div class="acp-progress-track">
          <div class="acp-progress-fill" id="acp-progress-fill"></div>
        </div>
        <div class="acp-progress-row">
          <span id="acp-time">0:00</span>
          <span id="acp-counter">1 / ${AP.sectionKeys.length}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="acp-controls">
        <button class="acp-btn acp-sm" id="acp-prev" title="Previous">⏮</button>
        <button class="acp-btn acp-sm" id="acp-replay" title="Replay">↺</button>
        <button class="acp-btn acp-main" id="acp-play" title="Play / Pause">▶</button>
        <button class="acp-btn acp-sm" id="acp-stop" title="Stop">⏹</button>
        <button class="acp-btn acp-sm" id="acp-next" title="Next">⏭</button>
      </div>

      <!-- Options row -->
      <div class="acp-options-row">
        <div class="acp-opt-col">
          <div class="acp-opt-label">Speed</div>
          <div class="acp-speed-row">
            ${['0.75','1','1.25','1.5','1.75'].map(r=>`<button class="acp-speed ${r==='1'?'active':''}" data-rate="${r}">${r}×</button>`).join('')}
          </div>
        </div>
        <div class="acp-opt-col">
          <div class="acp-opt-label">Auto-next</div>
          <label class="acp-switch"><input type="checkbox" id="acp-auto"><span class="acp-sw-track"></span></label>
        </div>
      </div>

      <!-- Voice selector -->
      <div class="acp-voice-row">
        <div class="acp-opt-label" style="margin-bottom:5px">Voice (Browser)</div>
        <select class="acp-voice-sel" id="acp-voice-sel">
          <option>Loading voices…</option>
        </select>
      </div>

      <!-- Section list -->
      <div class="acp-sections">
        <div class="acp-opt-label" style="margin-bottom:6px">All Sections</div>
        <div id="acp-sec-list"></div>
      </div>

      <!-- Shortcuts -->
      <div class="acp-shortcuts">
        <div class="acp-opt-label">Keyboard</div>
        <div class="acp-sc-row"><span>Play/Pause</span><kbd>Ctrl+Space</kbd></div>
        <div class="acp-sc-row"><span>Next</span><kbd>Ctrl+→</kbd></div>
        <div class="acp-sc-row"><span>Previous</span><kbd>Ctrl+←</kbd></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);
}

/* ────────────────────────────────────────────────────────────────
   BUILD SECTION LIST
   ──────────────────────────────────────────────────────────────── */
function buildSectionList() {
  const container = document.getElementById('acp-sec-list');
  if (!container) return;
  const sectionTitles = {
    'hero': '🏠 Introduction',
    'what-is-ldap': '📡 What is LDAP',
    'ldap-architecture': '🏛️ Architecture',
    'distinguished-names': '🗂️ Distinguished Names',
    'ldap-operations': '⚙️ Operations',
    'ldap-ports': '🔌 Ports',
    'ldap-attacks': '👹 Attacks',
    'tools': '🔧 Tools',
    'quiz-section': '🧠 Quiz'
  };
  AP.sectionKeys.forEach((key, i) => {
    const btn = document.createElement('button');
    btn.className = 'acp-sec-item' + (i === 0 ? ' active' : '');
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="acp-si-label">${sectionTitles[key] || key}</span><span class="acp-si-done" id="acp-done-${i}"></span>`;
    btn.addEventListener('click', () => {
      AP.sectionIdx = i;
      stopSpeech();
      updateUI();
      playCurrent();
    });
    container.appendChild(btn);
  });
}

/* ────────────────────────────────────────────────────────────────
   VOICE LOADING
   ──────────────────────────────────────────────────────────────── */
function loadVoices() {
  const sel = document.getElementById('acp-voice-sel');
  if (!sel) return;

  function fill() {
    const voices = AP.synth.getVoices();
    if (!voices.length) return;
    sel.innerHTML = '';

    const hiVoices  = voices.filter(v => v.lang.startsWith('hi'));
    const enGBVoices = voices.filter(v => v.lang === 'en-GB');
    const enUSVoices = voices.filter(v => v.lang === 'en-US' || v.lang === 'en');

    const addGroup = (label, arr) => {
      if (!arr.length) return;
      const g = document.createElement('optgroup');
      g.label = label;
      arr.forEach(v => {
        const o = document.createElement('option');
        o.value = v.name; o.textContent = `${v.name} (${v.lang})`;
        g.appendChild(o);
      });
      sel.appendChild(g);
    };
    addGroup('🇮🇳 Hindi Voices', hiVoices);
    addGroup('🇬🇧 English (GB)', enGBVoices);
    addGroup('🇺🇸 English (US)', enUSVoices);

    // Set default based on persona
    const p = PERSONAS[AP.persona];
    const match = voices.find(v => v.lang.startsWith(p.lang.split('-')[0]));
    if (match) { AP.voice = match; sel.value = match.name; }
  }

  fill();
  AP.synth.onvoiceschanged = fill;

  sel.addEventListener('change', () => {
    AP.voice = AP.synth.getVoices().find(v => v.name === sel.value) || null;
    if (AP.isPlaying) { stopSpeech(); setTimeout(playCurrent, 80); }
  });
}

/* ────────────────────────────────────────────────────────────────
   SPEECH ENGINE
   ──────────────────────────────────────────────────────────────── */
function playCurrent() {
  const script = AP.currentScript;
  if (!script.trim()) { setStatus('idle'); return; }
  stopSpeech();

  const utter = new SpeechSynthesisUtterance(script.trim());
  const p = PERSONAS[AP.persona];
  utter.lang  = p.lang;
  utter.rate  = p.rate * AP.rate;
  utter.pitch = p.pitch;

  // Voice assignment
  if (AP.voice && AP.voice.lang.startsWith(p.lang.split('-')[0])) {
    utter.voice = AP.voice;
  } else {
    const voices = AP.synth.getVoices();
    const best = voices.find(v => v.lang === p.lang) ||
                 voices.find(v => v.lang.startsWith(p.lang.split('-')[0]));
    if (best) utter.voice = best;
  }

  const totalLen = script.length;
  const estMs = (totalLen / (140 * (p.rate * AP.rate))) * 1000;
  let start = 0;

  utter.onstart = () => {
    AP.isPlaying = true; AP.isPaused = false; AP.utterance = utter;
    start = Date.now(); setPlayIcon(true); setWave(true); setStatus('playing');
    startProgressSim(estMs);
  };
  utter.onboundary = e => {
    if (e.charIndex !== undefined) {
      setProgress(Math.min(98, (e.charIndex / totalLen) * 100));
    }
  };
  utter.onend = () => {
    AP.isPlaying = false; AP.utterance = null;
    setPlayIcon(false); setWave(false); setStatus('done');
    setProgress(100); stopProgressSim();
    markDone(AP.sectionIdx);
    if (AP.autoAdvance && AP.sectionIdx < AP.sectionKeys.length - 1) {
      setTimeout(() => { AP.sectionIdx++; updateUI(); playCurrent();
        const key = AP.currentKey;
        document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1500);
    }
  };
  utter.onerror = e => { if (e.error !== 'interrupted') setStatus('error'); };
  AP.synth.speak(utter);
}

function pauseSpeech() {
  if (AP.synth.speaking && !AP.synth.paused) {
    AP.synth.pause(); AP.isPaused = true;
    setPlayIcon(false); setWave(false); setStatus('paused'); stopProgressSim();
  }
}
function resumeSpeech() {
  if (AP.synth.paused) {
    AP.synth.resume(); AP.isPaused = false;
    setPlayIcon(true); setWave(true); setStatus('playing');
  }
}
function stopSpeech() {
  AP.synth.cancel(); AP.isPlaying = false; AP.isPaused = false; AP.utterance = null;
  setPlayIcon(false); setWave(false); setStatus('idle'); setProgress(0); stopProgressSim();
  const timeEl = document.getElementById('acp-time'); if (timeEl) timeEl.textContent = '0:00';
}

/* ── PROGRESS SIMULATION ──────────────────────────────────────── */
let progTimer = null, progStart = 0, progEst = 1;
function startProgressSim(estMs) {
  stopProgressSim();
  progStart = Date.now(); progEst = estMs;
  progTimer = setInterval(() => {
    const elapsed = Date.now() - progStart;
    const pct = Math.min(98, (elapsed / progEst) * 100);
    setProgress(pct);
    const secs = Math.floor(elapsed / 1000);
    const m = Math.floor(secs / 60), s = secs % 60;
    const el = document.getElementById('acp-time');
    if (el) el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
  }, 250);
}
function stopProgressSim() { clearInterval(progTimer); progTimer = null; }

/* ── UI HELPERS ───────────────────────────────────────────────── */
function setProgress(pct) {
  const el = document.getElementById('acp-progress-fill');
  if (el) el.style.width = pct + '%';
}
function setPlayIcon(playing) {
  const btn = document.getElementById('acp-play');
  if (btn) btn.textContent = playing ? '⏸' : '▶';
}
function setWave(active) {
  document.getElementById('acp-wave-wrap')?.classList.toggle('active', active);
  document.getElementById('acp-trigger')?.classList.toggle('acp-playing', active);
}
function setStatus(state) {
  const dot = document.getElementById('acp-status-dot');
  if (!dot) return;
  dot.className = 'acp-status-dot' + (state === 'playing' ? ' s-play' : state === 'paused' ? ' s-pause' : state === 'done' ? ' s-done' : state === 'error' ? ' s-err' : '');
}
function markDone(idx) {
  const el = document.getElementById(`acp-done-${idx}`);
  if (el) { el.textContent = '✓'; el.style.color = '#22C55E'; }
}
function updateUI() {
  const key = AP.currentKey;
  const titles = {
    'hero': 'Module Introduction', 'what-is-ldap': 'What is LDAP',
    'ldap-architecture': 'LDAP Architecture', 'distinguished-names': 'Distinguished Names',
    'ldap-operations': 'LDAP Operations', 'ldap-ports': 'LDAP Ports',
    'ldap-attacks': 'LDAP Attacks', 'tools': 'Tools', 'quiz-section': 'Knowledge Check'
  };
  const icons = {
    'hero':'🏠','what-is-ldap':'📡','ldap-architecture':'🏛️','distinguished-names':'🗂️',
    'ldap-operations':'⚙️','ldap-ports':'🔌','ldap-attacks':'👹','tools':'🔧','quiz-section':'🧠'
  };
  const nameEl = document.getElementById('acp-now-name');
  const iconEl = document.getElementById('acp-now-icon');
  const ctrEl  = document.getElementById('acp-counter');
  if (nameEl) nameEl.textContent = titles[key] || key;
  if (iconEl) iconEl.textContent = icons[key] || '📖';
  if (ctrEl)  ctrEl.textContent  = `${AP.sectionIdx + 1} / ${AP.sectionKeys.length}`;
  setProgress(0);
  document.querySelectorAll('.acp-sec-item').forEach((item, i) => item.classList.toggle('active', i === AP.sectionIdx));
}

/* ────────────────────────────────────────────────────────────────
   PERSONA SWITCH
   ──────────────────────────────────────────────────────────────── */
function switchPersona(id) {
  AP.persona = id;
  const p = PERSONAS[id];
  // Update button styles
  document.querySelectorAll('.acp-persona-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.persona === id));
  // Update tag
  const tag = document.getElementById('acp-persona-tag');
  if (tag) tag.textContent = p.nameDisplay;
  // Try to match voice
  const voices = AP.synth.getVoices();
  const best = voices.find(v => v.lang === p.lang) || voices.find(v => v.lang.startsWith(p.lang.split('-')[0]));
  if (best) { AP.voice = best; const sel = document.getElementById('acp-voice-sel'); if (sel) sel.value = best.name; }
  if (AP.isPlaying) { stopSpeech(); setTimeout(playCurrent, 80); }
}

/* ────────────────────────────────────────────────────────────────
   PANEL + CONTROLS INIT
   ──────────────────────────────────────────────────────────────── */
function initPlayerControls() {
  const trigger = document.getElementById('acp-trigger');
  const panel   = document.getElementById('acp-panel');
  const close   = document.getElementById('acp-close');
  let open = false;

  function togglePanel() { open = !open; panel?.classList.toggle('acp-open', open); trigger?.classList.toggle('acp-panel-open', open); }
  trigger?.addEventListener('click', togglePanel);
  close?.addEventListener('click', () => { open = false; panel?.classList.remove('acp-open'); trigger?.classList.remove('acp-panel-open'); });

  // Play/Pause
  document.getElementById('acp-play')?.addEventListener('click', () => {
    if (!AP.synth.speaking && !AP.synth.paused) playCurrent();
    else if (AP.synth.paused) resumeSpeech();
    else pauseSpeech();
  });
  document.getElementById('acp-stop')?.addEventListener('click', stopSpeech);
  document.getElementById('acp-replay')?.addEventListener('click', () => { stopSpeech(); setTimeout(playCurrent, 80); });
  document.getElementById('acp-prev')?.addEventListener('click', () => { if (AP.sectionIdx > 0) { AP.sectionIdx--; stopSpeech(); updateUI(); } });
  document.getElementById('acp-next')?.addEventListener('click', () => { if (AP.sectionIdx < AP.sectionKeys.length - 1) { AP.sectionIdx++; stopSpeech(); updateUI(); } });

  // Speed
  document.querySelectorAll('.acp-speed').forEach(btn => {
    btn.addEventListener('click', () => {
      AP.rate = parseFloat(btn.dataset.rate);
      document.querySelectorAll('.acp-speed').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (AP.isPlaying) { stopSpeech(); setTimeout(playCurrent, 80); }
    });
  });

  // Auto-next
  document.getElementById('acp-auto')?.addEventListener('change', e => { AP.autoAdvance = e.target.checked; });

  // Persona buttons
  document.querySelectorAll('.acp-persona-btn').forEach(btn => {
    btn.addEventListener('click', () => switchPersona(btn.dataset.persona));
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') return;
    if (e.key === ' ' && e.ctrlKey) { e.preventDefault(); document.getElementById('acp-play')?.click(); }
    if (e.key === 'ArrowRight' && e.ctrlKey) { e.preventDefault(); document.getElementById('acp-next')?.click(); }
    if (e.key === 'ArrowLeft'  && e.ctrlKey) { e.preventDefault(); document.getElementById('acp-prev')?.click(); }
  });
}

/* ── SCROLL SYNC ──────────────────────────────────────────────── */
function initScrollSync() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      const idx = AP.sectionKeys.indexOf(id);
      if (idx !== -1 && idx !== AP.sectionIdx) { AP.sectionIdx = idx; updateUI(); }
    });
  }, { threshold: 0.45 });
  AP.sectionKeys.forEach(k => { const el = document.getElementById(k); if (el) io.observe(el); });
}

/* ── INJECT PLAYER CSS ────────────────────────────────────────── */
function injectPlayerCSS() {
  const style = document.createElement('style');
  style.textContent = `
.acp-wrap{position:fixed;bottom:82px;right:22px;z-index:500;font-family:var(--font,-apple-system,sans-serif)}
.acp-trigger{display:flex;align-items:center;gap:8px;padding:9px 15px;background:linear-gradient(135deg,#0F172A,#1E1B4B);border:1px solid rgba(99,102,241,.35);border-radius:999px;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,.3);transition:all .25s;user-select:none}
.acp-trigger:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(99,102,241,.45)}
.acp-trigger.acp-playing{border-color:rgba(34,197,94,.4);box-shadow:0 4px 20px rgba(34,197,94,.25)}
.acp-trigger.acp-panel-open{border-radius:12px;background:linear-gradient(135deg,#1E1B4B,#312E81)}
.acp-trigger-label{font-size:11px;font-weight:700;color:#E0E7FF;letter-spacing:.04em}
.acp-lang-dot{width:7px;height:7px;border-radius:50%;background:#818CF8}
.acp-trigger.acp-playing .acp-lang-dot{background:#22C55E;box-shadow:0 0 6px rgba(34,197,94,.6);animation:acp-blink 1.2s infinite}
@keyframes acp-blink{0%,100%{opacity:1}50%{opacity:.4}}
/* Wave */
.acp-wave-wrap{display:flex;align-items:center;height:18px;gap:2px}
.acp-wave{display:flex;align-items:center;gap:2px}
.acp-wave span{display:block;width:3px;background:#818CF8;border-radius:2px;height:4px;transition:height .2s}
.acp-wave-wrap.active .acp-wave span:nth-child(1){animation:acp-wave .6s ease-in-out infinite;height:12px}
.acp-wave-wrap.active .acp-wave span:nth-child(2){animation:acp-wave .6s ease-in-out .1s infinite;height:7px}
.acp-wave-wrap.active .acp-wave span:nth-child(3){animation:acp-wave .6s ease-in-out .2s infinite;height:15px}
.acp-wave-wrap.active .acp-wave span:nth-child(4){animation:acp-wave .6s ease-in-out .12s infinite;height:6px}
.acp-wave-wrap.active .acp-wave span:nth-child(5){animation:acp-wave .6s ease-in-out .05s infinite;height:10px}
@keyframes acp-wave{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(.25);opacity:.5}}
/* Panel */
.acp-panel{position:absolute;bottom:calc(100% + 10px);right:0;width:350px;background:#0A0E1A;border:1px solid #1E293B;border-radius:18px;box-shadow:0 24px 64px rgba(0,0,0,.55),0 0 0 1px rgba(99,102,241,.1);overflow:hidden;opacity:0;transform:translateY(14px) scale(.96);pointer-events:none;transition:all .3s cubic-bezier(.34,1.56,.64,1);max-height:85vh;overflow-y:auto}
.acp-panel::-webkit-scrollbar{width:3px}.acp-panel::-webkit-scrollbar-thumb{background:#1E293B;border-radius:3px}
.acp-panel.acp-open{opacity:1;transform:none;pointer-events:all}
/* Header */
.acp-panel-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 12px;border-bottom:1px solid #1E293B;background:linear-gradient(135deg,#0F172A,#1E1B4B)}
.acp-panel-brand{display:flex;align-items:center;gap:9px}
.acp-brand-icon{font-size:18px}
.acp-brand-title{font-size:13px;font-weight:700;color:#E2E8F0}
.acp-brand-sub{font-size:10px;color:#64748B;margin-top:1px}
.acp-close{width:26px;height:26px;border-radius:50%;background:#1E293B;color:#64748B;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;transition:all .2s}
.acp-close:hover{background:#334155;color:#E2E8F0}
/* Persona grid */
.acp-personas{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:12px 14px;border-bottom:1px solid #1E293B}
.acp-persona-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 8px;background:#111827;border:2px solid transparent;border-radius:10px;cursor:pointer;transition:all .2s;font-family:inherit}
.acp-persona-btn:hover{background:#1E293B;border-color:#334155}
.acp-persona-btn.active{background:color-mix(in srgb,var(--p-bg) 30%,#0A0E1A);border-color:var(--p-color);box-shadow:0 0 12px color-mix(in srgb,var(--p-color) 25%,transparent)}
.acp-p-emoji{font-size:20px}
.acp-p-name{font-size:11px;font-weight:700;color:#94A3B8}
.acp-persona-btn.active .acp-p-name{color:#E2E8F0}
.acp-p-lang{font-size:9px;font-weight:800;background:#1E293B;color:#64748B;padding:1px 5px;border-radius:4px;letter-spacing:.05em}
.acp-persona-btn.active .acp-p-lang{background:var(--p-color);color:#fff}
/* Now playing */
.acp-now-playing{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #1E293B}
.acp-now-icon{font-size:22px;width:40px;height:40px;background:#111827;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.acp-now-info{flex:1;min-width:0}
.acp-now-sub{font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}
.acp-now-name{font-size:12px;font-weight:700;color:#E2E8F0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.acp-status-dot{width:9px;height:9px;border-radius:50%;background:#1E293B;flex-shrink:0;transition:all .3s}
.acp-status-dot.s-play{background:#22C55E;box-shadow:0 0 8px rgba(34,197,94,.5);animation:acp-blink 1.5s infinite}
.acp-status-dot.s-pause{background:#F59E0B}.acp-status-dot.s-done{background:#6366F1}.acp-status-dot.s-err{background:#EF4444}
/* Progress */
.acp-progress-wrap{padding:10px 14px 8px}
.acp-progress-track{height:4px;background:#1E293B;border-radius:999px;overflow:hidden;margin-bottom:6px}
.acp-progress-fill{height:100%;background:linear-gradient(90deg,#6366F1,#A855F7);border-radius:999px;transition:width .3s linear;width:0%}
.acp-progress-row{display:flex;justify-content:space-between;font-size:10px;color:#475569;font-weight:600}
/* Controls */
.acp-controls{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 14px 12px;border-bottom:1px solid #1E293B}
.acp-btn{display:flex;align-items:center;justify-content:center;background:#111827;color:#94A3B8;border-radius:50%;cursor:pointer;transition:all .2s;font-size:14px}
.acp-btn:hover{background:#1E293B;color:#E2E8F0}
.acp-sm{width:34px;height:34px}.acp-main{width:50px;height:50px;font-size:18px;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;box-shadow:0 4px 14px rgba(99,102,241,.35)}
.acp-main:hover{transform:scale(1.07);box-shadow:0 6px 20px rgba(99,102,241,.45)}
/* Options */
.acp-options-row{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 14px;border-bottom:1px solid #1E293B;gap:12px}
.acp-opt-col{display:flex;flex-direction:column;gap:5px}
.acp-opt-label{font-size:9px;font-weight:800;color:#334155;text-transform:uppercase;letter-spacing:.08em}
.acp-speed-row{display:flex;gap:3px}
.acp-speed{padding:3px 7px;background:#111827;color:#64748B;font-size:10px;font-weight:700;border-radius:6px;border:1px solid transparent;cursor:pointer;transition:all .2s;font-family:inherit}
.acp-speed:hover{background:#1E293B;color:#94A3B8}
.acp-speed.active{background:#312E81;color:#A5B4FC;border-color:#4338CA}
/* Toggle */
.acp-switch{display:flex;align-items:center;cursor:pointer;position:relative}
.acp-switch input{opacity:0;width:0;height:0;position:absolute}
.acp-sw-track{width:34px;height:18px;background:#111827;border-radius:999px;border:1px solid #1E293B;position:relative;transition:all .25s}
.acp-sw-track::after{content:'';position:absolute;top:3px;left:3px;width:10px;height:10px;border-radius:50%;background:#334155;transition:all .25s}
.acp-switch input:checked + .acp-sw-track{background:#312E81;border-color:#4F46E5}
.acp-switch input:checked + .acp-sw-track::after{transform:translateX(16px);background:#818CF8}
/* Voice */
.acp-voice-row{padding:0 14px 10px;border-bottom:1px solid #1E293B}
.acp-voice-sel{width:100%;padding:7px 9px;background:#111827;border:1px solid #1E293B;color:#94A3B8;border-radius:8px;font-size:11px;outline:none;cursor:pointer;font-family:inherit;appearance:none;-webkit-appearance:none}
.acp-voice-sel:focus{border-color:#4F46E5}
.acp-voice-sel option,.acp-voice-sel optgroup{background:#0A0E1A;color:#E2E8F0}
/* Section list */
.acp-sections{padding:10px 14px;border-bottom:1px solid #1E293B}
.acp-sec-item{display:flex;align-items:center;justify-content:space-between;width:100%;padding:7px 8px;border-radius:7px;background:transparent;border:1px solid transparent;color:#475569;font-size:11px;font-weight:500;cursor:pointer;text-align:left;transition:all .18s;font-family:inherit;margin-bottom:2px}
.acp-sec-item:hover{background:#111827;color:#94A3B8;border-color:#1E293B}
.acp-sec-item.active{background:#1E1B4B;color:#A5B4FC;border-color:#312E81}
.acp-si-done{font-size:10px;font-weight:800;color:#22C55E}
/* Shortcuts */
.acp-shortcuts{padding:8px 14px 12px}
.acp-sc-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.acp-sc-row span{font-size:10px;color:#334155}
.acp-shortcuts kbd{background:#111827;color:#475569;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;border:1px solid #1E293B;font-family:monospace}
@media(max-width:480px){.acp-wrap{bottom:72px;right:14px}.acp-panel{width:calc(100vw - 28px);right:0}}
`;
  document.head.appendChild(style);
}

/* ── MAIN INIT ────────────────────────────────────────────────── */
function initAudio() {
  if (!window.speechSynthesis) return;
  injectPlayerCSS();
  buildPlayer();
  buildSectionList();
  loadVoices();
  initPlayerControls();
  initScrollSync();
  updateUI();
}

document.addEventListener('DOMContentLoaded', initAudio);
window.addEventListener('beforeunload', () => window.speechSynthesis?.cancel());
window.AcademyAudio = { AP, PERSONAS, SCRIPTS, playCurrent, stopSpeech, switchPersona };
