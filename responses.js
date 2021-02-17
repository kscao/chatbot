var keys = [
    'alcohol, drinking, drink, drunk, hangover, hungover, blackout',
    'marijuana, pot, weed, smoke, vape',
    'allergy, allergic, allergic reaction',
    'contraception, birth control, pregnancy, pregnant, IUD, pill, condom, condoms, sex',
    'eating, eat, binge, vomit, eating disorder, bulimia, anorexia, food issues',
    'flu, flu shot, vaccine, vacciniation',
    'gynecological, gynecology, gynecologist, obgyn, annual exam',
    'physical therapy, injury, hurt, physical therapist',
    'prescription, refill',
    'STI, sexually transmitted infection, STD, sexually transmitted disease, tested, testing, gonorrhea, herpes, chlamydia, HPV, syphilis, genital, HIV, AIDS',
    'referral, off campus, off-campus, refer, specialist, travel, traveling',
    'externship, training program, clinical training',
    'travel, abroad, trip, foreign',
    'sports, fitness, athelete, sport, exercise',
    'record, records, medical records',
    'academic, studying, learning, study, procrastination, study',
    "drop-in, drop in, dropin, let's talk, lets talk",
    'MHFA, mental health first aid',
    'psychiatry, psychiatrist, psychologist, mental disorder, therapy, counseling, depression, anxiety, accomodation, accomodations, OCD, ADD, ADHD, bipolar, therapist',
    'sleep, insomnia, sleepless, sleeplessness, sleepy',
    'insurance, USHIP, uship, united healthcare, covered, copay, deductible, out of pocket, cost, life event, dental, vision, enroll, waive ',
    'sun, seasonal, sunshine, sunlight',
    'relationship, couple, couples, boyfriend, girlfriend, partner',
    'appointment, schedule'
];

var genericResponse = 'The following resource(s) may be able to help you:';
var appointment = '<ol><li>You can make an appointment with student health by calling 773.702.4156 during business hours.</li><li>You can make an appointment with student counseling at 773.702.9800 or walk in to the office at 5555 South Woodlawn Avenue during office hours (8:30 a.m.–5 p.m.) to schedule an appointment.</li><li>For more information on appointments, see <a href="http://wellness.uchicago.edu/about/appointments/" target="_blank">http://wellness.uchicago.edu/about/appointments/</a></li></ol>';
var therapy = "There is a list of therapy options for you:<ol><li>Let's talk: walk-in confidential consultations with therapists from SCS.<a href='https://wellness.uchicago.edu/mental-health/lets-talk/' target='_blank'>https://wellness.uchicago.edu/mental-health/lets-talk/</a></li><li>Therapy: <a href='https://wellness.uchicago.edu/mental-health/counseling/' target='_blank'>https://wellness.uchicago.edu/mental-health/counseling/</a></li><li>Group therapy: <a href='https://wellness.uchicago.edu/mental-health/therapy-groups/ target='_blank'>https://wellness.uchicago.edu/mental-health/therapy-groups/</a></li><li>Weekly workshops:<a href='https://wellness.uchicago.edu/mental-health/weekly-workshops/' target='_blank'>https://wellness.uchicago.edu/mental-health/weekly-workshops/</a></li></ol>";
var cost = 'You can talk to employees of UnitedHealthcare StudentResources, who are available to assist students with questions about the University Health Insurance Plan (U-SHIP). Call 773.834.4543 (press option #2) to reach them.';

