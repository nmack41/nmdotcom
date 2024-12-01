<template>
  <div class="p-10">
    <h1 class="font-bold text-3xl mb-4">Nick Mackowski</h1>
    <div class="flex flex-col items-start text-left md:flex-row p-2 mb-8">
      <div class="md:w-1/3">
        <img
          class="w-full max-w-md h-auto"
          src="assets/Nick_circle_2.png"
          alt="profile-pic"
        />
      </div>
      <div class="mt-4 md:mt-0 md:w-2/3 md:px-8 p-10">
        <div class="mb-8">
          <h2 class="font-bold text-xl">Technical Skills</h2>
          <div class="grid grid-cols-3 gap-2 mt-2">
            <div
              v-for="(skill, index) in skills"
              :key="index"
              :class="{ 'col-span-3': index === skills.length - 1 }"
            >
              <p>{{ skill }}</p>
              <div class="w-full bg-gray-200 mt-2"></div>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <h2 class="font-bold text-xl">Certifications</h2>
          <div class="mt-2">
            <p v-for="(cert, index) in certs" :key="index">{{ cert }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-8">
      <h2 class="font-bold text-xl">Experiences</h2>
      <div v-for="(experience, index) in exp" :key="index">
        <p class="font-bold mt-2">{{ experience.exptitle }}</p>
        <p class="mt-1">{{ experience.expdesc }}</p>
      </div>
    </div>
    <div class="mb-8">
      <h2 class="font-bold text-xl">Publications</h2>
      <div v-for="(publish, index) in pub" :key="index">
        <p class="mt-2">
          <a
            class="text-black hover:text-green-700"
            :href="publink[index]"
            target="_blank"
            >{{ publish }}</a
          >
        </p>
      </div>
    </div>
    <div class="mb-8">
      <h2 class="font-bold text-xl">Abstracts</h2>
      <div v-for="(abs, index) in abstract" :key="index">
        <p class="mt-2">
          <a
            class="text-black hover:text-green-700"
            :href="abstractlink[index]"
            >{{ abs }}</a
          >
        </p>
      </div>
    </div>
    <div class="mb-8">
      <h2 class="font-bold text-xl">Education</h2>
      <div v-for="(edu, index) in school" :key="index">
        <p class="mt-2">{{ edu }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        "SQL",
        "Python",
        "R",
        "Tableau",
        "Microsoft Excel",
        "Smartabase",
        "Proficient in a variety of performance technologies (e.g. force plates, velocity-based training devices, AMS)",
      ],
      certs: [
        "ScrumAlliance Certified Scrum Master",
        "CompTIA Security+",
        "Microsoft Certified: Azure Administrator Associate",
        "Certified Strength and Conditioning Speciapst (CSCS) – National Strength & Conditioning Association (NSCA)",
        "First Aid – American Red Cross",
        "CPR & AED – American Red Cross",
      ],
      pub: [
        "Merrigan, J., Strang, A., Eckerle, J., Mackowski, N., Hierholzer, K., Ray, N., Smith, R., Hagen, J. and Briggs, R., 2024. Countermovement jump force-time curve analyses: reliability and comparability across force plate systems. The Journal of Strength & Conditioning Research, 38(1), pp.30-37.",
        "Merrigan, J., Stute, N., Eckerle, J., Mackowski, N., Walters, J., O’Connor, M., Barrett, K., Robert, R., Strang, A. and Hagen, J., 2022. Reliability and Validity of Contemporary Bioelectrical Impedance Analysis Devices for Body Composition Assessment. Journal of Exercise and Nutrition, 5(4).",
        "Hierholzer K., Briggs R., Tolston M., Mackowski N., Eckerle J., O’Connor M., Barrett K., Smith R., Strang A., Heart Rate Variability: A Longitudinal Comparison of Commercial Devices for Individual and Group Stress-Response, Advances in Applied Physiology. Volume 7, Issue 2, December 2022, pp. 26-33. doi: 10.11648/j.aap.20220702.12",
        "Stute NL, Szeghy RE, Mackowski NS. All is fair in menstruation, POTS and… war? J Physiol. 2022 Aug 1. doi: 10.1113/JP283297. Epub ahead of print. PMID: 35913261.",
        "Hierholzer, K., Briggs, R., Tolston, M., Mackowski, N., O’Connor, M., Barrett, K., Smith, R., Eckerle, J. and Strang, A., 2022. Heart Rate Variability Metrics from Commercial Devices Predicts Strength and Cardiovascular Performance in a Military Cohort. American Journal of Sports Science, 10(1), pp.14-23.",
        "Strang, A.J., Smith, R., Hierholzer, K., Moore, B., Crews, R. and Mackowski, N., 2021. Effects of an AMINO-ACID Gel (AQUAGARD (registered trademark)) on Hydration and Performance Parameters During Prolonged Aerobic Exercise. Oak Ridge Institute for Science and Education.",
        "Devine, K.A., Viola, A., Levonyan‐Radloff, K., Mackowski, N., Bozzini, B., Chandler, A., Xu, B., Ohman‐Strickland, P., Mayans, S., Farrar‐Anton, A. and Sahler, O.J.Z., 2020. Feasibility of FitSurvivor: A technology‐enhanced group‐based fitness intervention for adolescent and young adult survivors of childhood cancer. Pediatric Blood & Cancer, 67(9), p.e28530.",
        "Harshman, S.W., Strayer, K.E., Davidson, C.N., Pitsch, R.L., Narayanan, L., Scott, A.M., Schaeublin, N.M., Wiens, T.L., Phelps, M.S., O’Connor, M.L. and Mackowski, N.S., 2021. Rate normalization for sweat metabolomics biomarker discovery. Talanta, 223, p.121797.",
        "Harshman, S.W., Browder, A.B., Davidson, C.N., Pitsch, R.L., Strayer, K.E., Schaeublin, N.M., Phelps, M.S., O’Connor, M.L., Mackowski, N.S., Barrett, K.N. and Eckerle, J.J., 2021. The impact of nutritional supplementation on sweat metabolomic content: a proof-of-concept study. Frontiers in Chemistry, 9, p.255.",
      ],
      publink: [
        "https://journals.lww.com/nsca-jscr/abstract/2024/01000/countermovement_jump_force_time_curve_analyses_.4.aspx",
        "https://www.journalofexerciseandnutrition.com/index.php/JEN/article/view/133",
        "https://www.sciencepublishinggroup.com/journal/paperinfo?journalid=387&doi=10.11648/j.aap.20220702.12",
        "https://physoc.onlinelibrary.wiley.com/doi/10.1113/JP283297",
        "https://www.sciencepublishinggroup.com/journal/paperinfo?journalid=155&doi=10.11648/j.ajss.20221001.13",
        "https://apps.dtic.mil/sti/citations/AD1146017",
        "https://onlinelibrary.wiley.com/doi/10.1002/pbc.28530",
        "https://www.sciencedirect.com/science/article/pii/S0039914020310882?via%3Dihub",
        "https://www.frontiersin.org/articles/10.3389/fchem.2021.659583/full",
      ],
      abstract: [
        "Tok, O., Pellegrino, J., Walker, A., Sanders, D., McFadden, B., Rabideau, M., Conway, S., Ordway, C., Bello, M., Hofacker, M., Mackowski, N., Poyssick, A., Capone, E., Monaco, R., Fragala, M., & Arent, S. (2016). In-season changes in plasma amino acid levels in division I NCAA female athletes. Journal of the International Society of Sports Nutrition, 13, P25.",
        "Walker, A., Conway, S., Hofacker, M., Rabideau, M., McFadden, B., Mackowski, N., Pellegrino, J., Ordway, C., Bello, M., Tok, O., Sanders, D., & Arent, S. (2016). Changes in markers of recovery, readiness, and nutritional status in DI female soccer placers over the first half of the competitive season. Medicine & Science in Sport Exercise, 48, P.S265. ",
        "Hofacker, M., Walker, A., McFadden, B., Rabideau, M., Conway, S., Sanders, D., Mackowski, N., & Arent, S. (2016) Practice vs. competition work rates in collegiate soccer players: do they practice like they play?. Medicine & Science in Sport Exercise, 48, P.S793.",
        "McFadden, B., Walker, A., Hofacker, M., Rabideau, M., Poyssick, A., Conway, S., Pellegrino, J., Mackowski, N., Ordway, C., & Arent, S. (2016). Monitoring the effect of a yearlong training program on power, ventilatory threshold, body composition, and aerobic capacity of division I male college soccer players. Medicine & Science in Sport Exercise, 48, P.S792",
        "Pellegrino, J., Walker, A., Conway, S., Hofacker, M., Rabideau, M., McFadden, B., Mackowski, N., Ordway, C., Bello, M., Tok, O., Sanders, D., & Arent, S. (2016). Biomarker changes in collegiate female power-endurance athletes: the role of fitness as a predictor. Medicine & Science in Sport Exercise, Vol. 48 No. 5, 2016. P.S265",
      ],
      abstractlink: [
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5025820/",
        "https://journals.lww.com/acsm-msse/Fulltext/2016/05001/Changes_In_Markers_Of_Recovery,_Readiness,_And.790.aspx",
        "https://journals.lww.com/acsm-msse/Fulltext/2016/05001/Practice_vs_Competition_Work_Rates_in_Collegiate.2373.aspx",
        "https://journals.lww.com/acsm-msse/Fulltext/2016/05001/Monitoring_Of_A_Yearlong_Training_Program_On.2372.aspx",
        "https://journals.lww.com/acsm-msse/Fulltext/2016/05001/Biomarkers_Changes_In_Collegiate_Female.792.aspx",
      ],
      thesis: [
        "Fit survivor: a multi-component health intervention for adolescent and young adult childhood cancer survivors",
      ],
      exp: [
        {
          exptitle:
            "Sr. Analyst, Human Capital Analyst / People Analytics Data Analyst – Supporting NASA - Logistics Management Institute (LMI)",
          expdesc:
            "I collaborated with Executive Services, Talent Learning & Development, and Talent Management to identify critical business challenges and deliver actionable insights through data visualization, dashboarding, automation, and reporting. Utilizing tools such as SQL, R, Python, and Tableau, I extracted, transformed, and visualized data to support human capital initiatives and provide strategic insights. Additionally, I conducted attrition analysis for Executive Services and created data dictionaries and process documentation to ensure clarity and consistency among the People Analytics team.",
        },
        {
          exptitle:
            "Sr. Analyst, Data Engineering – Supporting Air Force - Logistics Management Institute (LMI)",
          expdesc:
            "I oversaw and ensured the efficient management of ETL feeds, leveraging tools such as Informatica PowerCenter. My responsibilities also involved conducting investigations and rectifying any ETL failures. I utilized Teradata and Oracle SQL for a variety of tasks, including the updating, removal, and retrieval of information from databases. In addition, I performed file alterations using the Linux command line. Furthermore, I worked with customers to ensure their data management needs were satisfied.",
        },
        {
          exptitle:
            "Associate Researcher and Sports Scientist – InfoSciTex, Inc. (IST)",
          expdesc:
            "My primary role consisted of research in enhancing the physical and cognitive domains of Airmen and translating any findings to greater empower the impact of unit-embedded human performance staff. I collaborated with the team at the Air Force Research Labs in research design, logistical planning, facility use, data collection, and data analysis. Additionally, I served as an account manager for several units that utilized Smartabase where I developed intake forms, provided analytical support, and created data visualizations.",
        },
        {
          exptitle: "Associate Researcher and Sport Scientist – ORISE",
          expdesc:
            "My role as a DoD Fellow entailed hands-on coaching, development and implementation of performance training for Airmen, and test administration to identify physical performance status and deficits.",
        },
        {
          exptitle:
            "Rutgers Center For Health and Human Performance – Graduate Researcher and Strength & Conditioning Coach",
          expdesc:
            "The research was led through a NIH-funded grant titled “A Novel Mobile Health Fitness Program for AYA Survivors of Childhood Cancer.” Additionally, I had the opportunity to work with adolescents and Division I athletes both as a Graduate Researcher and a S&C Coach. This allowed me to experience the bridge between research and application and the intricacies of each.",
        },
        {
          exptitle:
            "Rutgers Recreation – Assistant Personal Training Coordinator and Strength & Conditioning Coach",
          expdesc:
            "My primary role consisted of coaching individuals, club teams, and ROTC cadets.",
        },
        {
          exptitle: "Rutgers Football – Student Athletic Trainer",
          expdesc:
            "I aided the head and assistant athletic trainers during the in-season, off-season, and training camps with regards to injury prevention, alleviation of illness, and rehabilitation of 70+ football athletes.",
        },
      ],
      school: [
        "M.S. in Kinesiology and Applied Physiology",
        "B.S. in Exercise Science, Applied Kinesiology",
      ],
    };
  },
};
</script>
