# **Forensic Audit of 2020 Election Integrity Allegations: Analysis of "Spyder," Engineering Change Orders, and Statistical Anomalies**

## **Executive Summary**

This comprehensive forensic report investigates a series of claims regarding the 2020 United States Presidential Election, specifically those originating from a cluster of legal filings (the "Kraken" lawsuits) and viral media circulating on social platforms. The analysis was triggered by a request to evaluate the veracity of assertions concerning a military intelligence witness codenamed "Spyder," the alleged misuse of "Engineering Change Orders" (ECOs) to bypass voting system certification, and claims of "statistically impossible" vote spikes favoring Joseph Biden.

The investigation synthesizes primary source data from federal court dockets (Eastern District of Michigan, Northern District of Georgia), sworn affidavits, expert witness reports, Election Assistance Commission (EAC) technical manuals, and transcripts from legislative oversight hearings.

Key Findings:  
The investigation concludes that the core allegations are demonstrably false, grounded in misrepresented credentials, technical misunderstandings of election infrastructure, and the deliberate distortion of statistical data.

1. **Identity of "Spyder":** The confidential human source identified as "Spyder" is confirmed to be **Joshua Merritt**, an information technology consultant. Contrary to the claims made in federal court that he was a "Military Intelligence Expert," official U.S. Army records indicate Merritt never completed the entry-level training course for the 305th Military Intelligence Battalion and was not an intelligence analyst.  
2. **Engineering Change Orders (ECOs):** The assertion that ECOs were used to illegally modify voting machines is a fundamental misinterpretation of standard compliance procedures. ECOs are the federally mandated mechanism for tracking *de minimis* changes (such as software patches or hardware substitutions) to maintain certification, a process overseen by accredited Voting System Test Laboratories (VSTLs).  
3. **Statistical Impossibilities:** Claims of "statistically impossible" vote dumps are derived from a misrepresentation of expert reports. Analysis reveals that legal counsel transformed their own experts' findings of "unexpected" shifts into categorical claims of "fraud," a tactic that resulted in severe judicial sanctions.  
4. **Foreign Interference:** Allegations of "Serbian" remote access or interference coordinated from "The SCIF" are unsubstantiated. They rely on the discredited testimony of Merritt and a conflation of secure government facilities with media entities or routine bureaucratic functions.

This report serves as a definitive reference for the legal and technical realities behind these persistent narratives.

## ---

**Part I: The Forensic Identity and Credibility of "Spyder"**

The narrative of foreign interference in the 2020 election relies heavily on the testimony of a confidential witness initially introduced to the public and the courts under the pseudonym "Spyder" (or "Spider"). The credibility of the entire "foreign manipulation" theory—specifically involving Dominion Voting Systems servers—rests on the expertise of this individual.

### **1.1 The "Military Intelligence Expert" Assertion**

In the high-profile litigation of *King v. Whitmer* (Eastern District of Michigan) and *Pearson v. Kemp* (Northern District of Georgia), plaintiffs submitted a declaration from an individual described as a "former US Military Intelligence expert" and a "former electronic intelligence analyst with the 305th Military Intelligence" Battalion.1

This qualification was not merely biographical background; it was the foundational authority for the declarant’s technical assertions. The witness claimed to have analyzed network traffic and identified "anomalies" suggesting that American voting data was being routed to foreign servers, specifically in Serbia, Iran, and China. The affidavit was presented to the court as the product of a highly trained specialist capable of detecting nation-state cyber warfare.2

### **1.2 Forensic Unmasking: The Redaction Failure**

The identity of "Spyder" was intended to remain sealed to protect the witness from alleged retaliation. However, a forensic examination of the digital filings submitted by the plaintiffs revealed a critical error in document hygiene.

In a specific submission to the court, although the visible text of the name was redacted (blacked out), the plaintiffs' counsel failed to scrub the metadata and bookmarks within the PDF file. A bookmark in the electronic file explicitly labeled the document with the name of the declarant: **Joshua Merritt**.1 This unmasking allowed defense counsel and investigative journalists to cross-reference the name with public records and military databases, leading to an immediate collapse of the "anonymous expert" mystique.

### **1.3 Verification of Credentials vs. Official Records**

Once identified as Joshua Merritt, a Dallas-area information technology consultant, his claimed military credentials were subjected to verification by the U.S. Army Intelligence Center of Excellence. The disparity between the sworn affidavit and the official service record was absolute.

| Claimed Credential in Court Filing | Official U.S. Army Service Record |
| :---- | :---- |
| "Electronic Intelligence Analyst" | Never held the Military Occupational Specialty (MOS) of an Intelligence Analyst. |
| Trained by "305th Military Intelligence" | Enrolled in entry-level training with the 305th but **"kept washing out of courses"** and did not graduate. |
| "Military Intelligence Expert" | Discharged as a Wheeled Vehicle Mechanic (MOS 63W) and briefly trained for other roles but never achieved Intelligence qualification. |

