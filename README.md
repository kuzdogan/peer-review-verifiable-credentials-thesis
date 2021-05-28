# Peer Review Verification with Verifiable Credentials and Zero Knowledge Proofs

This is a PoC imlementation for the Master's Thesis: Peer Review Verification with Verifiable Credentials and Zero-Knowledge Proofs. The code is deployed and a Demo is available under [Try it out](#try-it-out) section.

Thesis document is accesible [here](https://github.com/kuzdogan/Peer-Review-Verifiable-Credentials-Thesis-Document)

## Introduction

Peer Review is the formal process of the evaluation of scholarly works by people specialized in the subject of the work. It is the _gold standard_ of scientific publishing. Usually a manuscript goes through 2-3 peer reviews. Each peer reviewer assesses the manuscript in written format and submits to the _editor_ their recommendation such as accepting the manuscript, sending it to revision or rejecting it. The editor oversees the processs and gives the decision on the publication of the manuscript. Things may vary slightly at each journal.

The process can be done **open** i.e. the identities of the author and reviewers will be open; or **single/double blinded** where the identities of one/both party/ies will be open. Most of the reviews are anonymized and many scholars seem to favor blinded reviews to avoid social conflicts, better scrutiny etc. Although some claim this is often useless in niche fields and the reviews should be open for transparency, this discussion is out of scope of this work, and is more of a political issue in scientific publishing.

Despite its importance, peer review lacks incentives. Since publication based metrics (citations, h-index etc.) are proxies for academic success, academics' goal is to increase their (perceived) impact by publishing more and getting cited more. Promotion, tenure, grants, many achievements in scholarship are gained by improving one's metrics. Peer review, however, is (mostly) not recognized and not included in these metrics. One of the reasons it is not recognized is the nature of blinded reviews, that the identities and, to avoid identification, the contents of a review are not publishable. It is therefore not possible to credit a researcher for their anonymized reviews.

There are platforms trying to solve this problem, the most prominent being [Publons](http://publons.com/). Publons _verifies_ the reviews of a researcher through journal integrations or manually upon reveiving a review acceptance email forwarded by the user. Then they build a [peer review profile](https://publons.com/researcher/1258484/seyedali-mirjalili/) without revealing the peer reviews. They act as _trusted third parties_ for the verification of peer reviews and effectively own the whole peer review data. Publons was recently acquired by Clarivate Analytics, provider of Web of Science and the Journal Impact Factor. This raises questions for the Open Science perspective of the peer review ecosystem. Also the journals are in the end giving away their peer review data to another company, which in turn aggregates this data and uses it to fuel its services such as [reviewer finder](https://clarivate.com/webofsciencegroup/solutions/reviewerlocator/) tools.

So, current solutions to **review recognition** problem creates new problems. We have first hand experience in scientific publishing of what happens when scientific data is put behind walled gardens and when for profit institutions decides what constitutes sound science and what is not. How can we avoid the problems in manuscript publishing to occur in peer reviewing? How can we create direct **trust** in the peer review ecosystem and avoid third parties? How can we open peer review data, without violating current peer review practices?

Recent technologies may enable this. [_Verifiable Credentials_](https://www.w3.org/TR/vc-data-model/) is a recent W3C specification for exchanging digital credentials in a secure, tamper-evident, privacy preserving, and a machine verifiable, interoperable way. It could be used for driver's licenses, passports, tickets, university degrees, vaccinations [1](https://w3c-ccg.github.io/vaccination-vocab/)[2](https://www.covidcreds.org/)... Any claim by anyone may constitute a credential. It leverages digital signatures to provide verifiablity and tamper-evidence. Also through **Zero Knowledge Proofs** it is possible to **selectively disclose** attributes of a credential. The classical example is when buying drinks, you wouldn't need to share your whole ID card, but selectively disclose your birthday but not your photo, address etc., or even create a zk-proof of "Over 18".

### This repo

This repo is a prototype implementation of peer reviewing using verifiable credentials and zero-knowledge proofs. It has two platforms: **Journal X** which is a hypothetical journal where manuscript submission and reviewing takes place, and **Veriview** which is a review showcase platform.

The platforms are MongoDB, Express, React, Node.js (MERN) apps. The key part of the application which is the credential issuence, verification relies on [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures) and the selective disclosure (zk-proofs) uses [jsonld-signatures-bbs](https://github.com/mattrglobal/jsonld-signatures-bbs) which uses the BBS+ Signatures under the hood that allows efficient zk-proof generation. The contexts are cached in `documentLoader`. The `id` fields in the Verifiable Credentials are [DID](https://www.w3.org/TR/did-core/)'s and uses the `did:web` method. On Veriview this DID gets actually resolved and the verifiaction follows from its public keys. The DID is under JournalX's [/.well-known/did.json](https://journalx.herokuapp.com/.well-known/did.json).

## The User Flow

A typical flow is as follows:

1. An author submits a manuscript to the Journal X
1. The editor starts a review by assigning other reviewers in the Journal X.
1. The reviewers submit their review. The editor collects reviews and gives publication decision.
1. The reviewers generate "peer review credentials" that they have done a review in the Journal X for a manuscript.
1. The reviewers then share this credential in their Veriview profile.
   1. Reviewers upload the review verifiable credential to Veriview
   1. Veriview verifies the credentials by checking the `proof` attribute which contains a digital signature and the DID of Journal X. The DID contains the public key of Journal X. Veriview resolves this DID and if public and signatures match it gets verified.
   1. The review author then selects which attributes they want to disclose. For example, if it's a blinded review they would want to exclude identifiable information such as the title, content, date. But leave the journal information.
   1. Veriview generates a derived credential containing the selected attributes only, and a zero-knowledge proof that the holder of this derived proof knows a valid signature of the original credential. (This is where the magic is)
   1. The review author finally submits the derived credential and it gets added to their profile. They can share their profile publicly or share the peer reviews on their profile.

## Try it out

The two platforms are deployed at: journalx.herokuapp.com and veriview.herokuapp.com. You may have to wait a little for the pages to load as Heroku dynos wake up.

1. Go to Journal X and register a user. (You can leave ORCID blank)
1. Take note of the user id on the sidebar (60b0a7851137b00...).
1. Log out and create another user or login to Alice Smith: `alice@test.com` `alice12345`.
1. Submit a manuscript. You can choose one with open peer review from [F1000Research](https://f1000research.com/browse/articles).
1. Log in to the editor: `admin@test.com` `admin12345`
1. Click "Manage Reviews" and "Start a Review" above.
1. Click on the manuscript card you want to start the review process for. (not on the title)
1. Click "Add Reviewer" and paste the user id you took note of. Set a deadline. Add more reviewers if you'd like.
1. Click "Assign Reviewers"
1. Log in to the reviewer account. Click "Reviews". You'll see an assigned review. Click "Write Review".
1. Fill the review fields. If you got the manuscript from F1000 you can copy its review. Submit your review.
1. Click "Issue Credential" to download your Verifiable Credential.
1. Go to Veriview and create a profile.
1. Click "Add Review" and "Add a Review Credential". Choose your downloaded Verifiable Credential.
1. Select the attributes you'd like to publicly disclose. Click "Next". Check the information you'll share. Click "Next". This will generate a selectively disclosed credential.
1. You can view the generated credential and its proof. Also you can view the raw JSON-LD by clicking "Show Code". "Submit" the generated credential.
1. If it was successful you can view your peer reviews on your Profile. You can also share the Public Profile link to view the profile without logging in.