var responses = [
    ' <a href="https://wellness.uchicago.edu/healthy-living/wellness-programming/brief-alcohol-screening-and-intervention-for-college-and-graduate-students/" target="_blank">Information on alcohol screening</a><a href="https://wellness.uchicago.edu/healthy-living/health-information/alcohol-and-other-drugs/" target="_blank">Information on alcohol and other drugs</a><a href="https://interwork.sdsu.edu/echeckup/usa/alc/coll/?id=uchicago&hfs=true" target="_blank">Alcohol eCheckup</a>',
    ' <a href="https://interwork.sdsu.edu/echeckup/usa/mj/coll/?id=uchicago&hfs=true" target="_blank">Marijuana eCheckup</a><a href="https://wellness.uchicago.edu/healthy-living/health-information/alcohol-and-other-drugs/" target="_blank">Information on alcohol and other drugs</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/allergy-injections/" target="_blank">allergy injections</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/contraception-consultations/" target="_blank">contraception consultations</a> <a href="https://wellness.uchicago.edu/healthy-living/health-information/sexual-health/" target="_blank">information on sexual health</a>',
    ' <a href="https://wellness.uchicago.edu/mental-health/eating-concerns-support-and-assessment/" target="_blank">eating concerns support</a> <a href="https://wellness.uchicago.edu/healthy-living/health-information/body-image-and-eating-concerns/" target="_blank">body image</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/flu-vaccinations/" target="_blank">flu vaccinations</a> <a href="https://wellness.uchicago.edu/medical-services/immunizations/" target="_blank">immunizations</a> <a href="https://wellness.uchicago.edu/medical-services/vaccine-price-list/" target="_blank">list of vaccine and prices</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/gynecological-exams/" target="_blank">gynecological exams</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/physical-therapy/" target="_blank">physical therapy</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/shs-prescription-refills/" target="_blank">refill at student health</a> <a href="https://wellness.uchicago.edu/mental-health/scs-prescription-refills/" target="_blank">refill at student counseling</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/sti-testing/" target="_blank">STI testing</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/referrals-to-other-medical-specialists/" target="_blank">referrals from student health</a> <a href="https://wellness.uchicago.edu/mental-health/referrals-from-scs/" target="_blank">referrals from student counseling</a>',
    ' <a href="https://wellness.uchicago.edu/mental-health/post-doctoral-psychology-training-program/" target="_blank">training programs</a> <a href="https://wellness.uchicago.edu/mental-health/advanced-externship-training-program/" target="_blank">externship information</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/travel-consultations/" target="_blank">travel consultations</a>',
    ' <a href="https://wellness.uchicago.edu/medical-services/sports-medicine/" target="_blank">sports medicine</a>',
    ' <a href="https://www.uchicagomedicine.org/-/media/pdfs/adult-pdfs/patients-and-visitors/patients/request-an-authorization-form.pdf?la=en&hash=3C7C767E5D216A90FAB7EE7D1C6974E2E7A78FF0" target="_blank">Request for medical records</a>',
    ' <a href="https://wellness.uchicago.edu/mental-health/academic-skills-assessment-program/" target="_blank">academic help</a>',
    ' <a href="https://wellness.uchicago.edu/mental-health/lets-talk/" target="_blank">drop-in therapy</a>',
    ' <a href="https://wellness.uchicago.edu/healthy-living/wellness-programming/mental-health-first-aid/" target="_blank">Information on mental health first aid</a>',
    ' <a href="https://wellness.uchicago.edu/mental-health/counseling/" target="_blank">Information on counseling</a> <a href="https://wellness.uchicago.edu/mental-health/lets-talk/" target="_blank">drop-in therapy</a> <a href="https://wellness.uchicago.edu/mental-health/therapy-groups/" target="_blank">group therapy</a> <a href="https://wellness.uchicago.edu/mental-health/psychiatric-services/" target="_blank">psychiatric resources</a>',
    ' <a href="https://wellness.uchicago.edu/healthy-living/health-information/sleep/" target="_blank">Information on sleep</a> <a href="https://wellness.uchicago.edu/healthy-living/wellness-programming/refresh-sleep/" target="_blank">refresh sleep program</a>',
    ' <a href="https://wellness.uchicago.edu/student-insurance/u-ship/" target="_blank">insurance information</a>',
    ' <a href="https://wellness.uchicago.edu/healthy-living/wellness-programming/sunny-spots/" target="_blank">sunny spots</a>',
    ' <a href="https://wellness.uchicago.edu/healthy-living/health-information/healthy-relationships/" target="_blank">relationship help</a> <a href="https://wellness.uchicago.edu/mental-health/counseling/" target="_blank">couple counseling</a>',
    '<br>' + appointment
];