The "Washing Out" Revelation:  
A spokesperson for the U.S. Army Intelligence Center of Excellence provided a rare public correction regarding a former service member's record, stating: "He kept washing out of courses... He’s not an intelligence analyst".1 This official statement directly contradicted the core premise of the plaintiffs' case—that the court should rely on Merritt’s specialized knowledge of intelligence systems.  
Merritt’s Defense and Admission:  
Following the revelation, Merritt attempted to clarify the discrepancy. He acknowledged to the Washington Post that the description of him as an "intelligence analyst" in the legal pleadings was "wrong".3 However, he attributed this falsehood to the clerks and attorneys working for Sidney Powell, claiming they had drafted the description. He maintained that he had "completed the training" but received only an "unofficial transcript," a claim unsupported by his DD-214 discharge papers.

### **1.4 Judicial Findings and "The Lie"**

The exposure of Merritt’s true background became a central pillar in the sanctions proceedings against the attorneys who filed the "Kraken" lawsuits. U.S. District Judge Linda Parker, in her blistering opinion in *King v. Whitmer*, did not mince words regarding the presentation of "Spyder."

The Court found that calling Merritt a military intelligence expert was not an innocent mistake but **"a lie by Plaintiffs' counsel"**.1 Judge Parker noted that the attorneys had an affirmative duty under Federal Rule of Civil Procedure 11 to verify the evidentiary basis of their claims. By failing to ask Merritt for his DD-214 or verify his graduation from the 305th MI Battalion, and instead allowing a false credential to be filed under oath, the attorneys engaged in sanctionable misconduct.

The Court further noted that the "partial redaction" of Merritt’s affidavit was likely used not to protect a high-level asset, but to obscure the fact that the witness lacked the qualifications necessary to opine on election systems.1 This finding judicially nullified the probative value of any claims regarding "Serbian" servers or foreign interference sourced from "Spyder."

## ---

**Part II: The Architecture of Certification – ECOs and Trusted Builds**

A second cluster of claims focuses on the technical administration of the election, specifically the use of "Engineering Change Orders" (ECOs) and the "Trusted Build" process. The allegation suggests that election officials and vendors used ECOs to slip malicious or uncertified software updates into machines days before the election, bypassing legal certification requirements.

### **2.1 Anatomy of an Engineering Change Order (ECO)**

To understand the falsity of the claim, one must first understand the regulatory framework established by the **Election Assistance Commission (EAC)**.

Voting systems are complex integrations of hardware (scanners, touchscreens) and software. Because component supply chains change (e.g., a specific printer model is discontinued, or a commercial off-the-shelf (COTS) driver is updated), the EAC established the ECO process to handle **"De Minimis"** changes.4

Definition of De Minimis Change:  
The EAC Testing and Certification Program Manual defines a de minimis change as a modification to a certified voting system's hardware or software that does not materially alter the system's reliability, functionality, capability, or operation.4  
**The ECO Workflow:**

1. **Identification:** The manufacturer (e.g., Dominion, ES\&S) identifies a necessary minor change (e.g., a software patch for a display glitch).  
2. **VSTL Review:** The manufacturer submits the change to an accredited **Voting System Test Laboratory (VSTL)**, such as Pro V\&V or Wyle Laboratories.  
3. **Analysis:** The VSTL analyzes the source code or hardware spec to verify the change is truly *de minimis*. They inspect the code to ensure no new logic is introduced that affects vote tabulation.  
4. **Reporting:** The VSTL issues a report to the EAC.  
5. **Approval:** The EAC reviews the VSTL report and, if satisfied, authorizes the ECO. The system retains its certification status.5

**Insight:** The ECO process is the *antithesis* of a bypass mechanism. It is a documented, regulated, and third-party-verified trail that ensures minor updates *remain* within the certification umbrella.

### **2.2 Case Study: The Georgia "Display Issue" (October 2020\)**

The research material highlights a specific incident in Georgia that fueled the ECO conspiracy theory.

The Incident:  
On September 28, 2020, during pre-election logic and accuracy testing, a display issue was discovered on Dominion Ballot Marking Devices (BMDs). In races with a large number of candidates (e.g., the US Senate race with 20+ candidates), the names did not fit on a single screen, and the interface for scrolling was deemed potentially confusing.7  
The Remediation:  
Dominion engineers developed a software modification to fix the UI rendering issue.

* **October 5, 2020:** Dominion submitted the software modification to the EAC.  
* **October 7, 2020:** Pro V\&V (the VSTL) submitted their analysis to the EAC, verifying the change was *de minimis*—it fixed the display but did not touch the tabulation engine or vote-counting logic.7  
* **Implementation:** The software was deployed to the machines via a "Trusted Build."

The Judicial Ruling:  
In Curling v. Raffensperger, plaintiffs argued this late update violated the certification freeze. The court, however, examined the evidence and found that the State and Dominion had followed the federal ECO protocols. The update was necessary to prevent voter confusion, was verified by an independent lab, and was processed through the EAC. The court found no evidence that this update introduced "rigged" code; rather, it was a routine (albeit high-pressure) maintenance action.7

### **2.3 The "Trusted Build" Ritual**

The term "Trusted Build" appears frequently in the snippets, often cast in a sinister light. In reality, it is the gold standard for chain-of-custody in software deployment.

The Process:  
A Trusted Build is an event where the voting system software is compiled from source code into executable binaries in a "Clean Room" environment at the VSTL.

1. **Sanitization:** The build computer’s hard drive is wiped.  
2. **Source Retrieval:** Source code is pulled directly from the certified repository.  
3. **Hashing:** As the software is compiled, a **cryptographic hash** (a digital fingerprint) is generated for every file.  
4. **Distribution:** The resulting software is transferred to WORM (Write Once, Read Many) media.8

