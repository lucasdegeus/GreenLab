# System imports
import sys, time

# Module imports
import numpy as np
import pandas as pd
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

RELATIVE_TRANCO_PATH = '../00 Data/00_tranco_top1000.csv'
RELATIVE_SELECTED_PATH = '../00 Data/01_tranco_50.csv'

wd = webdriver.Chrome(ChromeDriverManager().install())
wd.implicitly_wait(10)

data = pd.read_csv(RELATIVE_TRANCO_PATH, index_col=0, header=None, names=['site']).values
data = [x[0] for x in data]

num_to_select = 50
select_from_first = 1000

sites = data[:select_from_first].copy()
np.random.shuffle(sites)

result = []

for i, site in enumerate(sites):
    print(i, end=' ')
    try:
        wd.get('https://www.' + site)
        wd.find_element_by_tag_name('head').find_element_by_tag_name('style')
    except NoSuchElementException:
        result.append(site)
        print(f'{site} +1')
    except WebDriverException:
        print(f'not found: {site}')
    if len(result) >= num_to_select:
        break
    time.sleep(.1)

with open(RELATIVE_SELECTED_PATH, 'wb') as f:
    pd.DataFrame(result).to_csv(f, header=False)