Verification:  
State election officials can verify the integrity of the software on any machine by running a hash check. If a single line of code were altered (e.g., by a hacker or a "Serbian" script), the cryptographic hash would change entirely, alerting the official.  
The Tina Peters Breach:  
The importance of the Trusted Build was highlighted in the case of Mesa County, Colorado Clerk Tina Peters. The snippets indicate that during a Trusted Build update (specifically, an update to install the ECO mentioned above), unauthorized persons were allowed to image the hard drive. This breach of the "Clean Room" protocol led the Colorado Secretary of State to decertify the machines—not because the software was bad, but because the custody of the Trusted Build had been violated by the Clerk herself.10

## ---

**Part III: Statistical Forensics and the "Blue Shift"**

The third major vector of disinformation involves the interpretation of election data. The "tweet and video" analysis likely referenced claims that vote updates showing 80% or 90% support for Joe Biden were "statistically impossible."

### **3.1 The "Four Spikes" and the Blue Shift**

In *King v. Whitmer*, the plaintiffs pointed to four specific spikes in the vote count reporting in Michigan and Georgia. They claimed these vertical jumps in the graph were evidence of ballot stuffing.

The Mechanism of the Spikes:  
The spikes coincided with the release of results from Absentee Voter Counting Boards (AVCBs) in major urban centers like Detroit and Atlanta.

1. **Legal Restrictions:** In Michigan and Pennsylvania, state legislatures (controlled by Republicans at the time) prohibited election officials from processing mail-in ballots before Election Day (or gave very limited time). This meant that while in-person votes (which leaned Republican) were counted and reported throughout the evening, the massive pile of mail-in ballots could only be tabulated late into the night and the following days.1  
2. **Partisan Behavior:** Due to President Trump's repeated discouragement of mail-in voting and the Democrats' encouragement of it during the COVID-19 pandemic, mail-in ballots were disproportionately Democratic.  
3. **The Result:** When a batch of 20,000 mail-in ballots from Detroit was processed and uploaded, it naturally skewed heavily (80-90%) toward Biden. This is not a statistical anomaly; it is a **procedural inevitability** known as the "Blue Shift."

### **3.2 The Misrepresentation of Expert Testimony**

The plaintiffs supported their claims of "impossibility" with affidavits from experts like Dr. William Young and Dr. Louis Bouchard. However, the forensic review of these documents by the court revealed a pattern of deception by the attorneys.

Dr. Young's Report:  
Dr. Young analyzed the data and opined that the shift in suburban votes was "unexpected" based on historical trends.

* *The Distortion:* The complaint filed by the attorneys changed "unexpected" to a definitive claim that there were **190,000 "excess" and "likely fraudulent" votes**.  
* *The Sanction:* Judge Parker ruled that equating "unexpected" with "fraudulent" was a material misrepresentation. A shift in voting behavior (suburban voters moving away from Trump) is a political phenomenon, not a forensic crime. To claim it is "fraud" without evidence of a mechanism is sanctionable.1

Dr. Bouchard's Report:  
Dr. Bouchard claimed the spikes were "statistically impossible" because Biden’s vote totals in Michigan had "anomalous" spikes that did not appear in Florida.

* *The Rebuttal:* The court noted the absurdity of this comparison. Florida processes mail-in ballots *weeks* before the election, allowing them to be reported immediately when polls close. Michigan processes them *during* and *after* election day. Comparing the *timing* of vote releases between states with opposite legal frameworks is statistically invalid. The "anomaly" was a function of state law, not fraud.1

### **3.3 Anatomy of a Discredited Witness: Mellissa Carone**

Mellissa Carone, a contract IT worker for Dominion, became a viral sensation after testifying before the Michigan Senate Oversight Committee and the court. Her testimony is the likely source of the "80% / 90%" claims in the analyzed video.

The Testimony:  
Carone claimed she witnessed poll workers at the TCF Center in Detroit running ballots through tabulators "eight to ten times" consecutively.1 She asserted this resulted in a massive inflation of Biden votes.  
**Forensic Rebuttal:**

1. **The Poll Book Constraint:** Election integrity relies on "balancing the poll book." The number of voters checked in (the poll book) must match the number of ballots tabulated. If a worker ran a batch of 50 ballots through 10 times, the tabulator would record 500 votes. At the end of the night, the precinct would be off by 450 votes. The canvas would not balance, and the precinct would not be certifiable.  
2. **The Evidence:** The Wayne County canvass *did* show some imbalances, but they were minor (e.g., off by 1-4 votes due to paper jams or clerical errors), not the tens of thousands implied by Carone.  
3. **Judicial Credibility:** In *King v. Whitmer*, the court found Carone’s allegations "simply not credible." The judge noted that no other challenger—Republican or Democrat—corroborated seeing ballots scanned ten times in plain view. The court concluded that Carone’s interpretation of standard jam-clearing procedures (where a ballot is re-scanned after an error) as "fraud" demonstrated a lack of understanding of election procedures, not evidence of a crime.1

## ---

**Part IV: The "SCIF," Remote Access, and Foreign Nexus Claims**

The final cluster of claims involves the alleged international conspiracy: that Dominion machines were connected to the internet, accessed by "Serbian" actors, and that this activity was monitored or known by officials in "The SCIF."

### **4.1 "The SCIF" – Disentangling Location from Source**

The snippets reveal a conflation of terms that has likely fueled disinformation.

The Physical SCIF:  
A Sensitive Compartmented Information Facility (SCIF) is a secure room used by government officials to discuss classified material.

* *The Facts:* Transcripts from the January 6th Committee interviews with DOJ officials (like Richard Donoghue) show that meetings regarding election fraud allegations *took place* in a SCIF. However, the content of those meetings was the **refutation** of fraud. General Milley and others discussed that the Intelligence Community (IC) had "no evidence" of foreign interference while inside these secure facilities.12  
* *The Distortion:* The claim that "The SCIF" (as an entity) proved fraud reverses the reality. The officials *in* the SCIF concluded there was no fraud.

"TheSCIF" Media Entity:  
The research snippets also identify "TheSCIF" as a Twitter handle and podcast discussing national security (e.g., "Episode 382: Trump 2.0"). This entity analyzes news; it is not a government source. It is possible the "tweet and video" in the user query originated from or referenced this media outlet, which may have been discussing the election, leading to a game of "telephone" where the source (a podcast) became the proof (a government facility).15

### **4.2 The "Serbian" Connection**

The claim that vote tallies were routed to Serbia is derived entirely from the affidavit of Joshua Merritt ("Spyder").

Forensic Analysis of the Claim:  
Merritt alleged that he saw traffic communicating with Serbian IP addresses.

1. **Rebuttal:** As established in Part I, Merritt was not a qualified intelligence analyst.  
2. **The Explanation:** Independent cybersecurity audits of Dominion systems often find IP addresses associated with employees or subsidiaries. Dominion has offices in Canada and the US and uses contractors globally for software development (though the code is reviewed in the US). However, the specific claim of *election night* traffic to Serbia was never corroborated by packet captures or server logs in any court case.  
3. **Search False Positives:** Interestingly, keyword searches for "Serbian" in the snippets return results about sanctions on the Milosevic regime in the 1990s or basketball players, highlighting how vague keyword associations can be spun into conspiracies.17

### **4.3 Remote Access: Theoretical vs. Actual**

Dr. J. Alex Halderman, a computer science professor, provided testimony in *Curling v. Raffensperger* that Dominion BMDs *could* theoretically be hacked if an attacker had physical access or if the election definition files were compromised.19

**The Crucial Distinction:**

* **Vulnerability:** Halderman proved a *capability* exists (e.g., you *can* install malware via a USB stick).  
* **Exploitation:** The court found **no evidence** that this vulnerability was actually exploited in the 2020 election.  
* **Coffee County:** The only confirmed instance of unauthorized access occurred in Coffee County, Georgia, where local officials (Trump supporters) *invited* unauthorized analysts to copy the software. This was a breach *by the plaintiffs' side* of the argument, not a remote hack by foreign adversaries.19

## ---

**Part V: Judicial Adjudication and Sanctions**

The culmination of these claims—Spyder, ECOs, 90% spikes—occurred in the federal court system, where they were subjected to the rules of evidence. The outcome was not just a rejection of the claims, but a condemnation of the process used to present them.

### **5.1 Rule 11 Sanctions in *King v. Whitmer***

In August 2021, Judge Linda Parker issued a historic sanctions order against Sidney Powell, Lin Wood, and seven other attorneys.

The "Duty of Candor":  
The court ruled that attorneys cannot simply act as a conduit for any affidavit given to them. They have a duty of candor to the court to perform a "reasonable inquiry" into the facts.

* *The Failure:* The attorneys failed to verify Merritt's military credentials. They failed to ask Carone why her claims contradicted the poll books. They failed to read their own experts' reports accurately, changing "unexpected" to "fraudulent".1

The Judgment:  
The court ordered the attorneys to pay over $175,000 in legal fees to the City of Detroit and the State of Michigan. More significantly, the judge referred the attorneys to their respective state bars for disbarment or suspension, stating:  
*"This lawsuit represents a historic and profound abuse of the judicial process... Plaintiffs filled this Court with baseless claims, specifically designed to undermine faith in the democratic process"*.1

### **5.2 Final Status of Evidence**

As of this report's generation, no court in the United States has found the claims regarding "Spyder," the misuse of ECOs, or the "statistically impossible" vote dumps to be credible. Every legal challenge based on these premises has been dismissed, and the proponents have faced professional and financial ruin.

## ---

**Conclusion**

The investigation into the claims surrounding the 2020 election tweet and video transcription reveals a systematic construction of disinformation. The narrative relies on a "house of cards" structure:

1. **Authority** was manufactured by labeling an IT consultant (Joshua Merritt) as a "Military Intelligence Expert," a claim proven to be a lie.  
2. **Technical Credibility** was fabricated by distorting routine maintenance procedures (ECOs) and security protocols (Trusted Builds) into evidence of malfeasance.  
3. **Statistical Proof** was generated by misinterpreting the "Blue Shift" phenomenon and misquoting expert reports to create "impossibilities" where only political trends existed.  
4. **Corroboration** was simulated by citing the "SCIF," confusing a physical location with an intelligence source.

The "many pieces of evidence" showing the claims are false are not merely opinions; they are federal court findings, verified military records, and the immutable technical specifications of the voting systems in question.

## **Source List (Untruncated)**

1. **King v. Whitmer Sanctions Appendix:** [https://www.supremecourt.gov/DocketPDF/23/23-486/288969/20231106174034779\_DTR%20Cert%20Pet%20ED%20Mich%20Sanctions%20Appendix.pdf](https://www.supremecourt.gov/DocketPDF/23/23-486/288969/20231106174034779_DTR%20Cert%20Pet%20ED%20Mich%20Sanctions%20Appendix.pdf)  
2. **Palestinian/Israeli Conflict (Misidentified Snippet):** [https://www.tandfonline.com/doi/full/10.1080/13537121.2024.2394292](https://www.tandfonline.com/doi/full/10.1080/13537121.2024.2394292)  
3. **Election Denialism Research:** [https://scarab.bates.edu/cgi/viewcontent.cgi?article=1484\&context=honorstheses](https://scarab.bates.edu/cgi/viewcontent.cgi?article=1484&context=honorstheses)  
4. **Lee Zeldin Confirmation Hearing:** [https://www.rev.com/transcripts/lee-zeldin-confirmation-hearing](https://www.rev.com/transcripts/lee-zeldin-confirmation-hearing)  
5. **January 6th Committee Documents (Twitter Analysis):** [https://www.washingtonpost.com/documents/5bfed332-d350-47c0-8562-0137a4435c68.pdf](https://www.washingtonpost.com/documents/5bfed332-d350-47c0-8562-0137a4435c68.pdf)  
6. **EAC Testimony (Brian Hancock) on ECOs:** [https://www.eac.gov/sites/default/files/event\_document/files/Brian-Hancock-Testimony-for-Presidential-Commission-9.19.13.pdf](https://www.eac.gov/sites/default/files/event_document/files/Brian-Hancock-Testimony-for-Presidential-Commission-9.19.13.pdf)  
7. **State Defendants Response (Curling v. Raffensperger):** [https://www.brennancenter.org/sites/default/files/2020-10/STATE\_DEFENDANTS%27\_RESPONSE\_TO\_THE\_COURT%E2%80%99S\_ORDER%2C\_%5BDOC.%20957%5D.pdf](https://www.brennancenter.org/sites/default/files/2020-10/STATE_DEFENDANTS%27_RESPONSE_TO_THE_COURT%E2%80%99S_ORDER%2C_%5BDOC.%20957%5D.pdf)  
8. **Colorado Secretary of State Election Rules:** [http://www.coloradosos.gov/pubs/rule\_making/CurrentRules/8CCR1505-1/ElectionRules.pdf](http://www.coloradosos.gov/pubs/rule_making/CurrentRules/8CCR1505-1/ElectionRules.pdf)  
9. **Curling v. Raffensperger Supplemental Authority:** [https://www.supremecourt.gov/DocketPDF/20/20-799/163752/20201214175737710\_Notice%20of%20Supplemental%20Authority%2012.14.20.pdf](https://www.supremecourt.gov/DocketPDF/20/20-799/163752/20201214175737710_Notice%20of%20Supplemental%20Authority%2012.14.20.pdf)  
10. **House Hearing on Election Security (ES\&S Testimony):** [https://www.congress.gov/event/116th-congress/house-event/LC65587/text](https://www.congress.gov/event/116th-congress/house-event/LC65587/text)  
11. **Newspaper Snippet (Lakers/Serbian):** [https://ufdcimages.uflib.ufl.edu/AA/00/06/85/31/00080/09-06-2019.pdf](https://ufdcimages.uflib.ufl.edu/AA/00/06/85/31/00080/09-06-2019.pdf)  
12. **Berkeley NLP Project (Word Associations):** [https://snap.berkeley.edu/project/11166188](https://snap.berkeley.edu/project/11166188)  
13. **Dominion Exhibits (Mellissa Carone):** [https://timesofsandiego.com/wp-content/uploads/2021/08/DOMINION-EXHIBITS-1.pdf](https://timesofsandiego.com/wp-content/uploads/2021/08/DOMINION-EXHIBITS-1.pdf)  
14. **Dominion Democracy Suite Test Report:** [https://www.eac.gov/sites/default/files/voting\_system/files/Dominion%20Democracy%20Suite%204.0%20Test%20Report%20with%20Certification%20Number.pdf](https://www.eac.gov/sites/default/files/voting_system/files/Dominion%20Democracy%20Suite%204.0%20Test%20Report%20with%20Certification%20Number.pdf)  
15. **PA Courts Report:** [https://www.pacourts.us/Storage/media/pdfs/20210604/183859-file-8389.pdf](https://www.pacourts.us/Storage/media/pdfs/20210604/183859-file-8389.pdf)  
16. **Democracy Docket (TRO Petition):** [https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.26-Petition-for-Ex-Parte-Temporary-Restraining-Order-1.pdf](https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.26-Petition-for-Ex-Parte-Temporary-Restraining-Order-1.pdf)  
17. **Democracy Docket (Complaint):** [https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.11-Complaint-for-Declaratory-Judgment.pdf](https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.11-Complaint-for-Declaratory-Judgment.pdf)  
18. **Denver District Court (Defending the Republic Depo):** [https://www.courts.state.co.us/userfiles/file/Court\_Probation/02nd\_Judicial\_District/Denver\_District\_Court/Cases%20of%20Interest/20CV34319/001/2021-09-17%2019-56-42%20EXHIBIT%20L-1%20%20Defending%20the%20Republic%20Depo%20and%20Exhibits%2008-04-21.pdf](https://www.courts.state.co.us/userfiles/file/Court_Probation/02nd_Judicial_District/Denver_District_Court/Cases%20of%20Interest/20CV34319/001/2021-09-17%2019-56-42%20EXHIBIT%20L-1%20%20Defending%20the%20Republic%20Depo%20and%20Exhibits%2008-04-21.pdf)  
19. **Curling v. Raffensperger (FindLaw):** [https://caselaw.findlaw.com/court/us-dis-crt-n-d-geo-atl-div/115452270.html](https://caselaw.findlaw.com/court/us-dis-crt-n-d-geo-atl-div/115452270.html)  
20. **Democracy Docket (Summary Judgment Order):** [https://www.democracydocket.com/wp-content/uploads/2022/09/Order-granting-in-part-and-denying-in-part-motion-for-summary-judgment-.pdf](https://www.democracydocket.com/wp-content/uploads/2022/09/Order-granting-in-part-and-denying-in-part-motion-for-summary-judgment-.pdf)  
21. **Democracy Docket (Verified Complaint):** [https://www.democracydocket.com/wp-content/uploads/2022/11/2022.09.30-Verified-Complaint.pdf](https://www.democracydocket.com/wp-content/uploads/2022/11/2022.09.30-Verified-Complaint.pdf)  
22. **House Hearing (Election Infrastructure):** [https://www.congress.gov/117/chrg/CHRG-117hhrg47316/CHRG-117hhrg47316.pdf](https://www.congress.gov/117/chrg/CHRG-117hhrg47316/CHRG-117hhrg47316.pdf)  
23. **BridgeMI Article (Sanctions/Spyder):** [https://bridgemi.com/michigan-government/judge-eyes-sanctions-kraken-case-sought-overturn-michigan-vote/](https://bridgemi.com/michigan-government/judge-eyes-sanctions-kraken-case-sought-overturn-michigan-vote/)  
24. **Justia (King v. Whitmer Sanctions):** [https://law.justia.com/cases/federal/district-courts/michigan/miedce/2:2020cv13134/350905/172/](https://law.justia.com/cases/federal/district-courts/michigan/miedce/2:2020cv13134/350905/172/)  
25. **Duke Law Magazine (Context on Serbia):** [https://law.duke.edu/news/pdf/lawmagfall99.pdf](https://law.duke.edu/news/pdf/lawmagfall99.pdf)  
26. **Jan 6 Transcript (General Milley):** [https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000916115/pdf/GPO-J6-TRANSCRIPT-CTRL0000916115.pdf](https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000916115/pdf/GPO-J6-TRANSCRIPT-CTRL0000916115.pdf)  
27. **Jan 6 Transcript (Jeffrey Clark):** [https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000034600/pdf/GPO-J6-TRANSCRIPT-CTRL0000034600.pdf](https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000034600/pdf/GPO-J6-TRANSCRIPT-CTRL0000034600.pdf)  
28. **Senate Judiciary (Donoghue Transcript):** [https://www.judiciary.senate.gov/imo/media/doc/Donoghue%20Transcript.pdf](https://www.judiciary.senate.gov/imo/media/doc/Donoghue%20Transcript.pdf)  
29. **Supplementary Info (Impeachment Tweets):** [https://www.nowpublishers.com/article/details/supplementary-info/100.00024033\_app.pdf](https://www.nowpublishers.com/article/details/supplementary-info/100.00024033_app.pdf)  
30. **Maryland Board of Public Works (1980 ECO Reference):** [https://bpw.maryland.gov/MeetingDocsArchives/11-1980%20November%2025%20Minutes.pdf?csf=1\&e=qJ5SD9](https://bpw.maryland.gov/MeetingDocsArchives/11-1980%20November%2025%20Minutes.pdf?csf=1&e=qJ5SD9)  
31. **Georgia Judicial Council (Remote Access):** [https://jcaoc.georgiacourts.gov/wp-content/uploads/2024/05/12072018JudicialCouncil\_EVersion\_updated.pdf](https://jcaoc.georgiacourts.gov/wp-content/uploads/2024/05/12072018JudicialCouncil_EVersion_updated.pdf)  
32. **SRI Risks Digest (Remote Access/Serbian):** ftp://[ftp.sri.com/risks/illustrative.pdf](https://ftp.sri.com/risks/illustrative.pdf)  
33. **The SCIF Podcast (Trump 2.0):** [https://thescif.org/episode-382-trump-2-0-whats-in-store-for-u-s-national-security-0bb1af4ab502](https://thescif.org/episode-382-trump-2-0-whats-in-store-for-u-s-national-security-0bb1af4ab502)  
34. **The SCIF Podcast (Election Meddling):** [https://thescif.org/episode-197-neighborly-election-meddling-1d04d7aaa703](https://thescif.org/episode-197-neighborly-election-meddling-1d04d7aaa703)  
35. **The SCIF Podcast (Iran):** [https://thescif.org/episode-363-ayatollahs-algorithm-for-u-s-elections-31bd3d57a26a](https://thescif.org/episode-363-ayatollahs-algorithm-for-u-s-elections-31bd3d57a26a)  
36. **The SCIF Podcast (Iraq):** [https://thescif.org/episode-527-baghdad-at-the-ballot-box-what-iraqs-election-means-for-the-u-s-663301ae907e](https://thescif.org/episode-527-baghdad-at-the-ballot-box-what-iraqs-election-means-for-the-u-s-663301ae907e)  
37. **Michigan AG Reply in Support of Sanctions:** [https://www.michigan.gov/ag/-/media/Project/Websites/AG/election/131\_def\_whitmer\_benson\_reply\_in\_support\_of\_mtn\_for\_sanctions.pdf](https://www.michigan.gov/ag/-/media/Project/Websites/AG/election/131_def_whitmer_benson_reply_in_support_of_mtn_for_sanctions.pdf)  
38. **Response to Cert Petition (Democracy Docket):** [https://www.supremecourt.gov/DocketPDF/20/20-815/166373/20210114172225286\_COD%20Response%20to%20Petition%20for%20Certiorari%20with%20Appendix.pdf](https://www.supremecourt.gov/DocketPDF/20/20-815/166373/20210114172225286_COD%20Response%20to%20Petition%20for%20Certiorari%20with%20Appendix.pdf)  
39. **Wikipedia (Sidney Powell/Spyder):** [https://en.wikipedia.org/wiki/Sidney\_Powell](https://en.wikipedia.org/wiki/Sidney_Powell)

#### **Works cited**

1. Appendix \- In the Supreme Court of the United States, accessed December 26, 2025, [https://www.supremecourt.gov/DocketPDF/23/23-486/288969/20231106174034779\_DTR%20Cert%20Pet%20ED%20Mich%20Sanctions%20Appendix.pdf](https://www.supremecourt.gov/DocketPDF/23/23-486/288969/20231106174034779_DTR%20Cert%20Pet%20ED%20Mich%20Sanctions%20Appendix.pdf)  
2. Judge eyes sanctions in 'Kraken' case that sought to overturn Michigan vote, accessed December 26, 2025, [https://bridgemi.com/michigan-government/judge-eyes-sanctions-kraken-case-sought-overturn-michigan-vote/](https://bridgemi.com/michigan-government/judge-eyes-sanctions-kraken-case-sought-overturn-michigan-vote/)  
3. Sidney Powell \- Wikipedia, accessed December 26, 2025, [https://en.wikipedia.org/wiki/Sidney\_Powell](https://en.wikipedia.org/wiki/Sidney_Powell)  
4. Testimony of Brian J. Hancock for the Presidential Commission on Election Administration, accessed December 26, 2025, [https://www.eac.gov/sites/default/files/event\_document/files/Brian-Hancock-Testimony-for-Presidential-Commission-9.19.13.pdf](https://www.eac.gov/sites/default/files/event_document/files/Brian-Hancock-Testimony-for-Presidential-Commission-9.19.13.pdf)  
5. state defendants' response to the court's order, \[doc. 957\] \- Brennan Center for Justice, accessed December 26, 2025, [https://www.brennancenter.org/sites/default/files/2020-10/STATE\_DEFENDANTS%27\_RESPONSE\_TO\_THE\_COURT%E2%80%99S\_ORDER%2C\_%5BDOC.%20957%5D.pdf](https://www.brennancenter.org/sites/default/files/2020-10/STATE_DEFENDANTS%27_RESPONSE_TO_THE_COURT%E2%80%99S_ORDER%2C_%5BDOC.%20957%5D.pdf)  
6. Colorado Secretary of State \- Election Rules \[8 CCR 1505-1\], accessed December 26, 2025, [http://www.coloradosos.gov/pubs/rule\_making/CurrentRules/8CCR1505-1/ElectionRules.pdf](http://www.coloradosos.gov/pubs/rule_making/CurrentRules/8CCR1505-1/ElectionRules.pdf)  
7. Case 1:17-cv-02989-AT Document 964 Filed 10/11/20 Page 1 of 147 \- Supreme Court, accessed December 26, 2025, [https://www.supremecourt.gov/DocketPDF/20/20-799/163752/20201214175737710\_Notice%20of%20Supplemental%20Authority%2012.14.20.pdf](https://www.supremecourt.gov/DocketPDF/20/20-799/163752/20201214175737710_Notice%20of%20Supplemental%20Authority%2012.14.20.pdf)  
8. Dominion Democracy Suite 4.0 Test Report with Certification Number.pdf, accessed December 26, 2025, [https://www.eac.gov/sites/default/files/voting\_system/files/Dominion%20Democracy%20Suite%204.0%20Test%20Report%20with%20Certification%20Number.pdf](https://www.eac.gov/sites/default/files/voting_system/files/Dominion%20Democracy%20Suite%204.0%20Test%20Report%20with%20Certification%20Number.pdf)  
9. in the superior court of jackson county \- Democracy Docket, accessed December 26, 2025, [https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.26-Petition-for-Ex-Parte-Temporary-Restraining-Order-1.pdf](https://www.democracydocket.com/wp-content/uploads/2022/11/2022.10.26-Petition-for-Ex-Parte-Temporary-Restraining-Order-1.pdf)  
10. DISTRICT COURT, DENVER COUNTY, COLORADO 1437 Bannock Street Denver, CO 80202 COURT USE ONLY ERIC COOMER, Ph.D., Plaintiff vs. D, accessed December 26, 2025, [https://www.courts.state.co.us/userfiles/file/Court\_Probation/02nd\_Judicial\_District/Denver\_District\_Court/Cases%20of%20Interest/20CV34319/001/2021-09-17%2019-56-42%20EXHIBIT%20L-1%20%20Defending%20the%20Republic%20Depo%20and%20Exhibits%2008-04-21.pdf](https://www.courts.state.co.us/userfiles/file/Court_Probation/02nd_Judicial_District/Denver_District_Court/Cases%20of%20Interest/20CV34319/001/2021-09-17%2019-56-42%20EXHIBIT%20L-1%20%20Defending%20the%20Republic%20Depo%20and%20Exhibits%2008-04-21.pdf)  
11. Case 1:21-cv-02130-CJN Document 2 Filed 08/10/21 Page 1 of 12 \- Times of San Diego, accessed December 26, 2025, [https://timesofsandiego.com/wp-content/uploads/2021/08/DOMINION-EXHIBITS-1.pdf](https://timesofsandiego.com/wp-content/uploads/2021/08/DOMINION-EXHIBITS-1.pdf)  
12. 1 4 SELECT COMMITTEE TO INVESTIGATE THE 5 JANUARY 6TH ATTACK ON THE U.S. CAPITOL, 6 U.S. HOUSE OF REPRESENTATIVES, 7 WASHINGTON, \- GovInfo, accessed December 26, 2025, [https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000916115/pdf/GPO-J6-TRANSCRIPT-CTRL0000916115.pdf](https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000916115/pdf/GPO-J6-TRANSCRIPT-CTRL0000916115.pdf)  
13. 1 4 SELECT COMMITTEE TO INVESTIGATE THE 5 JANUARY 6TH ATTACK ON THE U.S. CAPITOL, 6 U.S. HOUSE OF REPRESENTATIVES, 7 WASHINGTON, \- GovInfo, accessed December 26, 2025, [https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000034600/pdf/GPO-J6-TRANSCRIPT-CTRL0000034600.pdf](https://www.govinfo.gov/content/pkg/GPO-J6-TRANSCRIPT-CTRL0000034600/pdf/GPO-J6-TRANSCRIPT-CTRL0000034600.pdf)  
14. 1 www.trustpoint.one 800.FOR.DEPO www.aldersonreporting.com (800.367.3376) \- Senate Judiciary Committee, accessed December 26, 2025, [https://www.judiciary.senate.gov/imo/media/doc/Donoghue%20Transcript.pdf](https://www.judiciary.senate.gov/imo/media/doc/Donoghue%20Transcript.pdf)  
15. Episode 382: Trump 2.0: What's in Store for U.S. National Security \- The SCIF, accessed December 26, 2025, [https://thescif.org/episode-382-trump-2-0-whats-in-store-for-u-s-national-security-0bb1af4ab502](https://thescif.org/episode-382-trump-2-0-whats-in-store-for-u-s-national-security-0bb1af4ab502)  
16. Episode 197: Neighborly Election Meddling | by National Security Institute | The SCIF, accessed December 26, 2025, [https://thescif.org/episode-197-neighborly-election-meddling-1d04d7aaa703](https://thescif.org/episode-197-neighborly-election-meddling-1d04d7aaa703)  
17. Survivors face devastation \- UFDC Image Array 2, accessed December 26, 2025, [https://ufdcimages.uflib.ufl.edu/AA/00/06/85/31/00080/09-06-2019.pdf](https://ufdcimages.uflib.ufl.edu/AA/00/06/85/31/00080/09-06-2019.pdf)  
18. Contents \- FTP Directory Listing, accessed December 26, 2025, [ftp://ftp.sri.com/risks/illustrative.pdf](ftp://ftp.sri.com/risks/illustrative.pdf)  
19. CURLING v. RAFFENSPERGER (2023) \- FindLaw Caselaw, accessed December 26, 2025, [https://caselaw.findlaw.com/court/us-dis-crt-n-d-geo-atl-div/115452270.html](https://caselaw.findlaw.com/court/us-dis-crt-n-d-geo-atl-div/115452270.html)  
20. Case 1:17-cv-02989-AT Document 1705 Filed 11/10/23 Page 1 of 135 \- RETRIEVED FROM DEMOCRACYDOCKET.COM, accessed December 26, 2025, [https://www.democracydocket.com/wp-content/uploads/2022/09/Order-granting-in-part-and-denying-in-part-motion-for-summary-judgment-.pdf](https://www.democracydocket.com/wp-content/uploads/2022/09/Order-granting-in-part-and-denying-in-part-motion-for-summary-judgment-.pdf)  
21. King et al v. Whitmer et al, No. 2:2020cv13134 \- Document 172 (E.D. Mich. 2021), accessed December 26, 2025, [https://law.justia.com/cases/federal/district-courts/michigan/miedce/2:2020cv13134/350905/172/](https://law.justia.com/cases/federal/district-courts/michigan/miedce/2:2020cv13134/350905/172/)